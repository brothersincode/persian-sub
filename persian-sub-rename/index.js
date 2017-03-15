var path = require('path');

// @SOURCE: http://stackoverflow.com/a/9744576/4864081
function paddy(n, p, c) {
  var pad_char = typeof c !== 'undefined'
    ? c
    : '0';
  var pad = new Array(1 + p).join(pad_char);
  return (pad + n).slice(-pad.length);
}

// @SOURCE: gulp-rename
function parsePath(filePath) {
  var extname = path.extname(filePath);
  return {
    dirname: path.dirname(filePath),
    basename: path.basename(filePath, extname),
    extname: extname
  };
}

function processSeasonXEpisode(name) {

  function replacer(match, p1, p2, offset, string) {
    return 'S' + paddy(p1, 2) + 'xE' + paddy(p2, 2);
  }

  return name.replace(/S(\d\d?)E(\d\d?)/ig, replacer);
}

module.exports = function(filePath, options) {
  options = options || {};
  var parsedPath = parsePath(filePath);
  return path.join(parsedPath.dirname, (processSeasonXEpisode(parsedPath.basename) + '.fa' + parsedPath.extname));
};
