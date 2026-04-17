import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import { AccordionTestCenter } from "./AccordionTestCenter"
import { CarouselTestCenter } from "./CarouselTestCenter"
import "./App.scss"
import { Typewriter } from "@root/items/Typewriter/Typewriter"
import { Header } from "../items/Header/Header"

class App extends MithrilTsxComponent<{}> {
  private readonly links = [
    { label: "Accordion", url: "/accordion" },
    { label: "Carousel", url: "/carousel" }
  ]

  private readonly lines = ["Hello friend...",
                            "Welcome to the Components Test Center!", 
                            "Select a component to see it in action.",
                            "Happy testing!"]

  view() {
    return (
      <div className="app-container">
        <Header title="Components Test Center" heading="h1"  />
        <div className="app-content">
          <span><Typewriter lines={this.lines} /></span>
          <ul>
            {this.links.map((link) => (
              <li>
                <a
                  href={link.url}
                  onclick={(e: any) => {
                    e.preventDefault()
                    m.route.set(link.url)
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
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
      view: () => <AccordionTestCenter />
    },
    "/carousel": {
      view: () => <CarouselTestCenter />
    }
  })
}