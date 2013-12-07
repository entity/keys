
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

var event = require('event');
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
  var ondown = on('down');
  var onup = on('up');
  var keys = emitter({
    bind: bind,
    unbind: unbind
  });
  return keys;

  /**
   * Binds key events to `el`.
   *
   * Defaults to `document.body`.
   *
   * @param {Element} [el]
   * @return {Object}
   * @api public
   */

  function bind(el){
    el = el || document.body;
    event.bind(el, 'keydown', ondown);
    event.bind(el, 'keyup', onup);
    return keys;
  }

  /**
   * Unbinds key events from `el`.
   *
   * Defaults to `document.body`.
   *
   * @param {Element} [el]
   * @return {Object}
   * @api public
   */

  function unbind(el){
    el = el || document.body;
    event.unbind(el, 'keydown', ondown);
    event.unbind(el, 'keyup', onup);
    return keys;
  }

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
