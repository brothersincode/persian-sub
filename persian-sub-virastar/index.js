var path = require('path');
var Virastar = require('virastar'); // https://github.com/juvee/virastar/

function flipLinePuncs(line) {
	var end = ['-'];
	var start = ['!', '.', '،', '…', '"'];
	var before = [];
	var after = [];

	// replace three dots with ellipsis
	line = line.replace(/\s*\.{3,}/g, '…');

	for (var iStart = 0; iStart < start.length; iStart++) {
		var sElement = start[iStart];
		var sReg = new RegExp('^\\'+sElement, 'i');
		if (sReg.test(line)) {
			line = line.replace(sReg, '').trim();
			after.push(sElement);
		}
	}

	for (var iEnd = 0; iEnd < end.length; iEnd++) {
		var eElement = end[iEnd];
		var eReg = new RegExp('\\'+eElement+'$', 'i');
		if (eReg.test(line)) {
			line = line.replace(eReg, '').trim();
			before.push(eElement);
		}
	}

	for (var iBefore = 0; iBefore < before.length; iBefore++) {
		line = before[iBefore] + ' ' + line;
	}

	for (var iAfter = 0; iAfter < after.length; iAfter++) {
		line += after[iAfter];
	}

	line = line.replace(/(…){2,}/g, '$1'); // TODO: must move to virastar core

	return line;
}

module.exports = function(file, options) {

	options = options || {};

	var virastar = new Virastar();
	var fileName = file.path.split(path.sep).pop();

	var lines = file.contents.toString('utf8').replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
	var processed = '';
	var counter = 1;
	var block = '';
	var time = '';

	for (var i = 0; i < lines.length; i++) {

		var line = lines[i];

		if (/^\s*$/.test(line)) {

			// do nothing!

		} else if (/^\d+$/.test(line) ) {

			if ( block ) {

				if ( counter > 1 )
					processed += "\r\n";

				processed += counter + "\r\n";
				processed += time + "\r\n";
				processed += block;

				counter++;

				block = '';
				time = '';
			}

		} else if (/(\d+):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d+):(\d{2}):(\d{2}),(\d{3})/.test(line)) {
			time = line.trim();

		} else {
			block += virastar.cleanup( flipLinePuncs(line) ) + "\r\n";
		}
	}

	console.log(fileName + ': processed: ' + counter);

	return new Buffer(processed);
};
