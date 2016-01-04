var it = require('tape'),
    fs = require('fs'),
    path = require('path'),
    split = require('split2'),
    through2 = require('through2'),
    gunzipMulti = require('..');

function fixture(fileName) {
  return path.join(__dirname, 'fixtures', fileName);
}

it('should be able to decompress a concatenated gzip file', function(t) {
  t.plan(9);

  var lines = 0;
  fs.createReadStream(fixture('concat.txt.gz'))
    .pipe(gunzipMulti())
    .pipe(split())
    .pipe(through2(function (chunk, enc, cb) {
      lines++;
      var line = chunk.toString();
      t.equal(line, lines + ',Line ' + lines);
      cb();
    }))
    .on('finish', function () {
      t.equal(lines, 8);
      t.end();
    });
});
