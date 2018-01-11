const find = require('osx-find-executable')
const spawn = require('child_process').spawn
const foreground = require('osx-foreground')
const osascript = require('osascript').eval

module.exports = (opts, cb) => {
  const env = Object.assign({}, process.env)
  if (opts.display) env.DISPLAY = `:${opts.display}`

  find('com.apple.Safari', (err, exec) => {
    if (err) return cb(err)

    const ps = spawn(exec)

    foreground(ps.pid, err => {
      if (err) return cb(err)

      osascript(`
        tell the application "Safari" to open location "${opts.uri}"
      `, {
        type: 'AppleScript'
      }, err => {
        if (err) return cb(err)
        cb(null, ps)
      })
    })
  })
}
