import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./Header.scss"

export interface IHeader {
   title: string,
   heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export class Header extends MithrilTsxComponent<IHeader> {

   view(v: m.Vnode<IHeader>) {
      return m(v.attrs.heading, v.attrs.title)
   }

}