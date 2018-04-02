# [Persian Sub](https://github.com/brothersincode/persian-sub): [gulp-persian-sub](https://www.npmjs.com/package/gulp-persian-sub)

[gulp.js](https://gulpjs.com/) interface for [Persian Sub](https://github.com/brothersincode/persian-sub) modules

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

### changelog
see [CHANGES.md](https://github.com/brothersincode/persian-sub/CHANGES.md).

### contributing
see [CONTRIBUTING.md](https://github.com/brothersincode/persian-sub/CONTRIBUTING.md).

please log issues [here](https://github.com/brothersincode/persian-sub/issues).

[![GitHub issues](https://img.shields.io/github/issues/brothersincode/persian-sub.svg?style=flat-square)](https://github.com/brothersincode/persian-sub/issues)
[![Brothers in Code](https://img.shields.io/badge/Brothers-in_Code-lightgrey.svg?style=flat-square)](https://brothersincode.ir/)
[![it's a geminorum project](https://img.shields.io/badge/it's_a-geminorum_project-lightgrey.svg?style=flat-square)](https://geminorum.ir/)
[![Analytics](https://ga-beacon.appspot.com/UA-865830-4/persian-sub/gulp-persian-sub?pixel)](https://github.com/brothersincode/persian-sub)
