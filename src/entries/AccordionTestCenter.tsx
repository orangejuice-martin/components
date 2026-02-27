import m from "mithril"
import "./App.scss"
import "./AccordionTestCenter.scss"
import { MithrilTsxComponent } from "mithril-tsx-component"
import { Accordion, type IAccordion } from "../components/Accordion/Accordion"
import { Header } from "../Items/Header/Header"

export class AccordionDemo extends MithrilTsxComponent<{}> {
  private options = {
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
        <Header title="Accordion Test Center" heading="h1" />
        
        <div className="accordion-options">
          <Header title="Options" heading="h3" />
           {this._options.map(x =>
          <label>
            <input type="checkbox" checked={x.value} onchange={() => x.value = !x.value} />
            {x.title}
          </label>
        )}
        </div>

        <Accordion 
          {...this.accordionData}
          openFirstOnLoad={this.options.openFirstOnLoad.value}
          canOpenMultiple={this.options.canOpenMultiple.value}
          nummerableTitles={this.options.nummerableTitles.value}
        />
      </div>
    )
  }
}