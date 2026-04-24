import fs from "fs/promises"
import { parse as parseJsonc } from "jsonc-parser"

async function loadConfig() {
  const content = await fs.readFile("opencode.json", "utf-8")
  return parseJsonc(content)
}

const config = await loadConfig()
console.log(config)
