var through = require('through2');
var filendir = require('filendir');
var path = require('path');

module.exports = function(options){
    options = options || {};

    return through.obj(function(row, enc, next) {

        var p = path.resolve('./node_modules');
        if (row.id.startsWith(p)) {
            // If it's an external dependency, copy to libs folder
            var f = path.resolve(options.baseDir, path.basename(row.id));
            filendir.writeFileSync(f, row.source);

        } else {
            // If it's not an external dependency, proceed normally
            this.push(row);
        }

        next();
    });
};