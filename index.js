
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
  var keys = emitter({
    onkeydown: on('down'),
    onkeyup: on('up')
  });
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
        keys.emit(state, key, ev);
        return false;
      }
    };
  }
};
