# osx-firefox

Launch a fresh Firefox on OSX.

## Example

```js
const firefox = require('osx-firefox')

firefox({ uri: 'https://github.com/' }, (err, ps) => {
  if (err) throw err    
  ps.on('error', console.error)
})
```

## Installation

```js
$ npm install osx-firefox
```

Firefox needs to be installed on your system as well.

## API

### firefox(opts, cb)

Options:

- `display`: Set process.env.DISPLAY to `:${opts.display}` for xvfb support
- `proxy`: Proxy server settings
- `noProxy`: Proxy routes to skip
- `background`: Don't foreground the browser

## License

MIT
