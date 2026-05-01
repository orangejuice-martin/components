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
    private selectedValues = new Map<ListingProperties, Set<string | number>>()

    private getValuesForProperty(items: IListingItem[], property: ListingProperties): (string | number)[] {
        const values = new Set<string | number>()
        for (const item of items)
            for (const p of item.properties)
                if (p.property === property)
                    values.add(p.value)
        return [...values].sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }))
    }

    private handlePropertyClick(items: IListingItem[], property: ListingProperties) {
        if (this.selectedValues.get(property))
            this.selectedValues.delete(property)
        else
            this.selectedValues.set(property, new Set(this.getValuesForProperty(items, property)))
    }

    private handleValueClick(property: ListingProperties, value: string | number) {
        if (!this.selectedValues.has(property)) {
            this.selectedValues.set(property, new Set([value]))
            return
        }
        const selected = this.selectedValues.get(property)!
        if (selected.has(value))
            selected.delete(value)
        else
            selected.add(value)

        if (selected.size === 0)
            this.selectedValues.delete(property)
    }

    onbeforeupdate(v: m.Vnode<IListing>) {
    }

    view(v: m.Vnode<IListing>) {
        if (!v.attrs.items?.length) {
            return
        }

        const allItems = v.attrs.items

        var items = allItems

        if (this.selectedValues.size > 0) {
            items = items.filter(item =>
                [...this.selectedValues.entries()].some(([prop, vals]) =>
                    item.properties.some(p => p.property === prop && vals.has(p.value))
                )
            )
        }

        return <div className="Listing">
            {v.attrs.header && <Header title={v.attrs.header.title} heading={v.attrs.header.heading} />}
            <div className="Filter">
                {LISTING_PROPERTIES.map((property) => {
                    const allValues = this.getValuesForProperty(allItems, property)
                    if (allValues.length === 0) return null
                    const selected = this.selectedValues.get(property)
                    const selectedCount = selected?.size ?? 0
                    const allSelected = selectedCount === allValues.length
                    const someSelected = selectedCount > 0 && !allSelected
                    return <div className="Filter-group">
                        <label className="Filter-option Filter-option--property">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                indeterminate={someSelected}
                                onchange={() => this.handlePropertyClick(allItems, property)}
                            />
                            {property}
                        </label>
                        <div className="Filter-values">
                            {allValues.map(value => (
                                <label className="Filter-option Filter-option--value">
                                    <input
                                        type="checkbox"
                                        checked={selected?.has(value) ?? false}
                                        onchange={() => this.handleValueClick(property, value)}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </div>
                })}
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