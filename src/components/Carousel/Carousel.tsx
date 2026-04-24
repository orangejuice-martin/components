import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./Carousel.scss"
import { Header, type IHeader } from "../../items/header/Header"

const $key = Symbol("key")

export interface ICarousel {
    header?: IHeader
    circular?: boolean
    itemsVisible?: number
    items: ICarouselItem[]
}

export interface ICarouselItem {
    title: string
    content: m.Children
    [$key]?: string
}

export class Carousel extends MithrilTsxComponent<ICarousel> {
    private currentIndex: number = 0
    private visibleItems: ICarouselItem[] = []

    oninit(v: m.Vnode<ICarousel>) {
        this.visibleItems = this.computeVisibleItems(v.attrs)
    }

    onbeforeupdate(v: m.Vnode<ICarousel>) {
        const length = v.attrs.items?.length ?? 0
        if (length === 0) {
            this.currentIndex = 0
        } else if (length - 1 < this.currentIndex) {
            this.currentIndex = length - 1
        }
        this.visibleItems = this.computeVisibleItems(v.attrs)
    }

    view(v: m.Vnode<ICarousel>) {
        if (!v.attrs.items?.length) {
            return
        }

        const length = v.attrs.items.length
        const itemsVisible = Math.min(Math.max(v.attrs.itemsVisible ?? 2, 1), length)
        const showNavigation = length > itemsVisible
        const disablePrevious = showNavigation && !v.attrs.circular && this.currentIndex === 0
        const disableNext = showNavigation && !v.attrs.circular && this.currentIndex >= length - itemsVisible

        return <div className="Carousel">
            {v.attrs.header && <Header title={v.attrs.header.title} heading={v.attrs.header.heading} />}
            <div className="Carousel-nav">
                {showNavigation &&
                    <button className="Carousel-prev" onclick={() => this.navigate(-1, v.attrs)} disabled={disablePrevious}>&lt;</button>
                }
                <div className="Carousel-items">
                    {this.visibleItems.map((item) =>
                        <CarouselItem
                            key={item[$key] ??= crypto.randomUUID()}
                            title={item.title}
                            content={item.content}
                            // onbeforeremove={async (v: m.VnodeDOM<ICarouselItem>) => {
                            //     v.dom.classList.add("fade-out")
                            //     await new Promise((resolve) => setTimeout(resolve, 1000))
                            // }}
                        />
                    )}
                </div>
                {showNavigation &&
                    <button className="Carousel-next" onclick={() => this.navigate(1, v.attrs)} disabled={disableNext}>&gt;</button>
                }
            </div>
        </div>
    }

    private navigate(delta: number, attrs: ICarousel) {
        const length = attrs.items.length
        this.currentIndex = (this.currentIndex + delta + length) % length
        this.visibleItems = this.computeVisibleItems(attrs)
    }

    private computeVisibleItems(attrs: ICarousel): ICarouselItem[] {
        if (!attrs.items?.length) return []
        const itemsVisible = Math.min(Math.max(attrs.itemsVisible ?? 2, 1), attrs.items.length)

        if (attrs.circular && this.currentIndex + itemsVisible > attrs.items.length) {
            const tail = attrs.items.slice(this.currentIndex)
            const head = attrs.items.slice(0, itemsVisible - tail.length)
            return [...tail, ...head]
        }

        if (this.currentIndex >= attrs.items.length - itemsVisible) {
            return attrs.items.slice(attrs.items.length - itemsVisible)
        }

        return attrs.items.slice(this.currentIndex, this.currentIndex + itemsVisible)
    }
}

class CarouselItem extends MithrilTsxComponent<ICarouselItem> {
    view(v: m.Vnode<ICarouselItem>) {
        return <div className={"Carousel-item"}>
            <div className="title">
                {v.attrs.title}
            </div>
            <div className="content">{v.attrs.content}</div>
        </div>
    }
}