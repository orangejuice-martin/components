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

type FilterEntry = { active: boolean; count: number }

export class Listing extends MithrilTsxComponent<IListing> {
    private filterState = new Map<ListingProperties, Map<string | number, FilterEntry>>()

    private buildFilterState(items: IListingItem[]) {
        this.filterState.clear()
        for (const property of LISTING_PROPERTIES) {
            const valueMap = new Map<string | number, FilterEntry>()
            for (const item of items)
                for (const p of item.properties)
                    if (p.property === property) {
                        const entry = valueMap.get(p.value)
                        if (entry) entry.count++
                        else valueMap.set(p.value, { active: false, count: 1 })
                    }
            if (valueMap.size > 0) {
                const sorted = new Map([...valueMap.entries()].sort(([a], [b]) =>
                    String(a).localeCompare(String(b), undefined, { numeric: true })
                ))
                this.filterState.set(property, sorted)
            }
        }
    }

    private handlePropertyClick(property: ListingProperties) {
        const valueMap = this.filterState.get(property)!
        const anyActive = [...valueMap.values()].some(e => e.active)
        for (const entry of valueMap.values()) entry.active = !anyActive
    }

    private handleValueClick(property: ListingProperties, value: string | number) {
        const entry = this.filterState.get(property)?.get(value)
        if (entry) entry.active = !entry.active
    }

    private isFiltering(): boolean {
        return [...this.filterState.values()].some(valueMap =>
            [...valueMap.values()].some(e => e.active)
        )
    }

    oninit(v: m.Vnode<IListing>) {
        this.buildFilterState(v.attrs.items ?? [])
    }

    onbeforeupdate(v: m.Vnode<IListing>, old: m.Vnode<IListing>) {
        if (v.attrs.items !== old.attrs.items)
            this.buildFilterState(v.attrs.items ?? [])
    }

    view(v: m.Vnode<IListing>) {
        if (!v.attrs.items?.length) {
            return
        }

        var items = v.attrs.items

        if (this.isFiltering()) {
            items = items.filter(item =>
                item.properties.some(p => this.filterState.get(p.property)?.get(p.value)?.active)
            )
        }

        return <div className="Listing">
            {v.attrs.header && <Header title={v.attrs.header.title} heading={v.attrs.header.heading} />}
            <div className="Filter">
                {LISTING_PROPERTIES.map((property) => {
                    const valueMap = this.filterState.get(property)
                    if (!valueMap) return null
                    const entries = [...valueMap.entries()]
                    const activeCount = entries.filter(([, e]) => e.active).length
                    const allSelected = activeCount === entries.length
                    const someSelected = activeCount > 0 && !allSelected
                    return <div className="Filter-group">
                        <label className="Filter-option Filter-option--property">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                indeterminate={someSelected}
                                onchange={() => this.handlePropertyClick(property)}
                            />
                            {property}
                        </label>
                        <div className="Filter-values">
                            {entries.map(([value, entry]) => (
                                <label className="Filter-option Filter-option--value">
                                    <input
                                        type="checkbox"
                                        checked={entry.active}
                                        onchange={() => this.handleValueClick(property, value)}
                                    />
                                    {value} ({entry.count})
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