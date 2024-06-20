import { env, exit, stdin, stdout } from 'node:process'
import { createInterface } from 'node:readline/promises'
import OpenAI from 'openai'
import ora from 'ora'
import { loadEnv } from './loadEnv'

interface Message {
  role: Role
  content: string
}

enum Role {
  user = 'user',
  bot = 'assistant',
}

loadEnv()

const baseURL = env.TBOT_BASE_URL || 'https://api.chatanywhere.com.cn' // 国内中转
const apiKey = env.TBOT_OPENAI_API_KEY || ''
const model = env.TBOT_MODEL || 'gpt-3.5-turbo'
const messageMax = Number(env.TBOT_MESSAGE_MAX) || 10
const userName = env.TBOT_USER_NAME || 'You'
const botName = env.TBOT_BOT_NAME || 'Bot'

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

  const spinner = ora({
    text: '正在努力回答中，请稍等',
    discardStdin: false,
  }).start()

  const stream = await openai.chat.completions.create({
    model,
    stream: true,
    messages,
  })

  spinner.stop()

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
