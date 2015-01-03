#node-paiza-io [![Build Status](https://travis-ci.org/MakeNowJust/bloem.js.svg?branch=master)](https://travis-ci.org/MakeNowJust/bloem.js)

[paiza.io] API __unofficial__ wrapper - you can run any language on Node.js!

<font size=6>Thank [paiza.io] for providing such greatest API!!</font>

##install

```console
$ npm install --save paiza-io
```


##using

run Ruby on Node.js.

```javascript
var
paiza_io = require('paiza_io');

paiza_io('ruby', 'puts "Hello, Ruby World!"', '', function (error, result) {
  if (error) throw error;
  console.log('ruby result:');
  console.log(result.stdout); //=> Hello, Ruby World!
});
```

run Python on Node.js.

```javascript
var
paiza_io = require('paiza_io');

paiza_io('python', 'print "Hello, Python World!"', '', function (error, result) {
  if (error) throw error;
  console.log('python result:');
  console.log(result.stdout); //=> Hello, Python World!
});
```

run C++ on Node.js.

```
var
paiza_io = require('paiza_io');

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

##api

you may want to read official [API document] with this.

###`paiza_io(lang, code, input, option, callback)`

####arguments

  - `lang` is language name. it will be passed as `language` parameter to [runners/create].
  - `code` is source code. it will be passed as `source_code` parameter to [runners/create].
  - `input` is stdin text. it will be passed as `input` parameter to [runners/create].
  - `option` is a json. it is an optional argument. it follws such keys/values.
    - `option.base_url` uses as base URL for API request.
    - `option.max_get_status_loop` is max number of [runners/get_status] request for checking completed running.  If requests number is overflow this, `paiza_io` throws an error.
    - `option.retry_get_status_time` is a time of retrying [runners/get_status].
    - `option.parameter` will be passed to [runners/create].

####returns

it don't return clearly, so its result is `undefined`.


##license

this package was published under the [MIT-License](http://makenowjust.github.io/license/mit?2015).

##contribute

if this package has a bug and you fix it, i am waiting your pull-request and issue :laughing:

[paiza.io]: http://paiza.io
[API document]: https://api.paiza.io/docs/swagger/
[runners/create]: https://api.paiza.io/docs/swagger/#!/runners/Runners_create
[runners/get_status]: https://api.paiza.io/docs/swagger/#!/runners/Runners_get_status
