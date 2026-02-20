import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./App.scss"

class App extends MithrilTsxComponent<{}> {
  view() {
    return (
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
        <h1>Hello, Mithril is working!</h1>
      </div>
    )
  }
}

const app = document.getElementById("app")
if (app) {
  m.mount(app, {
    view: () => <App />
  })
}