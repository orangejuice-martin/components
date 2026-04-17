import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./Carousel.scss"
import { Header, type IHeader } from "../../items/header/Header"

export interface ICarousel {
    header?: IHeader
    circular?: boolean
    itemsVisible?: number
    items: ICarouselItem[]
}

export interface ICarouselItem {
    title: string
    content: m.Children
}

export class Carousel extends MithrilTsxComponent<ICarousel> {
    private currentIndex: number = 0

    onbeforeupdate(v: m.Vnode<ICarousel>) {
        if (!v.attrs.items || v.attrs.items.length === 0) {
            this.currentIndex = 0
        }
        else if (v.attrs.items.length - 1 < this.currentIndex) {
            this.currentIndex = v.attrs.items.length - 1;
        }
    }

    view(v: m.Vnode<ICarousel>) {
        if (!v.attrs.items || v.attrs.items.length === 0) {
            return
        }

        const itemsVisible = Math.min(Math.max(v.attrs.itemsVisible ?? 2, 1), v.attrs.items.length)

        const items = this.getVisibleItems(v, itemsVisible);

        if (items.length === 0) {
            return
        }

        const showNavigation = v.attrs.items.length > itemsVisible
        const disablePrevious = showNavigation && !v.attrs.circular && this.currentIndex === 0
        const disableNext = showNavigation && !v.attrs.circular && this.currentIndex >= v.attrs.items.length - itemsVisible

        return <div className="Carousel">
            {v.attrs.header && <Header title={v.attrs.header.title} heading={v.attrs.header.heading} />}
            <div className="Carousel-nav">
                {showNavigation &&
                    <button className="Carousel-prev" onclick={() => this.currentIndex = (this.currentIndex - 1 + v.attrs.items.length) % v.attrs.items.length} disabled={disablePrevious}>&lt;</button>
                }
                <div className="Carousel-items">
                    {items.map((item) =>
                        <CarouselItem
                            title={item.title}
                            content={item.content}
                        />
                    )}
                </div>
                {showNavigation &&
                    <button className="Carousel-next" onclick={() => this.currentIndex = (this.currentIndex + 1) % v.attrs.items.length} disabled={disableNext}>&gt;</button>
                }
            </div>
        </div>
    }

    private getVisibleItems(v: m.Vnode<ICarousel>, itemsVisible: number): ICarouselItem[] {
        if (v.attrs.circular && this.currentIndex + itemsVisible > v.attrs.items.length) {
            const tail = v.attrs.items.slice(this.currentIndex)
            const head = v.attrs.items.slice(0, itemsVisible - tail.length)
            return [...tail, ...head]
        }

        if (this.currentIndex >= v.attrs.items.length - itemsVisible) {
            return v.attrs.items.slice(v.attrs.items.length - itemsVisible, v.attrs.items.length)
        }

        return v.attrs.items.slice(this.currentIndex, this.currentIndex + itemsVisible)
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