node-paiza-io
===

[paiza.io] API __unofficial__ wrapper - you can run any language on Node.js!

__Thank [paiza.io] for providing such greatest API!!__

[![npm](https://nodei.co/npm/paiza-io.png?downloads=true&stars=true)](https://nodei.co/npm/paiza-io/)
[![Build Status](https://travis-ci.org/MakeNowJust/node-paiza-io.svg?branch=master)](https://travis-ci.org/MakeNowJust/node-paiza-io)
[![Dependency Status](https://david-dm.org/MakeNowJust/node-paiza-io.svg)](https://david-dm.org/MakeNowJust/node-paiza-io)


notice for using
---

this package uses [paiza.io]'s API. __so please read [term of use (Japanese only)](http://paiza.jp/guide/kiyaku)__!

install
---

```console
$ npm install --save paiza-io
```


using
---

run Ruby on Node.js.

```javascript
var
paiza_io = require('paiza-io');

paiza_io('ruby', 'puts "Hello, Ruby World!"', '', function (error, result) {
  if (error) throw error;
  console.log('ruby result:');
  console.log(result.stdout); //=> Hello, Ruby World!
});
```

run Python on Node.js.

```javascript
var
paiza_io = require('paiza-io');

paiza_io('python', 'print "Hello, Python World!"', '', function (error, result) {
  if (error) throw error;
  console.log('python result:');
  console.log(result.stdout); //=> Hello, Python World!
});
```

run C++ on Node.js.

```javascript
var
paiza_io = require('paiza-io');

paiza_io('cpp', [
  '#include <iostream>',
  'int main(void) {',
  '  std::cout << "Hello, C++ World!" << std::endl;',
  '}',
].join('\n'), '', function (error, result) {
  if (error) throw error;
  console.log('c++ result:');
  console.log(result.stdout); //=> Hello, C++ World!
});
```


api
---

you may want to read official [API document] with this.

### `paiza_io(lang, code, input, option, callback)`

#### arguments

  - `lang` is language name. it will be passed as `language` parameter to [runners/create].
  - `code` is source code. it will be passed as `source_code` parameter to [runners/create].
  - `input` is stdin text. it will be passed as `input` parameter to [runners/create].
  - `option` is a json. it is an optional argument. it follws such keys/values.
    - `option.api_key`  is your API key of paiza-io. it will be passed as `api_key` parameter to all request.
    - `option.base_url` uses as base URL for API request.
    - `option.max_get_status_loop` is max number of [runners/get_status] request for checking completed running.  If requests number is overflow this, `paiza_io` throws an error.
    - `option.retry_get_status_time` is a time of retrying [runners/get_status].
    - `option.parameter` will be passed to [runners/create].
  - `callback` is a `Function` whose signature is `function callback(error, result)`. `result` is result json of [runners/get_details], however it is extended by `http_result` parameter which is http response of [runners/get_details].

#### returns

it dosen't return clearly, so its result is `undefined`.


- - -

### `paiza_io.with_api_key(api_key)`

#### arguments

 - `api_key` is your API key of paiza-io. it will be passed as `api_key` parameter to all request.

#### returns

it returns wrapped `paiza_io` function.


license
---

this package was published under the [MIT-License](http://makenowjust.github.io/license/mit?2015).

contribute
---

if this package has a bug and you fix it, i am waiting your pull-request and issue :laughing:

[paiza.io]: http://paiza.io
[API document]: https://api.paiza.io/docs/swagger/
[runners/create]: https://api.paiza.io/docs/swagger/#!/runners/Runners_create
[runners/get_status]: https://api.paiza.io/docs/swagger/#!/runners/Runners_get_status
[runners/get_details]: https://api.paiza.io/docs/swagger/#!/runners/Runners_get_details
