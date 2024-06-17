import path from 'node:path'
import { env } from 'node:process'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { checkFile, createFile, loadEnv } from '../src/loadEnv'

describe('加载 env 文件', () => {
  beforeEach(() => {
    vi.spyOn(path, 'join').mockReturnValue('./.env')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('创建文件', () => {
    const check = checkFile()

    if (!check)
      createFile()

    expect(checkFile()).toBe(true)
  })

  describe('判断文件是否存在', () => {
    it('文件不存在', () => {
      vi.restoreAllMocks()
      const userDir = path.join(env.HOME || env.USERPROFILE || '')
      const url = path.join(userDir, '.tbot')
      vi.spyOn(path, 'join').mockReturnValue(url)
      expect(checkFile()).toBe(false)
    })

    it('文件存在', async () => {
      expect(checkFile()).toBe(true)
    })
  })

  it('加载 env 文件', () => {
    loadEnv()

    // 判断环境变量不为空
    expect(env.TBOT_OPENAI_API_KEY).not.toBeNull()
    expect(env.TBOT_BASE_URL).not.toBeNull()
    expect(env.TBOT_MODEL).not.toBeNull()
    expect(env.TBOT_MESSAGE_MAX).not.toBeNull()
    expect(env.TBOT_USER_NAME).not.toBeNull()
    expect(env.TBOT_BOT_NAME).not.toBeNull()
  })
})
