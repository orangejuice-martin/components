import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./Typewriter.scss"

export interface ITypewriter {
    title: string[],
    forwardCharacterDelayInSeconds?: number,
    backwardCharacterDelayInSeconds?: number,
    lineDelayInSeconds?: number,
    circular?: boolean
}

export class Typewriter extends MithrilTsxComponent<ITypewriter> {
    private lineIndex: number = 0
    private characterIndex: number = 0
    private timerId: number | undefined
    private controller: AbortController | undefined

    oninit(v: m.Vnode<ITypewriter>) {
        this.start(v.attrs)
    }

    onbeforeupdate(v: m.Vnode<ITypewriter>, o: m.Vnode<ITypewriter>) {
        if (!this.sameLines(v.attrs.title, o.attrs.title) ||
            v.attrs.forwardCharacterDelayInSeconds !== o.attrs.forwardCharacterDelayInSeconds ||
            v.attrs.backwardCharacterDelayInSeconds !== o.attrs.backwardCharacterDelayInSeconds ||
            v.attrs.lineDelayInSeconds !== o.attrs.lineDelayInSeconds ||
            v.attrs.circular !== o.attrs.circular
        ) {
            this.start(v.attrs)
        }
    }

    onremove() {
        this.stop()
    }

    private start(attrs: ITypewriter) {
        this.stop()

        if (!attrs.title?.length) {
            return
        }

        this.lineIndex = 0
        this.characterIndex = 0
        this.controller = new AbortController()
        this.typeForward(attrs, this.controller.signal)
    }

    private stop() {
        this.controller?.abort()
        this.controller = undefined

        if (this.timerId !== undefined) {
            window.clearTimeout(this.timerId)
            this.timerId = undefined
        }
    }

    private schedule(next: () => void, delayMs: number, signal: AbortSignal) {
        if (signal.aborted) {
            return
        }

        this.timerId = window.setTimeout(() => {
            if (signal.aborted) {
                return
            }
            next()
        }, delayMs)
    }

    private typeForward(attrs: ITypewriter, signal: AbortSignal) {
        const line = attrs.title[this.lineIndex] ?? ""

        if (this.characterIndex < line.length) {
            this.characterIndex++
            m.redraw()
            this.schedule(() => this.typeForward(attrs, signal), this.getForwardCharacterDelay(attrs), signal)
            return
        }

        const isLastLine = this.lineIndex >= attrs.title.length - 1
        if (isLastLine && !attrs.circular) {
            return
        }

        this.schedule(() => this.typeBackward(attrs, signal), this.getLineDelay(attrs), signal)
    }

    private typeBackward(attrs: ITypewriter, signal: AbortSignal) {
        if (this.characterIndex > 0) {
            this.characterIndex--
            m.redraw()
            this.schedule(() => this.typeBackward(attrs, signal), this.getBackwardCharacterDelay(attrs), signal)
            return
        }

        const isLastLine = this.lineIndex >= attrs.title.length - 1
        this.lineIndex = isLastLine ? 0 : this.lineIndex + 1

        this.typeForward(attrs, signal)
    }

    private getLineDelay(attrs: ITypewriter, defaultDelayInSeconds: number = 2) {
        return this.getDelayInMs(attrs.lineDelayInSeconds ?? defaultDelayInSeconds)
    }

    private getForwardCharacterDelay(attrs: ITypewriter, defaultDelayInSeconds: number = 0.1) {
        return this.getDelayInMs(attrs.forwardCharacterDelayInSeconds ?? defaultDelayInSeconds)
    }

    private getBackwardCharacterDelay(attrs: ITypewriter, defaultDelayInSeconds: number = 0.02) {
        return this.getDelayInMs(attrs.backwardCharacterDelayInSeconds ?? defaultDelayInSeconds)
    }

    private getDelayInMs(seconds: number) {
        return Math.max(10, (seconds) * 1000)
    }

    private sameLines(a: string[] = [], b: string[] = []) {
        return a.length === b.length && a.every((line, i) => line === b[i])
    }

    view(v: m.Vnode<ITypewriter>) {
        const line = v.attrs.title?.[this.lineIndex] ?? ""
        const text = line.slice(0, this.characterIndex)

        return <div className="Typewriter">{text}</div>
    }

}