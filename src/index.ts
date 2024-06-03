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

const rl = createInterface({
  input: stdin,
  output: stdout,
})

/**
 * Open AI API Docs
 * @see https://platform.openai.com/docs/api-reference/streaming
 */
const openai = new OpenAI({
  baseURL: 'https://api.chatanywhere.com.cn', // 国内中转
  apiKey: env.OPENAI_API_KEY,
})

const messages: Message[] = []

function addMessage(role: Role, content: string) {
  // 设置历史消息上限
  if (messages.length > 10)
    messages.shift()

  messages.push({
    role,
    content,
  })
}

// 循环获取用户输入
while (true)
  await askQuestion()

async function askQuestion() {
  const content = await rl.question('You: ')
  addMessage(Role.user, content)

  checkExit(content)

  const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  })

  stdout.write('Bot: ')

  let text = ''
  for await (const chunk of stream) {
    text += chunk.choices[0]?.delta?.content || ''
    stdout.write(chunk.choices[0]?.delta?.content || '')
  }

  stdout.write('\n')

  addMessage(Role.bot, text)
}

function checkExit(str: string) {
  if (str !== 'exit')
    return

  exit(0)
}
