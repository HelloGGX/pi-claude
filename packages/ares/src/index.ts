// oxlint-disable typescript/no-floating-promises
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { EOL } from "os"
// 引入 package.json
import packageJson from "../package.json" with { type: "json" }
import { UI } from "./cli/ui"

function show(out: string) {
  const text = out.trimStart()
  if (!text.startsWith("ares ")) {
    process.stderr.write(UI.logo() + EOL + EOL)
    process.stderr.write(text)
    return
  }
  process.stderr.write(out)
}

const args = hideBin(process.argv)

const cli = yargs(args)
  .scriptName("ares")
  .wrap(100)
  .alias("help", "h")
  .version(packageJson.version)
  .alias("version", "v")
  .usage("")
  .strict()

try {
  if (args.includes("-h") || args.includes("--help")) {
    await cli.parse(args, (err: Error | undefined, _argv: unknown, out: string) => {
      if (err) throw err
      if (!out) return
      show(out)
    })
  } else {
    await cli.parse()
  }
} catch {
  process.exitCode = 1
} finally {
  // Some subprocesses don't react properly to SIGTERM and similar signals.
  // Most notably, some docker-container-based MCP servers don't handle such signals unless
  // run using `docker run --init`.
  // Explicitly exit to avoid any hanging subprocesses.
  process.exit()
}
