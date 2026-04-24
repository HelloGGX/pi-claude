import { createCliRenderer } from "@opentui/core"
import { render, TimeToFirstDraw, useTerminalDimensions } from "@opentui/solid"
import { ArgsProvider, type Args } from "./context/args"
import { createSignal, Show, Switch } from "solid-js" 
import { Home } from "./routes/home"

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
  const dimensions = useTerminalDimensions()
  const [ready, setReady] = createSignal(true)

  return (
     <box
      width={dimensions().width}
      height={dimensions().height}
    >
      <Show when={false}>
        <TimeToFirstDraw />
      </Show>
      <Home />
    </box>
  )
}
