# [Brothers in Code](https://github.com/brothersincode): [gulp-persian-sub](https://www.npmjs.com/package/gulp-persian-sub)

[gulp.js](http://gulpjs.com/) interface for [Persian Sub](https://github.com/brothersincode/persian-sub) modules

a module from [Persian Sub](https://github.com/brothersincode/persian-sub) package

## Installation

``` sh
npm install gulp-persian-sub --save-dev
```

## Example `gulpfile.js`

```javascript
(function() {
    'use strict';

    var
        gulp = require('gulp'),
		persianSub = require('gulp-persian-sub');

    gulp.task('default', function() {

        gulp.src('./in/**/*.*')

        .pipe(persianSub.encoding())

        .pipe(persianSub.virastar())

        .pipe(persianSub.rename())

        .pipe(gulp.dest('./out'));
    });

}());
```
