import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import { Header } from "../../items/Header/Header"
import "./Options.scss"

export interface OptionDefinition {
  title: string
  value: boolean | number
}

export interface IOptions {
  options: Record<string, OptionDefinition>
  onChange: (key: string, value: boolean | number) => void
}

export class Options extends MithrilTsxComponent<IOptions> {
  view(v: m.Vnode<IOptions>) {
    const { options, onChange } = v.attrs
    const entries = Object.entries(options) as [string, OptionDefinition][]

    return (
      <div className="options-panel">
        <Header title="Options" heading="h3" />
        {entries.map(([key, option]) => (
          <label>
            {typeof option.value === "number"
              ? <input
                  type="number"
                  min={1}
                  value={option.value}
                  oninput={(e: any) => {
                    const nextValue = Math.max(1, Number(e.target.value) || 1)
                    onChange(key, nextValue)
                  }}
                />
              : <input
                  type="checkbox"
                  checked={option.value}
                  onchange={() => onChange(key, !option.value)}
                />}
            {option.title}
          </label>
        ))}
      </div>
    )
  }
}
