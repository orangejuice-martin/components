import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./Listing.scss"
import { Header, type IHeader } from "../../items/header/Header"

export interface IListing {
    header?: IHeader
    items: IListingItem[]
}

export const LISTING_PROPERTIES = ["Size", "Color", "Weight"] as const
export type ListingProperties = typeof LISTING_PROPERTIES[number]

export type ListingProperty =
    | { property: "Size"; value: string }
    | { property: "Color"; value: string }
    | { property: "Weight"; value: number }

export interface IListingItem {
    title: string
    content: m.Children
    properties: ListingProperty[]
}

export class Listing extends MithrilTsxComponent<IListing> {
    private selectedProperties = new Set<ListingProperties>()

    onbeforeupdate(v: m.Vnode<IListing>) {
    }

    handleClick(v: m.Vnode<IListing>, property: ListingProperties) {
        if (this.selectedProperties.has(property))
            return this.selectedProperties.delete(property)
        else
            this.selectedProperties.add(property)
    }

    view(v: m.Vnode<IListing>) {
        if (!v.attrs.items?.length) {
            return
        }

        var items = v.attrs.items

        if (this.selectedProperties.size > 0) {
            items = items.filter(item =>
                item.properties.some(p => this.selectedProperties.has(p.property))
            )
        }

        return <div className="Listing">
            {v.attrs.header && <Header title={v.attrs.header.title} heading={v.attrs.header.heading} />}
            <div className="Filter">
                {LISTING_PROPERTIES.map((property) => (
                    <label className="Filter-option">
                        <input
                            type="checkbox"
                            checked={this.selectedProperties.has(property)}
                            onchange={() => this.handleClick(v, property)}
                        />
                        {property}
                    </label>
                ))}
            </div>
            <div className="Listing-items">
                {items.map((item) =>
                    <ListingItem
                        title={item.title}
                        content={item.content}
                        properties={item.properties}
                    />
                )}
            </div>
        </div>
    }

}

class ListingItem extends MithrilTsxComponent<IListingItem> {
    view(v: m.Vnode<IListingItem>) {
        return <div className={"Listing-item"}>
            <div className="title">
                {v.attrs.title}
            </div>
            <div className="content">{v.attrs.content}</div>
            {v.attrs.properties?.length > 0 && (
                <div className="properties">
                    {v.attrs.properties.map(p => (
                        <div className="property">
                            <span className="property-key">{p.property}:</span>
                            <span className="property-value">{p.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    }
}