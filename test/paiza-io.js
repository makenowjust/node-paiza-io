var
_      = require('lodash'),
qs     = require('querystring'),
chai   = require('chai'),
expect = chai.expect,
nock   = require('nock');

var
paiza_io = require('..');

describe('paiza_io', function () {
  var
  config = require('../src/config');
  this.timeout(5000);

  var
  id = 'abcdefgtest', lang = 'ruby', code = 'puts "Hello, World!"', input = '',
  stdout = 'Hello, World!\n', stderr = '', exit_code = 0, time = '0.11', memory = 4200, result_ = 'success',
  param = qs.stringify({
    id: id,
    api_key: config.api_key,
  });

  afterEach(function () {
    nock.cleanAll();
  });

  function create_scope() {
    return nock(config.base_url)
      //.log(console.log)
      .post(config.api.create.path)
      .reply(200, {
        id: id,
        status: 'running',
      })
      .get(config.api.get_status.path + '?' + param)
      .times(2)
      .reply(200, {
        id: id,
        status: 'running',
      })
      .get(config.api.get_status.path + '?' + param)
      .reply(200, {
        id: id,
        status: 'completed',
      })
      .get(config.api.get_details.path + '?' + param)
      .reply(200, {
        id: id,
        language: lang,
        note: '',
        status: 'completed',
        build_stdout: null, build_stderr: null,
        build_exit_code: 0,
        build_time: null,
        build_memory: null,
        build_result: null,
        stdout: stdout, stderr: stderr,
        exit_code: exit_code,
        time: time,
        memory: memory,
        result: result_,
      });
  }

  it('should return execute result.', function (done) {
    var
    scope = create_scope();

    paiza_io(lang, code, input, {}, function (error, result) {
      expect(error).to.be.null;
      expect(result.id).to.equal(id);
      expect(result.language).to.equal(lang);
      expect(result.status).to.equal('completed');
      expect(result.stdout).to.equal(stdout);
      expect(result.stderr).to.equal(stderr);
      expect(result.exit_code).to.equal(exit_code);
      // expect(result.time).to.equal(time);
      // expect(result.memory).to.equal(memory);
      expect(result.result).to.equal(result_);
    });
    setTimeout(function () {
      scope.done();
      done();
    }, 4000);
  });

  it('should use `option` as an optional argument.', function (done) {
    var
    scope = create_scope();

    paiza_io(lang, code, input, function (error, result) {
      expect(error).to.be.null;
      expect(result.id).to.equal(id);
      expect(result.language).to.equal(lang);
      expect(result.status).to.equal('completed');
      expect(result.stdout).to.equal(stdout);
      expect(result.stderr).to.equal(stderr);
      expect(result.exit_code).to.equal(exit_code);
      // expect(result.time).to.equal(time);
      // expect(result.memory).to.equal(memory);
      expect(result.result).to.equal(result_);
    });
    setTimeout(function () {
      scope.done();
      done();
    }, 4000);
  });

  it('should throw an error if it is overflow `option.max_get_status_loop`.', function (done) {
    var
    scope = create_scope();

    paiza_io(lang, code, input, {max_get_status_loop: 2, retry_get_status_time: 500}, function (error, result) {
      expect(error).to.be.an.instanceof(Error);
      expect(error.message).to.match(/overflow/);
    });
    setTimeout(function () {
      expect(scope.pendingMocks()).to.have.length(2);
      done();
    }, 2000);
  });

  describe('.with_api_key', function () {
    var
    param_,
    api_key = 'xxxyyyzzz';

    before(function () {
      param_ = param;
      param = qs.stringify({
        id: id,
        api_key: api_key,
      });
    });

    after(function () {
      param = param_;
    })

    it('should wrap `paiza_io\' function to use specified api_key.', function (done) {
      var
      scope = create_scope();

      paiza_io.with_api_key(api_key)(lang, code, input, {}, function (error, result) {
        expect(error).to.be.null;
        expect(result.id).to.equal(id);
        expect(result.language).to.equal(lang);
        expect(result.status).to.equal('completed');
        expect(result.stdout).to.equal(stdout);
        expect(result.stderr).to.equal(stderr);
        expect(result.exit_code).to.equal(exit_code);
        // expect(result.time).to.equal(time);
        // expect(result.memory).to.equal(memory);
        expect(result.result).to.equal(result_);
      });
      setTimeout(function () {
        scope.done();
        done();
      }, 4000);    });
  });
});
