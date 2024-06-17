import { env } from 'node:process'
import { describe, expect, it, vi } from 'vitest'
import { checkFile, createFile, loadEnv } from '../src/loadEnv'

describe('加载 env 文件', () => {
  it('创建文件', () => {
    const check = checkFile()

    if (!check)
      createFile()

    expect(checkFile()).toBe(true)
  })

  describe('判断文件是否存在', () => {
    it('文件不存在', async () => {
      vi.doMock('../src/loadEnv', () => ({
        checkFile: () => false,
      }))
      const { checkFile } = await import('../src/loadEnv')

      expect(checkFile()).toBe(false)

      vi.doUnmock('../src/loadEnv')
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
