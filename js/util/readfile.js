const fs = require('fs')

function readFile(file) {
    let data;
    try {
        data = fs.readFileSync(file, 'utf8')
      } catch (err) {
        console.error(`Error reading ${file}`, err)
      }

      return data;
}

module.exports = { readFile }
