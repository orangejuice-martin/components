import m from "mithril"
import "./Header.scss"
import { MithrilTsxComponent } from "mithril-tsx-component"

export interface IHeader {
   title: string,
   heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export class Header extends MithrilTsxComponent<IHeader> {
   
   view(v: m.Vnode<IHeader>) {
      const { title, heading } = v.attrs

      return m(heading, title)
   }

}