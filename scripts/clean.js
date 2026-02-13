const Path = require("path")
const Fs = require("fs")

const rmFilesRecursive = path => {
  if (!Fs.existsSync(path))
    return

  Fs.readdirSync(path)
    .forEach(file => {
      const curPath = Path.join(path, file)
      if (Fs.lstatSync(curPath).isDirectory())
        rmFilesRecursive(curPath)
      else
        Fs.unlinkSync(curPath)
    })
}

rmFilesRecursive(Path.join(__dirname, "../dist"))