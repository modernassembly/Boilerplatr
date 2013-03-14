var fs = require('fs'),
    _ = require('lodash'),
    readdirp = require('readdirp'),
    path = require('path'),
    readdirp = require('readdirp'),
    npm = require('npm'),
    foundPackages = [];

var _execute = function(){
    _getLocalPackages(function(localPackages){
        foundPackages = localPackages;
        _getGlobalPackages(function(globalPackages){
            for(var i = 0; i < globalPackages.length; i++){
                if(_.indexOf(_.pluck(localPackages, 'name'), globalPackages[i].name) === -1){
                    foundPackages.push(globalPackages[i]);
                }
            }

            // finished, print out package names
            console.log();console.log();
            console.log('Installed Templates:'.magenta);
            console.log('-------------------'.magenta);
            var packageNames = _.pluck(foundPackages, 'name');
            for(i = 0; i < packageNames.length; i++){
                console.log(packageNames[i]);
            }
            console.log('-------------------'.magenta);
            console.log();console.log();
            console.log('You can use this template by typing the command: ' + 'boiler <boiler-name>'.magenta);
            console.log();console.log();
        });
    });
};

var _getGlobalPackages = function(callback){
    var globalPackages = [];
    npm.load({loglevel: "silent"}, function(err, npm){
        npm.config.set("global", true);
        npm.commands.list([], true, function(err, pkgInfo){
            globalPackages = _.filter(pkgInfo.dependencies, function(pkg){
                return pkg.boiler !== undefined;
            });
            callback(globalPackages);
        });
    });
};

var _getLocalPackages = function(callback){
    var localPackages = [];
    if(fs.existsSync('./node_modules')){
        readdirp({ root: './node_modules', fileFilter: 'package.json', depth:1 }, function (errors, res) {
            var fileCount = 0,
                fileMaxCount = res.files.length;
            readdirp({ root: './node_modules', fileFilter: 'package.json', depth:1 }).on('data', function(entry){
                fs.readFile(entry.fullPath, function(err, data){
                    if(err) throw err;
                    var thisPackage = JSON.parse(data);
                    if(thisPackage.boiler !== undefined){
                        localPackages.push(thisPackage);
                    }
                    fileCount++;
                    if(fileCount === fileMaxCount){
                        callback(localPackages);
                    }
                });
            });

        });

    }else{
        callback(localPackages);
    }
};

var _onReadData = function(err, data){
  console.log(err,data);
};

module.exports = {execute: _execute};