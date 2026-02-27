import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import { AccordionDemo } from "./AccordionTestCenter"
import "./App.scss"

class App extends MithrilTsxComponent<{}> {
  view() {
    return (
      <div className="app-container">
        <h1>Hello friend, welcome to the Mithril test app!</h1>
      </div>
    )
  }
}

const app = document.getElementById("app")
if (app) {
    m.route(app, "/", {
    "/": {
      view: () => <App />
    },
    "/accordion": {
      view: () => <AccordionDemo />
    }
  })
}