// oxlint-disable typescript/no-floating-promises
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
// 引入 package.json
import packageJson from "../package.json" with { type: "json" }

const cli = yargs(hideBin(process.argv))

cli
  // 动态读取并设置版本号
  .version(packageJson.version)
  .help()
  .command(
    "chat",
    "Start a chat session",
    (yargs) => {
      return yargs.option("model", {
        type: "string",
        description: "AI model to use",
        default: "gpt-4",
      })
    },
    (argv) => {
      console.log(`Starting chat with model: ${argv.model}`)
    },
  )
  // 新增 debug 命令
  .command(
    "debug",
    "Print environment info for debugging",
    () => {},
    () => {
      console.log("--- Debug Info ---")
      console.log(`Version  : ${packageJson.version}`)
      console.log(`Platform : ${process.platform}`)
      console.log(`Node/Bun : ${process.version}`)
      console.log(`CWD      : ${process.cwd()}`)
    },
  )
  .demandCommand(1, "You need at least one command before moving on")
  .parse()
