# osx-safari

Launch a fresh safari on OSX.

## Example

```js
const safari = require('osx-safari')

safari({ uri: 'https://github.com/' }, (err, ps) => {
  if (err) throw err    
  ps.on('error', console.error)
})
```

## Installation

```js
$ npm install osx-safari
```

## API

### safari(opts, cb)

Options:

- `display`: Sets `DISPLAY=:${opts.display}` for xvfb support
- `uri`: The uri to open

## License

MIT
