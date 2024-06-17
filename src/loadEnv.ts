import path from 'node:path'
import { env } from 'node:process'
import { fileURLToPath } from 'node:url'
import { existsSync, writeFileSync } from 'node:fs'
import { config } from 'dotenv'

// 获取用户目录
const userDir = path.join(env.HOME || env.USERPROFILE || '')
const isDev = env.NODE_ENV === 'development'
const filePath = isDev
  ? path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../.env',
  )
  : path.join(userDir, '.tbot')

export function checkFile() {
  return existsSync(filePath)
}

export function createFile() {
  try {
    writeFileSync(filePath, `TBOT_BASE_URL=https://api.chatanywhere.com.cn
TBOT_OPENAI_API_KEY=''
TBOT_MODEL=gpt-3.5-turbo
TBOT_MESSAGE_MAX=10
TBOT_USER_NAME=You
TBOT_BOT_NAME=Bot
`)
  }
  catch (error) {
    console.error(error)
  }
}

export function loadEnv() {
  if (!checkFile())
    createFile()

  // 注入环境变量，引自 .env 文件
  config({
    path: filePath,
  })
}
