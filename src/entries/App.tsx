import m from "mithril"
import "./App.scss"

const app = document.getElementById("Accordion")
if (app)
  import("../components/Accordion/Accordion")
    .then(({ Accordion }) =>
      m.mount(app, {
        view: () => <Accordion />
      }))