import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./Link.scss"

export interface ILink {
   url: string,
   title: string,
   className?: string
   target?: string
}

export class Link extends MithrilTsxComponent<ILink> {
   
   view(v: m.Vnode<ILink>) {
      return <a href={`${v.attrs.url}`} target={`${v.attrs.target}`} className={`${v.attrs.className}`}>{v.attrs.title}</a>
   }

}