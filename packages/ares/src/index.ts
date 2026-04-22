// packages/opencode/src/index.ts
const args = process.argv.slice(2)

if (args.includes("--version") || args.includes("-v")) {
  console.log("1.0.0")
} else {
  console.log("Unknown command")
}
