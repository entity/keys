
# keys

bind to a key map

## Installing

`component install entity/keys`

## Example

```js
var map = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

var keys = require('keys')(map).bind();

keys.on('down', console.log); // => left, up, ...
keys.on('up', console.log); // => right, down, ...
```

## API

### keys(map)

Creates key `map` handler.

`map` is an object with keycode property names
where their corresponding values are emitted
on keyup/down events.

### #bind(el)

Bind key events to `el`. Defaults to `document.body`.

### #unbind(el)

Unbind key events from `el`. Defaults to `document.body`.

## Events

- `down` (value, event)
- `up` (value, event)

## License

MIT
