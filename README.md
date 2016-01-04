# gunzip-multi

Allow proper decompression of concatenated gzip files

[![build status](https://secure.travis-ci.org/eugeneware/gunzipMulti.png)](http://travis-ci.org/eugeneware/gunzipMulti)

## Background

The current node.gz `zlib` gunzip library has a bug where it doesn't correctly
compress gzip files which are the concatenation of multiple gzip files.

This is a valid gzip file according to the standard, and is used widely in
such formats as the Web Archive format (WARC).

This was [fixed](https://github.com/nodejs/node-v0.x-archive/pull/6442) but
it broke `npm` for some reason. See [these links](https://github.com/nodejs/node/issues/4306#issuecomment-165381933) for a discussion about why.

In any case, it isn't easy to get the inbuilt library to work or resume for
the reason that the [gzip file format](http://www.zlib.org/rfc-gzip.html)
doesn't include the length of the compressed data, only the uncompressed
final file and CRC.

This module wraps the `gzip` binary installed in your path, or a path you
pass it and uses it to do the unzipping.

The upside is that in my testing, the command line utility is *much* faster
at doing the decompression!

## Installation

This module is installed via npm:

``` bash
$ npm install gunzip-multi
```

## Example Usage

``` js
var gunzipMulti = require('gunzip-multi'),
    fs = require('fs');

fs.createReadStream(fixture('concat.txt.gz'))
  .pipe(gunzipMulti())
  .pipe(process.stdout);

// Prints out the contents of a gzip concatenated file. The first 3 lines are
// from the first file, the next 3 lines are from the second files, and the last 2
// linesare from the last file.
/**
1,Line 1
2,Line 2
3,Line 3
4,Line 4
5,Line 5
6,Line 6
7,Line 7
8,Line 8
**/
```
