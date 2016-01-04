var stream = require('stream');
    spawn = require('child_process').spawn,
    combiner = require('stream-combiner');

module.exports = gunzipMulti;
function gunzipMulti(opts) {
  if (typeof opts === 'undefined') {
    opts = { path: 'gzip' };
  }
  var gu = spawn(opts.path, ['-cd']);
  return combiner(gu.stdin, gu.stdout);
}
