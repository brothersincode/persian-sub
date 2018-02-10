var isUtf8 = require('is-utf8'); // https://github.com/wayfind/is-utf8
var iconv = require('iconv-lite'); // https://github.com/ashtuchkin/iconv-lite
var jschardet = require('jschardet'); // https://github.com/aadsm/jschardet

module.exports = function (contents, options) {
  options = options || {};

  if (isUtf8(contents)) {
    return contents;
  }

  var encInfo = jschardet.detect(contents);
  var encFrom = encInfo.encoding;

  switch (encInfo.encoding) {
    case 'UTF-16LE':
      encFrom = 'utf16-le';
      break;
    default:
      encFrom = 'win1256';
  }

  try {
    var decoded = iconv.decode(contents, encFrom);
    contents = iconv.encode(decoded, 'utf8');
  } catch (e) {
    console.log('Conversion Failed: ' + e);
  }

  return contents;
};
