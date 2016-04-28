
var
	through = require('through2'),
	extend = require('extend'), // https://github.com/justmoon/node-extend
	vfs = require('vinyl-fs'),
	path = require('path');

var
	persianSubEncoding = require('persian-sub-encoding'),
	persianSubVirastar = require('persian-sub-virastar'),
	persianSubRename = require('persian-sub-rename');

module.exports = function (args) {

	var options = extend({
		from: './../in',
		to: './../out',
		ext: 'srt',
		// base: process.cwd(),
		buffer: true,
		stripBOM: true,
		encodingOptions: {},
		virastarOptions: {},
		renameOptions: {},
	},args);

	// console.log(options);

	return vfs.src(options.from+'/**/*.'+options.ext, {
		// base: options.base,
		buffer: options.buffer,
		stripBOM: options.stripBOM,
	})

	.pipe(through.obj(function(file, enc, cb) {
		file.contents = persianSubEncoding(file.contents, options.encodingOptions);
		this.push(file);
		cb();
	}))

	.pipe(through.obj(function(file, enc, cb) {
		file.contents = persianSubVirastar(file, options.virastarOptions);
		this.push(file);
		cb();
	}))

	.pipe(through.obj(function(file, enc, cb) {
		file.path = persianSubRename(file.path, options.renameOptions);
		this.push(file);
		cb();
	}))

	.pipe(vfs.dest(options.to, {
		// cwd: options.base,
	}));
};
