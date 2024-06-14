import { env, exit, stdin, stdout } from 'node:process'
import { createInterface } from 'node:readline/promises'
import { config } from 'dotenv'
import OpenAI from 'openai'

interface Message {
  role: Role
  content: string
}

enum Role {
  user = 'user',
  bot = 'assistant',
}

// 注入环境变量，引自 .env 文件
config()

const baseURL = env.BASE_URL || 'https://api.chatanywhere.com.cn' // 国内中转
const apiKey = env.OPENAI_API_KEY || ''
const model = env.MODEL || 'gpt-3.5-turbo'
const messageMax = Number(env.MESSAGE_MAX) || 10
const userName = env.USER_NAME || 'You'
const botName = env.BOT_NAME || 'Bot'

const rl = createInterface({
  input: stdin,
  output: stdout,
})

/**
 * Open AI API Docs
 * @see https://platform.openai.com/docs/api-reference/streaming
 */
const openai = new OpenAI({
  baseURL,
  apiKey,
})

const messages: Message[] = []

function addMessage(role: Role, content: string) {
  // 设置历史消息上限
  if (messages.length > messageMax)
    messages.shift()

  messages.push({
    role,
    content,
  })
}

askQuestion()
async function askQuestion() {
  const content = await rl.question(`${userName}: `)
  addMessage(Role.user, content)

  checkExit(content)

  const stream = await openai.chat.completions.create({
    model,
    stream: true,
    messages,
  })

  stdout.write(`${botName}: `)

  let text = ''
  for await (const chunk of stream) {
    text += chunk.choices[0]?.delta?.content || ''
    stdout.write(chunk.choices[0]?.delta?.content || '')
  }

  stdout.write('\n')

  addMessage(Role.bot, text)

  // 循环对话
  askQuestion()
}

// 检测退出
function checkExit(str: string) {
  if (str !== 'exit')
    return

  exit(0)
}
