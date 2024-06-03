import { env, stdin, stdout } from 'node:process'
import { createInterface } from 'node:readline/promises'
import { config } from 'dotenv'
import OpenAI from 'openai'

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

// 循环获取用户输入
while (true)
  await askQuestion()

async function askQuestion() {
  const content = await rl.question('You: ')

  const stream = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    model: 'gpt-3.5-turbo',
    stream: true,
  })

  stdout.write('Bot: ')

  for await (const chunk of stream)
    stdout.write(chunk.choices[0]?.delta?.content || '')

  stdout.write('\n')
}
