const spawn = require('child_process').spawn
const find = require('osx-find-executable')
const fs = require('fs')

module.exports = (opts, cb) => {
  const env = Object.assign({}, process.env)
  if (opts.display) env.DISPLAY = `:${opts.display}`

  find('org.mozilla.firefox', (err, exec) => {
    if (err) return cb(err)

    '.proxy'
    '.noProxy'
    '.background'
    '.display'
    '.uri'

    const args = [
      '-no-remote',
      !opts.background && '-foreground',
      '-silent',
      opts.display && `-display=${opts.display}`
    ].filter(Boolean)

    const prefs = {
      'browser.shell.checkDefaultBrowser': false
    }

    if (opts.proxy) {
      var m = /^(?:http:\/\/)?([^:\/]+)(?::(\d+))?/.exec(opts.proxy)
      var host = JSON.stringify(m[1])
      var port = m[2] || 80
      prefs['network.proxy.http'] = host
      prefs['network.proxy.http_port'] = port
      prefs['network.proxy.type'] = 1
      prefs['browser.cache.disk.capacity'] = 0
      prefs['browser.cache.disk.smart_size.enabled'] = false
      prefs['browser.cache.disk.smart_size.first_run'] = false
      prefs['browser.sessionstore.resume_from_crash'] = false
      prefs['browser.startup.page'] = 0
      prefs['network.proxy.no_proxies_on'] = JSON.stringify(opts.noProxy || '')
    }

    const profile = Object.keys(prefs)
      .reduce((acc, key) => `${acc}user_pref('${key}', ${prefs[key]});\n`, '')
    const profileFolder = `/tmp/${Math.random().toString(16).slice(2)}`

    fs.mkdir(profileFolder, err => {
      if (err) return cb(err)

      fs.writeFile(`${profileFolder}/user.js`, profile, err => {
        if (err) return cb(err)
        args.push('-profile')
        args.push(profileFolder)
        args.push(opts.uri)
        cb(null, spawn(exec, args, { env }))
      })
    })
  })
}
