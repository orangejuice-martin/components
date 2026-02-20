import m from "mithril"
import "./Accordion.scss"
import { MithrilTsxComponent } from "mithril-tsx-component"
import { Header, type IHeader } from "../../Items/Header/Header"

export interface IAccordion {
   canOpenMultiple?: boolean
   openFirstOnLoad?: boolean
   nummerableTitles?: boolean
   header?: IHeader
   items: IAccordionItem[]
}

export interface IAccordionItem {
   title: string
   content: m.Children
}

export class Accordion extends MithrilTsxComponent<IAccordion> {
   private openItems = new Set<IAccordionItem>()

   oninit(v: m.Vnode<IAccordion>) {
      if (v.attrs.openFirstOnLoad) {
         this.openItems.add(v.attrs.items[0])
      }
   }

   onbeforeupdate(v: m.Vnode<IAccordion>, o: m.Vnode<IAccordion>) {
      if (!v.attrs.canOpenMultiple && this.openItems.size > 1) {
         const items = Array.from(this.openItems)

         for (let i = 1; i < items.length; i++)
            this.openItems.delete(items[i])
      }

      if (v.attrs.openFirstOnLoad && !o.attrs.openFirstOnLoad && this.openItems.size === 0)
         this.openItems.add(v.attrs.items[0])
   }

   handleClick(v: m.Vnode<IAccordion>, item: IAccordionItem, index: number) {
      if (this.openItems.has(item))
         return this.openItems.delete(item)

      if (!v.attrs.canOpenMultiple)
         this.openItems.clear()

      this.openItems.add(item)
   }

   view(v: m.Vnode<IAccordion>) {
      if (!v.attrs.items || v.attrs.items.length === 0) {
         return null
      }

      return <div className="Accordion">
         {v.attrs.header && <Header title={v.attrs.header.title} heading={v.attrs.header.heading} />}
         {v.attrs.items.map((item, index) => 
            <AccordionItem 
               index={index} 
               title={item.title} 
               content={item.content}
               open={this.openItems.has(item)}
               nummerableTitle={v.attrs.nummerableTitles}
               onClick={() => this.handleClick(v, item, index)}
            />
         )}
      </div>
   }
}

interface IAccordionData {
   index: number
   title: string
   content: m.Children
   open: boolean,
   nummerableTitle?: boolean,
   onClick: (index: number) => void
}

class AccordionItem extends MithrilTsxComponent<IAccordionData> {
   view(v: m.Vnode<IAccordionData>) {
      return <div className={"Accordion-item" + (v.attrs.open ? " -open" : "")} key={v.attrs.index}>
         <div className="title" onclick={() => v.attrs.onClick(v.attrs.index)}>
            <span className="icon">▼</span>
            {v.attrs.nummerableTitle && `${v.attrs.index + 1}.`} {v.attrs.title}
         </div>
         {open && <div className="content">{v.attrs.content}</div>}
      </div>
  }
}