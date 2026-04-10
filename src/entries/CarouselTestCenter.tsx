import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./App.scss"
import "./CarouselTestCenter.scss"
import { Carousel, type ICarousel } from "../components/Carousel/Carousel"
import { Header } from "../Items/Header/Header"

type Option = {
  title: string
  value: boolean | number
}

type CarouselOptions = {
  circular: { title: string; value: boolean }
  itemsVisible: { title: string; value: number }
}

export class CarouselTestCenter extends MithrilTsxComponent<{}> {
  private options: CarouselOptions = {
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

  private _options: Option[] = Object.values(this.options)

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

        <div className="carousel-options">
          <Header title="Options" heading="h3" />
          {this._options.map(x =>
            <label>
              {typeof x.value === "number"
                ? <input
                    type="number"
                    min={1}
                    value={x.value}
                    oninput={(e: any) => x.value = Math.max(1, Number(e.target.value) || 1)}
                  />
                : <input type="checkbox" checked={x.value} onchange={() => x.value = !x.value} />}
              {x.title}
            </label>
          )}
        </div>

        <Carousel
          {...this.carouselData}
          circular={this.options.circular.value}
          itemsVisible={this.options.itemsVisible.value}
        />
      </div>
    )
  }
}