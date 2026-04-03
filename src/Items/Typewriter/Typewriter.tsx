import m from "mithril"
import { MithrilTsxComponent } from "mithril-tsx-component"
import "./Typewriter.scss"

const pause = (ms: number) =>
    new Promise(r => setTimeout(r, ms))

export interface ITypewriter {
    lines: string[],
    forwardCharacterDelayInSeconds?: number,
    backwardCharacterDelayInSeconds?: number,
    lineDelayInSeconds?: number,
    circular?: boolean
}

export class Typewriter extends MithrilTsxComponent<ITypewriter> {
    private abortController: AbortController | undefined
    private root: HTMLElement | undefined

    oncreate(v: m.VnodeDOM<ITypewriter>) {
        this.root = v.dom as HTMLElement
        this.start(v.attrs)
    }

    onbeforeupdate(v: m.Vnode<ITypewriter>, o: m.Vnode<ITypewriter>) {
        if (!this.sameLines(v.attrs.lines, o.attrs.lines) ||
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

        if (!attrs.lines?.length) {
            return
        }

        this.abortController = new AbortController()
        this.write(attrs, this.abortController.signal)
    }

    private stop() {
        this.abortController?.abort()
        delete this.abortController
    }

    private async write(attrs: ITypewriter, abortSignal: AbortSignal){
        const forwardCharacterDelay = this.getForwardCharacterDelay(attrs)
        const backwardCharacterDelay = this.getBackwardCharacterDelay(attrs)
        const lineDelay = this.getLineDelay(attrs)

        while (true) {
            console.log("Starting typewriter loop")

            for (let lineNumber = 0; lineNumber < attrs.lines.length; lineNumber++) {

                console.log("line", lineNumber)

                const line = attrs.lines[lineNumber]

                let characterIndex = 0

                for (; characterIndex < line.length; characterIndex++) {
                    if (abortSignal.aborted)
                        return

                    const text = line.slice(0, characterIndex +1)
                    if (this.root) this.root.textContent = text
                    await pause(forwardCharacterDelay)
                }

                if (!attrs.circular && lineNumber === attrs.lines.length - 1)
                    return

                await pause(lineDelay)

                for (; characterIndex > 0; characterIndex--) {
                    if (abortSignal.aborted)
                        return

                    const text = line.slice(0, characterIndex + 1)
                    if (this.root) this.root.textContent = text
                    await pause(backwardCharacterDelay)
                }
            }
        }
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
        return <div className="Typewriter" />
    }

}