// paiza-io.js - this module is the wrapper of paiza.io API.

var
_     = require('lodash'),
debug = require('debug')('paiza-io');

var
api = require('./api'),
config = require('./config');

// === exports ===

function paiza_io(language, code, input, option, callback) {
  // `parameter` is a optional parameter.
  if (!callback) {
    callback = option;
    option = {};
  }
  option = _.defaults(_.clone(option), {
    base_url: config.base_url,
    retry_get_status_time: 1000,
    max_get_status_loop: 10,
    api_key: config.api_key,
  });

  var
  parameter = _.assign({
    language: language,
    source_code: code,
    input: input,
    api_key: option.api_key,
  }, option.parameter);

  create(parameter, option, callback);
}

function create(parameter, option, callback) {
  debug('create phase');
  api.create(parameter, get_status(option, callback));
}

function get_status(option, callback) {
  return function create_callback(error, body) {
    if (error) return callback(error);
    debug('response ==> %o', body);
    debug('get_status phase');

    (function loop(count, body) {
      debug('get_status loop (%d)', count);
      if (body.status === 'completed') {
        return get_details(body.id, option, callback);
      }
      if (count >= option.max_get_status_loop) {
        // TODO: change an error message to courteouseness.
        return callback(new Error('get_status_loop overflow!'));
      }

      setTimeout(function get_status_loop_timeout() {
        api.get_status({
          id: body.id,
          api_key: option.api_key,
        }, function (error, body) {
          if (error) return callback(error);
          debug('response ==> %o', body);
          loop(count + 1, body);
        });
      }, option.retry_get_status_time);
    })(0, body);
  }
}

function get_details(id, option, callback) {
  debug('get_details phase');
  api.get_details({
    id: id,
    api_key: option.api_key,
  }, callback);
}

module.exports = paiza_io;
