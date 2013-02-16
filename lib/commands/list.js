var fs = require('fs'),
    _ = require('lodash'),
    readdirp = require('readdirp'),
    path = require('path');

var _execute = function(){
    var packagesDir = path.resolve(__dirname + '/../../packages');
     readdirp({ 'root': packagesDir }, function (errors, res) {
        var directories = _.where(res.directories, {'parentDir': ''}),
            len = directories.length;
        console.log();
        var label = (len > 1) ? ' boilers ' : ' boiler ';
        console.log('You have ' + len + label+ 'installed');
        if(len > 0){
            console.log('-------------------------');
            for(var i = 0; i < len; i++){
                console.log(directories[i].name);
            }
        }
        console.log();
     });
};

module.exports = {execute: _execute};