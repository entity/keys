
/*!
 *
 * keys
 *
 * bind to a key map
 *
 * MIT
 *
 */

/**
 * Module dependencies.
 */

var emitter = require('emitter');
var prevent = require('prevent');
var stop = require('stop');

/**
 * Creates key `map` handler.
 *
 * `map` is an object with keycode property names
 * where their corresponding values are emitted
 * on keyup/down events.
 *
 * @param {Object} map
 * @return {Object}
 * @api public
 */

module.exports = function(map){
  var pressed = {};
  var keys = emitter({});
  keys.onkeydown = on('keydown');
  keys.onkeyup = on('keyup');
  on.keydown = onkeydown;
  on.keyup = onkeyup;
  return keys;

  /**
   * Listener factory for key `state`.
   *
   * @param {String} state
   * @return {Function}
   * @api private
   */

  function on(state){
    return function(ev){
      var key = map[ev.which];
      if (key) {
        stop(ev);
        prevent(ev);
        on[state](ev, key);
        return false;
      }
    };
  }

  /**
   * Keydown handler.
   *
   * @param {Event} event
   * @param {Mixed} key
   * @api private
   */

  function onkeydown(event, key){
    if (pressed[key]) return;
    pressed[key] = true;
    keys.emit('keydown', event, key);
    keys.emit('change', event, key, 'down');
  }

  /**
   * Keyup handler.
   *
   * @param {Event} event
   * @param {Mixed} key
   * @api private
   */

  function onkeyup(event, key){
    pressed[key] = false;
    keys.emit('keyup', event, key);
    keys.emit('change', event, key, 'up');
  }
};
