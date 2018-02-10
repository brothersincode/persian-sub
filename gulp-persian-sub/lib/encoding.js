var gutil = require('gulp-util');
var through = require('through2');

var persianSubEncoding = require('persian-sub-encoding');

var PLUGIN_NAME = 'gulp-persian-sub';

module.exports = function (options) {
  return through.obj(function (file, enc, cb) {
    // var self = this;

    options = options || {};

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }

    file.contents = persianSubEncoding(file.contents, options);

    this.push(file);
    cb();
  });
};
