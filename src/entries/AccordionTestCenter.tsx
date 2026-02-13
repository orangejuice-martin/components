import m from "mithril"
import "./App.scss"
import "./AccordionTestCenter.scss"
import { MithrilTsxComponent } from "mithril-tsx-component"
import { Accordion, type IAccordion } from "../components/Accordion/Accordion"
import { Header } from "../Items/Header/Header"

interface IAccordionDemoState {
  openFirstOnLoad: boolean
  canOpenMultiple: boolean
  nummerableTitles: boolean
}

class AccordionDemo extends MithrilTsxComponent<{}> {
  private state: IAccordionDemoState = {
    openFirstOnLoad: false,
    canOpenMultiple: false,
    nummerableTitles: false
  }

  private accordionData: IAccordion = {
    header: { title: "Interactive Accordion Demo", heading: "h2" },
    items: [
      { title: "First Item", content: "This is the first item content" },
      { title: "Second Item", content: "This is the second item content" },
      { title: "Third Item", content: "This is the third item content" }
    ]
  }

  toggleOption(option: keyof IAccordionDemoState) {
    this.state[option] = !this.state[option]
  }

  view() {
    return (
      <div className="accordion-demo-container">
        <Header title="Accordion Component Demo" heading="h1" />
        
        <div className="accordion-options">
          <Header title="Options" heading="h3" />
          <label>
            <input 
              type="checkbox" 
              checked={this.state.openFirstOnLoad}
              onchange={() => this.toggleOption('openFirstOnLoad')}
            />
            Open First On Load
          </label>
          
          <label>
            <input 
              type="checkbox" 
              checked={this.state.canOpenMultiple}
              onchange={() => this.toggleOption('canOpenMultiple')}
            />
            Can Open Multiple
          </label>
          
          <label>
            <input 
              type="checkbox" 
              checked={this.state.nummerableTitles}
              onchange={() => this.toggleOption('nummerableTitles')}
            />
            Numbered Titles
          </label>
        </div>

        <Accordion 
          {...this.accordionData}
          openFirstOnLoad={this.state.openFirstOnLoad}
          canOpenMultiple={this.state.canOpenMultiple}
          nummerableTitles={this.state.nummerableTitles}
        />
      </div>
    )
  }
}

const app = document.getElementById("accordion-demo")
if (app) {
  m.mount(app, {
    view: () => <AccordionDemo />
  })
}