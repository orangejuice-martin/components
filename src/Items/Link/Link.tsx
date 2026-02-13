import m from "mithril"
import "./Link.scss"
import { MithrilTsxComponent } from "mithril-tsx-component"

export interface ILink {
   url: string,
   title: string,
   className?: string
   target?: string
}

export class Link extends MithrilTsxComponent<ILink> {
   
   view(v: m.Vnode<ILink>) {
      const { url, title, className, target } = v.attrs

      return <a href={`${url}`} target={`${target}`} className={`${className}`}>{title}</a>
   }

}