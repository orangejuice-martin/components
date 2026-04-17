import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import { AccordionTestCenter } from "./AccordionTestCenter"
import { CarouselTestCenter } from "./CarouselTestCenter"
import "./App.scss"
import { Typewriter } from "@root/items/typewriter/Typewriter"
import { Header } from "../items/header/Header"
import { Listing, type IListing } from "../components/listing/Listing"

class App extends MithrilTsxComponent<{}> {
  private readonly links = [
    { label: "Accordion", url: "/accordion" },
    { label: "Carousel", url: "/carousel" }
  ]

  private readonly lines = ["Hello friend...",
                            "Welcome to the Components Test Center!", 
                            "Select a component to see it in action.",
                            "Happy testing!"]

  // private listingData: IListing = {
  //     header: { title: "Listing title", heading: "h2" },
  //     items: [
  //       { title: "First Item",   content: "This is the first item content",   properties: {} },
  //       { title: "Second Item",  content: "This is the second item content",  properties: { "Color": "Red" } },
  //       { title: "Third Item",   content: "This is the third item content",   properties: { "Color": "Blue", "Size": "Medium" } },
  //       { title: "Fourth Item",  content: "This is the fourth item content",  properties: { "Color": "Green", "Size": "Large", "Weight": 1 } },
  //       { title: "Fifth Item",   content: "This is the fifth item content",   properties: {} },
  //       { title: "Sixth Item",   content: "This is the sixth item content",   properties: { "Color": "Yellow" } },
  //       { title: "Seventh Item", content: "This is the seventh item content", properties: { "Color": "Purple", "Size": "Small" } },
  //       { title: "Eighth Item",  content: "This is the eighth item content",  properties: { "Color": "Orange", "Size": "XL", "Weight": 2 } },
  //       { title: "Ninth Item",   content: "This is the ninth item content",   properties: {} },
  //       { title: "Tenth Item",   content: "This is the tenth item content",   properties: { "Color": "Black" } },
  //       { title: "Eleventh Item",content: "This is the eleventh item content",properties: { "Color": "White", "Size": "S" } },
  //       { title: "Twelfth Item", content: "This is the twelfth item content", properties: { "Color": "Pink", "Size": "XXL", "Weight": 0.5 } },
  //     ]
  //   }

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
        {/* <Listing {...this.listingData} /> */}
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