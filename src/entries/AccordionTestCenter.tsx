import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./App.scss"
import "./AccordionTestCenter.scss"
import { Accordion, type IAccordion } from "../components/Accordion/Accordion"
import { Header } from "../items/Header/Header"
import { Options, type OptionDefinition } from "../components/Options/Options"

export class AccordionTestCenter extends MithrilTsxComponent<{}> {
  private options: Record<string, OptionDefinition> = {
    openFirstOnLoad: { title: "Open first on load", value: false },
    canOpenMultiple: { title: "Can open multiple", value: false },
    nummerableTitles: { title: "Numbered titles", value: false }
  }

  private accordionData: IAccordion = {
    header: { title: "Accordion title", heading: "h2" },
    items: [
      { title: "First Item", content: "This is the first item content" },
      { title: "Second Item", content: "This is the second item content" },
      { title: "Third Item", content: "This is the third item content" }
    ]
  }

  private _options = Object.values(this.options)

  view() {
    return (
      <div className="accordion-demo-container">
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
        <Header title="Accordion Test Center" heading="h1" />

        <Options
          options={this.options}
          onChange={(key, value) => {
            this.options[key].value = value
          }}
        />

        <Accordion
          {...this.accordionData}
          openFirstOnLoad={this.options.openFirstOnLoad.value as boolean}
          canOpenMultiple={this.options.canOpenMultiple.value as boolean}
          nummerableTitles={this.options.nummerableTitles.value as boolean}
        />
      </div>
    )
  }
}