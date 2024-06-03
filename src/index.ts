import process from 'node:process'
import { config } from 'dotenv'
import OpenAI from 'openai'

// 注入环境变量，引自 .env 文件
config()

/**
 * Open AI API Docs
 * @see https://platform.openai.com/docs/api-reference/streaming
 */
const openai = new OpenAI({
  baseURL: 'https://api.chatanywhere.com.cn', // 国内中转
  apiKey: process.env.OPENAI_API_KEY,
})

async function initChat() {
  const stream = await openai.chat.completions.create({
    messages: [{ role: 'user', content: '鲁迅和周树人有什么区别？' }],
    model: 'gpt-3.5-turbo',
    stream: true,
  })

  for await (const chunk of stream)
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
}

initChat()
