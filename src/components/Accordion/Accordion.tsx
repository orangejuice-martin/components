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
   private openItems: Set<number> = new Set()
   private canOpenMultiple: boolean = false

   oninit(v: m.Vnode<IAccordion>) {
      if (v.attrs.openFirstOnLoad) {
         this.openItems.add(0)
      }
      this.canOpenMultiple = v.attrs.canOpenMultiple || false
   }

   onbeforeupdate(newVnode: m.Vnode<IAccordion>, oldVnode: m.Vnode<IAccordion>) {
      if (newVnode.attrs.canOpenMultiple !== oldVnode.attrs.canOpenMultiple) {
         this.canOpenMultiple = newVnode.attrs.canOpenMultiple || false
         if (!this.canOpenMultiple) {
            if (this.openItems.size > 1) {
               const lowestIndex = Math.min(...Array.from(this.openItems))
               this.openItems.clear()
               this.openItems.add(lowestIndex)
            }
         }
      }
      if (newVnode.attrs.openFirstOnLoad !== oldVnode.attrs.openFirstOnLoad) {         
         if (newVnode.attrs.openFirstOnLoad && this.openItems.has(0) === false) {
            this.openItems.add(0)
         }
      }
   }

   handleClick(index: number) {
      if (this.canOpenMultiple) {
         if (this.openItems.has(index)) {
            this.openItems.delete(index)
         } else {
            this.openItems.add(index)
         }
      } else {
         if (this.openItems.has(index)) {
            this.openItems.clear()
         } else {
            this.openItems.clear()
            this.openItems.add(index)
         }
      }
   }

   view(v: m.Vnode<IAccordion>) {
      const {nummerableTitles, header, items } = v.attrs

      if (!items || items.length === 0) {
         return null
      }

      return <div className="Accordion">
         {header && <Header title={header.title} heading={header.heading} />}
         {items.map((item, index) => 
            <AccordionItem 
               index={index} 
               title={item.title} 
               content={item.content}
               open={this.openItems.has(index)}
               nummerableTitle={nummerableTitles || false}
               onClick={() => this.handleClick(index)}
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
   nummerableTitle: boolean,
   onClick: (index: number) => void
}

class AccordionItem extends MithrilTsxComponent<IAccordionData> {
  view(v: m.Vnode<IAccordionData>) {
   const { index, title, content, open, nummerableTitle, onClick } = v.attrs
   const icon = open ? "▲" : "▼"
   const concattedTitle = nummerableTitle ? `${index + 1}. ${title}` : title

   return <div className="Accordion-item" key={index}>
            <div className="title" onclick={() => onClick(index)}>
               <span className="icon">{icon}</span>
               {concattedTitle}
            </div>
            {open && <div className="content">{content}</div>}
         </div>
  }
}