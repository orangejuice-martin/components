import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"

export interface IFrag {
  [key: string]: any
}

export class Frag extends MithrilTsxComponent<IFrag> {
  view(v: m.Vnode<IFrag>) {
    return m.fragment(v.attrs, v.children)
  }
}