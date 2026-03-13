import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import { AccordionDemo } from "./AccordionTestCenter"
import "./App.scss"
import { Typewriter } from "@root/Items/Typewriter/Typewriter"

class App extends MithrilTsxComponent<{}> {
  private readonly welcomeLines = ["Hello friend...",
                                   "Welcome to the Components Test Center where you can explore various UI components!", 
                                   "Select a UI component from the menu to see it in action, happy testing!"]

  view() {
    return (
      <div className="app-container">
        <h1>Components Test Center</h1>
        <span><Typewriter title={this.welcomeLines} /></span>
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