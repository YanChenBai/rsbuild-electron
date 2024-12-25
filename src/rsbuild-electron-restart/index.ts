import type { RsbuildPlugin } from '@rsbuild/core'
import { exec, spawn } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path, { resolve } from 'node:path'
import process from 'node:process'

const LockFiles = {
  'yarn.lock': 'yarn',
  'package-lock.json': 'npm',
  'pnpm-lock.yaml': 'pnpm -w',
  'bun.lockb': 'bun',
  'deno.lock': 'deno',
}

function detectPackageManager(dir = process.cwd()) {
  for (const [lockFile, manager] of Object.entries(LockFiles)) {
    if (existsSync(path.join(dir, lockFile))) {
      return manager
    }
  }
}

function isPidValid(pid: number): Promise<boolean> {
  return new Promise((resolve) => {
    exec(`tasklist /FI "PID eq ${pid}"`, (error, stdout, _stderr) => {
      if (error) {
        console.error(`Error checking PID ${pid}:`, error)
        resolve(false)
        return
      }
      // 如果 stdout 包含 PID，则表示进程存在
      resolve(stdout.includes(pid.toString()))
    })
  })
}

async function killProcessByPid(pid: number) {
  const isValid = await isPidValid(pid)
  if (!isValid)
    return

  return new Promise<void>((resolve, reject) => {
    // /F 强制终止进程
    // /T 终止指定的进程和任何由此启动的子进程
    exec(`taskkill /F /T /PID ${pid}`, (error, _stdout, _stderr) => {
      if (error) {
        console.error(`Failed to kill process ${pid}:`, error)
        reject(error)
        return
      }
      resolve()
    })
  })
}

export function electronRestart(options: { script: string, root?: string, firstStart?: boolean }): RsbuildPlugin {
  const PID_PATH = resolve(__dirname, '.pid')
  const { script, root = process.cwd(), firstStart = true } = options
  function savePid(pid: number) {
    const pidStr = `${pid}`

    // 写入文件
    writeFileSync(PID_PATH, pidStr)
  }

  function getPid() {
    if (!existsSync(PID_PATH))
      return
    const content = readFileSync(PID_PATH, 'utf-8')
    return Number(content)
  }

  return {
    name: 'electron-restart',
    setup: (api) => {
      const exit = async () => {
        const pid = getPid()

        // 先结束之前的进程
        pid && (await killProcessByPid(pid))
      }

      api.modifyRsbuildConfig(() => exit())

      api.onBeforeBuild(async ({ isFirstCompile }) => {
        if (isFirstCompile && !firstStart)
          return

        await exit()

        const packageManager = detectPackageManager(root)

        if (!packageManager)
          throw new Error('No package manager detected')

        // 启动新进程
        try {
          const currentProcess = spawn(
            packageManager,
            ['run', script],
            {
              cwd: process.cwd(),
              shell: true,
              stdio: 'inherit',
            },
          )

          const pid = currentProcess.pid
          if (pid)
            savePid(pid)
        }
        catch (error) {
          console.error('Failed to start electron:', error)
        }
      })

      api.onExit(() => exit())
    },
  }
}
