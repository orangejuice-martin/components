import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./Listing.scss"
import { Header, type IHeader } from "../../items/header/Header"
import type { IAccordionItem } from "../accordion/Accordion"

export interface IListing {
    header?: IHeader
    items: IListingItem[]
}

export enum ListingProperties {
    Size = "Size",
    Color = "Color",
    Weight = "Weight"
}

export interface IListingItem {
    title: string
    content: m.Children
    properties: { [key in ListingProperties]?: string | number | boolean }
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
        if (!v.attrs.items || v.attrs.items.length === 0) {
            return
        }

        var items = v.attrs.items

        if (this.selectedProperties.size > 0) {
            items = items.filter(item =>
                Object.keys(item.properties).some(key => this.selectedProperties.has(key as ListingProperties))
            )
        }

        return <div className="Listing">
            {v.attrs.header && <Header title={v.attrs.header.title} heading={v.attrs.header.heading} />}
            <div className="Filter">
                {Object.values(ListingProperties).map((property) => (
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
            {v.attrs.properties && Object.keys(v.attrs.properties).length > 0 && (
                <div className="properties">
                    {Object.entries(v.attrs.properties).map(([key, value]) => (
                        <div className="property">
                            <span className="property-key">{key}:</span>
                            <span className="property-value">{value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    }
}