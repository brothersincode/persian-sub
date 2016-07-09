#!/usr/bin/env node

"use strict";

var program = require('commander'),
	persianSub = require('./index.js'),
	path = require('path'),
	fs = require('fs');

var
	pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));

function increaseVerbosity(v, total) {
	return total + 1;
}

program
	.version(pkg.version)
	.description(pkg.description)
	.usage('--in /input-dir --out /output-dir --ext srt')
	.option('-i, --in [folder]', 'Source folder', './in')
	.option('-o, --out [folder]', 'Destination folder', './out')
	.option('-e, --ext [extension]', 'File extension mask', 'srt')
	.option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
	.parse(process.argv);

// console.log(' in: %s', program.in);
// console.log(' out: %s', program.out);
// console.log(' ext: %s', program.ext);
// console.log(' verbosity: %j', program.verbose);

persianSub({
	from: program.in,
	to: program.out,
	ext: program.ext
});
