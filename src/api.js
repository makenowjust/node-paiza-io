// api.js - This module is a shallow wrapper of paiza.io API.

var
_       = require('lodash'),
debug   = require('debug')('paiza-io:api'),
request = require('request');

var
config = require('./config');

// === utility ===

function wrap_request(method, base_url, path, parameter, callback) {
  debug('request start');
  debug('method = %s', method);
  debug('base_url = %s', base_url);
  debug('path = %s', path);
  debug('parameter = %o', parameter);

  var
  options = {
    method: method,
    url: base_url + path,
    json: true,
  };
  if (method.toUpperCase() === 'POST') {
    options.form = parameter;
  } else {
    options.qs = parameter;
  }

  request(options, function request_callback(error, response, body) {
    if (error) return callback(error);

    if (body.error) {
      error = new Error('paiza.io error: ' + body.error);
      error.paizaIoMessage = body.error;
      return callback(error);
    }

    body.http_response = response; // extends body object for useful.
    return callback(null, body);
  });
}

// === exports ===

// wrapper of runners/create
function create(parameter, callback) {
  return wrap_request(
    config.api.create.method,
    config.base_url,
    config.api.create.path,
    parameter,
    callback);
}

// wrapper of runners/get_status
function get_status(parameter, callback) {
  return wrap_request(
    config.api.get_status.method,
    config.base_url,
    config.api.get_status.path,
    parameter,
    callback);
}

// wrapper of runners/get_details
function get_details(parameter, callback) {
  return wrap_request(
    config.api.get_details.method,
    config.base_url,
    config.api.get_details.path,
    parameter,
    callback);
}

exports.create = create;
exports.get_status = get_status;
exports.get_details = get_details;
