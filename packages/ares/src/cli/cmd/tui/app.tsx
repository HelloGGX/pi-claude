import { createCliRenderer } from "@opentui/core"
import { render } from "@opentui/solid"
import { ArgsProvider, type Args } from "./context/args"

export function tui(input: { args: Args }) {
  return new Promise<void>(async (resolve) => {
    const renderer = await createCliRenderer()
    await render(() => {
      return (
        <ArgsProvider {...input.args}>
          <App />
        </ArgsProvider>
      )
    }, renderer)
  })
}

function App() {
  return <text>fallback-statusbar</text>
}
