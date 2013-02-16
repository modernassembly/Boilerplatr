var fs = require('fs-extra'),
    path = require('path'),
    current_directory = path.normalize(process.cwd()),
    constants = require('../constants'),
    init = require('./init'),
    configFilename = constants.configFilename;

var _execute = function(){
    // check for config file
    if(fs.existsSync(configFilename)){
        // make sure package name exists
        fs.readFile(configFilename, function(err, data){
            var config = JSON.parse(data),
                packageName = config.packageName,
                outputPath = path.resolve(__dirname + '/../../packages/' + packageName);

            // validate config file
            if(!_validateConfig(config)) return;

            // see if this boiler already exists
            if(fs.existsSync(outputPath)){
                try{
                    var existingConfig = fs.readFileSync(path.resolve(outputPath + '/' + configFilename));
                    existingConfig = JSON.parse(existingConfig);
                    var comparison = _compareVersions(existingConfig.version, config.version);
                    if(comparison === 0){
                        // versions are equal, user needs to bump version number before publishing
                        console.log('Please bump version number from ' + config.version + ' before publishing');
                        return;
                    }
                    else if(comparison === 1){
                        // existing config is larger
                        console.log('The current boiler has a higher version number. Please bump your version number higher than ' + existingConfig.version);
                        return;
                    }
                }catch(err){
                    console.log('Found existing package with no config file.  Overriding...');
                }
                _publishPackage(packageName);
            }
            else{
                _publishPackage(packageName);
            }

        });
    }else{
        console.log('Not seeing the config file needed to install this boiler: ' + configFilename.red);
        console.log('Type `boiler init` to go through the setup.');
    }
};

var _validateConfig = function(config){
    // validate version number
    if(!init.validateVersion(config.version)){
        console.log('Version number is not formatted correctly ([0-9].[0-9].[0-9])');
        return false;
    }
    if(!init.validatePackageName(config.packageName)){
        console.log('Boiler name must be alphanumeric (hyphens allowed), and without spaces.');
        return false;
    }
    return true;
};

var _publishPackage = function(packageName){
    var outputPath = path.resolve(__dirname + '/../../packages/' + packageName);
    fs.copy('./', outputPath, function(err){
        if(err){
            console.error(err);
        }
        else{
            console.log('✓ Successfully published ' + packageName.green);
        }
    });
};

/**
 * Compares two version numbers
 * @param  {String} v1 version number
 * @param  {String} v2 version number
 * @return {Number} -1 if v2 is larger, 0 if equal, and 1 if v1 is larger
 */
var _compareVersions = function(v1, v2){
    var v1parts = v1.split('.'),
        v2parts = v2.split('.'),
        i = 0;
    for(i; i < v1parts.length; i++){
        if(v2parts.length === i){
            // v1 is larger
            return 1;
        }
        if(v1parts[i] == v2parts[i]){
            continue;
        }
        else if(v1parts[i] > v2parts[i]){
            // v1 is larger
            return 1;
        }else{
            // v2 is larger
            return -1;
        }
    }
    if(v1parts.length != v2parts.length){
        // v2 is larger
        return -1;
    }
    return 0;
};

module.exports = {execute: _execute};