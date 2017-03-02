(function() {
	'use strict';

	var persianSub = require('./index.js'),
		gulp = require('gulp'),
		fs = require('fs');

	var pkg = JSON.parse(fs.readFileSync('./package.json'));

	gulp.task('default', function() {

		gulp.src('./in/**/*.*')

		.pipe(persianSub.encoding())

		.pipe(persianSub.virastar())

		.pipe(persianSub.rename())

		.pipe(gulp.dest('./out'));
	});

}());
