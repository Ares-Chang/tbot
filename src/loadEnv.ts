import path from 'node:path'
import { env } from 'node:process'
import { existsSync, writeFileSync } from 'node:fs'
import { config } from 'dotenv'

// 获取用户目录
const userDir = path.join(env.HOME || env.USERPROFILE || '')
const isDev = env.NODE_ENV === 'development'

export function checkFile() {
  return existsSync(path.join(userDir, '.tbot'))
}

export function createFile() {
  try {
    writeFileSync(path.join(userDir, '.tbot'), `TBOT_BASE_URL=https://api.chatanywhere.com.cn
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
  // 注入环境变量，引自 .env 文件
  config({
    path: isDev ? '' : path.join(userDir, '.tbot'),
  })
}
