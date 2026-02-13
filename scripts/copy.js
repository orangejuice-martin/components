const Path = require("path")
const Fs = require("fs")

const copyRecursive = (s, t) => {
  const children = Fs.readdirSync(s)

  children
    .map(x => [Path.join(s, x), Path.join(t, x)])
    .forEach(([source, target]) => {
      if (Fs.statSync(source).isDirectory()) {
        if (!Fs.existsSync(target)) {
          console.log(target)
          Fs.mkdirSync(target)
        }
        copyRecursive(source, target)
        return
      }
      Fs.copyFileSync(source, target)
    })
}

const source = Path.join(__dirname, "../assets/static")
const target = Path.join(__dirname, "../dist")
Fs.mkdirSync(source, { recursive: true })
Fs.mkdirSync(target, { recursive: true })
copyRecursive(source, target)