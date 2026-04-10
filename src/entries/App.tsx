import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import { AccordionDemo } from "./AccordionTestCenter"
import "./App.scss"
import { Typewriter } from "@root/Items/Typewriter/Typewriter"
import { Header } from "../Items/Header/Header"

class App extends MithrilTsxComponent<{}> {
  private readonly lines = ["Hello friend...",
                                "Welcome to the Components Test Center where you can explore various UI components!", 
                                "Select a UI component from the menu to see it in action, happy testing!"]

  view() {
    return (
      <div className="app-container">
        <Header title="Components Test Center" heading="h1"  />
        <div className="app-content">
          <span><Typewriter lines={this.lines} /></span>
          <ul>
            <li>
              <a
                href="/accordion"
                onclick={(e: any) => {
                  e.preventDefault()
                  m.route.set("/accordion")
                }}
              >
                Accordion
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const app = document.getElementById("app")
if (app) {
  m.route.prefix = ""

  m.route(app, "/", {
    "/": {
      view: () => <App />
    },
    "/accordion": {
      view: () => <AccordionDemo />
    }
  })
}