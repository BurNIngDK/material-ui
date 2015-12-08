'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _recursiveReaddirSync = require('recursive-readdir-sync');

var _recursiveReaddirSync2 = _interopRequireDefault(_recursiveReaddirSync);

var outArray = [];
outArray.push('export default {\n');

(0, _recursiveReaddirSync2['default'])('./').forEach(function (file) {
	if (file !== 'index-generator.js' && file !== 'index.js') {
		var fileLines = _fs2['default'].readFileSync(file, 'utf8').split('\n');
		var index = 0,
		    found = false;

		while (found === false && index < fileLines.length) {
			if (fileLines[index].indexOf('module.exports') > -1) {
				var moduleName = fileLines[index].split('=')[1].replace(';', '').trim();

				outArray.push('\t');
				outArray.push(moduleName);
				outArray.push(': require(\'./');
				outArray.push(file.substring(0, file.length - 4));
				outArray.push('\'),\n');

				found = true;
			} else {
				index++;
			}
		}
	}
});

outArray.push('\n};\n');

_fs2['default'].writeFileSync('index.js', outArray.join(''));