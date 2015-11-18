var through = require('through2');
var filendir = require('filendir');

module.exports = function(options){
	options = options || {};

	return through.obj(function(row, enc, next) {
		if (/\/node_modules\//.test(row.id)) {
			// If it's an external dependency, copy to libs folder
			var filename = path.join(row.id.replace(/(.+\/node_modules\/)/, ''));
			filendir.writeFileSync(options.baseDir + filename, row.source);

		} else {
			// If it's not an external dependency, proceed normally
			this.push(row);
		}

		next();
	});
};