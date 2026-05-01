import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./App.scss"
import "./AccordionTestCenter.scss"
import { Listing, type IListing } from "../components/listing/Listing"
import { Header } from "../items/header/Header"
import { Options, type OptionDefinition } from "../components/options/Options"

export class ListingTestCenter extends MithrilTsxComponent<{}> {
  private options: Record<string, OptionDefinition> = {
  }

  private listingData: IListing = {
      header: { title: "Listing title", heading: "h2" },
      items: [
        { title: "First Item",   content: "This is the first item content",   properties: [] },
        { title: "Second Item",  content: "This is the second item content",  properties: [{ property: "Color", value: "Red" }] },
        { title: "Third Item",   content: "This is the third item content",   properties: [{ property: "Color", value: "Blue" }, { property: "Size", value: "Medium" }] },
        { title: "Fourth Item",  content: "This is the fourth item content",  properties: [{ property: "Color", value: "Green" }, { property: "Size", value: "Large" }, { property: "Weight", value: 1 }] },
        { title: "Fifth Item",   content: "This is the fifth item content",   properties: [] },
        { title: "Sixth Item",   content: "This is the sixth item content",   properties: [{ property: "Color", value: "Yellow" }] },
        { title: "Seventh Item", content: "This is the seventh item content", properties: [{ property: "Color", value: "Purple" }, { property: "Size", value: "Small" }] },
        { title: "Eighth Item",  content: "This is the eighth item content",  properties: [{ property: "Color", value: "Orange" }, { property: "Size", value: "XL" }, { property: "Weight", value: 2 }] },
        { title: "Ninth Item",   content: "This is the ninth item content",   properties: [] },
        { title: "Tenth Item",   content: "This is the tenth item content",   properties: [{ property: "Color", value: "Black" }] },
        { title: "Eleventh Item",content: "This is the eleventh item content",properties: [{ property: "Color", value: "White" }, { property: "Size", value: "S" }] },
        { title: "Twelfth Item", content: "This is the twelfth item content", properties: [{ property: "Color", value: "Pink" }, { property: "Size", value: "XXL" }, { property: "Weight", value: 0.5 }] },
      ]
    }

  view() {
    return (
      <div className="listing-demo-container">
        <p>
          <a
            href="/"
            onclick={(e: any) => {
              e.preventDefault()
              m.route.set("/")
            }}
          >
            ← Back to Home
          </a>
        </p>
        <Header title="Listing Test Center" heading="h1" />

        <Options
          options={this.options}
          onChange={(key, value) => {
            this.options[key].value = value
          }}
        />

        <Listing
          {...this.listingData}
        />
      </div>
    )
  }
}