import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./App.scss"
import "./CarouselTestCenter.scss"
import { Carousel, type ICarousel } from "../components/Carousel/Carousel"
import { Header } from "../Items/Header/Header"
import { Options, type OptionDefinition } from "../components/Options/Options"

export class CarouselTestCenter extends MithrilTsxComponent<{}> {
  private options: Record<string, OptionDefinition> = {
    circular: { title: "Navigate circular", value: false },
    itemsVisible: { title: "Items visible", value: 2 },
  }

  private carouselData: ICarousel = {
      header: { title: "Carousel title", heading: "h2" },
      items: [
        { title: "First Item", content: "This is the first item content" },
        { title: "Second Item", content: "This is the second item content" },
        { title: "Third Item", content: "This is the third item content" }
      ]
    }

  private _options = Object.values(this.options)

  view() {
    return (
      <div className="carousel-demo-container">
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
        <Header title="Carousel Test Center" heading="h1" />

        <Options
          options={this.options}
          onChange={(key, value) => {
            this.options[key].value = value
          }}
        />

        <Carousel
          {...this.carouselData}
          circular={this.options.circular.value as boolean}
          itemsVisible={this.options.itemsVisible.value as number}
        />
      </div>
    )
  }
}