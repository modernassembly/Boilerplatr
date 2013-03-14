var prompt = require('prompt'),
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    check = require('validator').check,
    current_directory = path.normalize(process.cwd()),
    configFileName = require('../constants').configFilename,
    defaults = require('../constants').defaultConfig,
    dir = process.cwd(),
    config = {};


var _execute = function(){

    // check if package.json exists
    if(fs.existsSync(dir + '/' + configFileName)){
        _getYesNo(function(isTrue){
            if(isTrue){
                // proceed with creating file
                _promptUser();
            }
            return;
        }, false, 'overwrite');
    }else{
        _promptUser();
    }

};

var _promptUser = function(){
    prompt.message = 'Boilerplatr'.magenta;
    prompt.start();

    config = _.extend({}, defaults);

    _getPackageName(function(){
        _getVersion(function(){
            // get var mappings
            _getVarMapping(function(){
                // get file mappings
                _getFileMappings(function(){
                    _getOutputDir(function(){
                        _outputFinalConfig();
                    });
                }, true);
            }, true);
        });
    });
};

var _getPackageName = function(onComplete){
    var packageName = {
        name: 'packageName',
        message: 'Enter the name of your boiler',
        warning: 'Boiler name must be alphanumeric (hyphens allowed), and without spaces.',
        required: true,
        type: 'string',
        conform: _validatePackageName
    };
    prompt.get(packageName, function(err, result){
        if(err) {
            console.error(err);
            return;
        }
        config['name'] = result.packageName;
        onComplete();
    });
};

var _getVersion = function(onComplete){
    var version = {
        name: 'versionNo',
        message: 'Enter the version number',
        default: defaults.version,
        warning: 'This must be a valid version number ([0-9].[0-9].[0-9])',
        type: 'string',
        conform: _validateVersion
    };
    prompt.get(version, function(err, result){
        if(err) {
            console.error(err);
            return;
        }
        config['version'] = result.versionNo;
        onComplete();
    });
};


var _getFileMappings = function(onComplete, isFirst){
    // check to see if there are more file mappings
    _getYesNo(function(hasMapping){
        if(!hasMapping){
            // all done, move on
            console.log('✓ Successfully completed file mappings');
            onComplete();
        }else{
            var inputFile = {name: 'inputFile', description: 'Enter the input file to map:', type: 'string'};
            var outputFile = {name: 'outputFile', description: 'Enter the output file name:', type: 'string'};
            // get input and output file mappings
            prompt.get(inputFile, function(err, result){
                var thisInput = result.inputFile;
                prompt.get(outputFile, function(err, result){
                    config.boiler.file_mapping.push({
                        "input": thisInput || "",
                        "output": result.outputFile || ""
                    });
                    // recursion
                    _getFileMappings(onComplete, false);
                });
            });
        }
    }, isFirst, 'file');
};

var _getVarMapping = function(onComplete, isFirst){
    // check to see if there are more file mappings
    _getYesNo(function(hasMapping){
        if(!hasMapping){
            // all done, move on
            console.log('✓ Successfully completed variables');
            onComplete();
        }else{
            var schema = {
                properties: {
                    varName: {
                        type:'string',
                        description:'Enter a variable name'
                    },
                    varType: {
                        type: 'string',
                        message: 'Enter the variable type',
                        warning: 'This is not a valid variable type',
                        conform: function(value){
                            var possibleTypes = ['string', 'number', 'integer', 'array', 'boolean', 'object', 'object', 'null', 'any'];
                            return possibleTypes.indexOf(value) >= 0 || null;
                        }
                    },
                    varDesc: {
                        type:'string',
                        description:'Enter a prompt to user for getting the value of this variable'
                    },
                    defaultVar: {
                        type: 'string',
                        description: 'Enter a default value'
                    }
                }
            };
            // get input and output file mappings
            prompt.get(schema, function(err, result){
                //console.log(result.varName, result.varDesc, result.varType, result.defaultVar);
                if(result.varName && (result.varDesc || result.varType || result.defaultVar)){
                    config.boiler.var_mapping[result.varName] = {};
                    var obj = config.boiler.var_mapping[result.varName];
                    if(result.varDesc) obj.description = result.varDesc;
                    if(result.varType) obj.type = result.varType;
                    if(result.defaultVar) obj['default'] = result.defaultVar;
                }
                _getVarMapping(onComplete, false);
            });
        }
    }, isFirst, 'var');
};

var _getYesNo = function(callback, isFirst, mapType){
    var message = '';
    switch(mapType){
        case 'overwrite':
            message = 'Would you like to overwrite the existing package.json file?';
            break;
        case 'file':
            message = (isFirst) ? 'Do you have any file mappings?' : 'Do you have any more file mappings?';
            break;
        case 'var':
            message = (isFirst) ? 'Do you have any template variables?' : 'Do you have any more template variables?';
            break;
        case 'validate':
            message = 'Here is your final output.  All good?';
    }
    var fileMapping = {
        name: 'yesno',
        message: message,
        validator: /y[es]*|n[o]?/,
        warning: 'Must respond yes or no',
        default: (mapType === 'validate') ? 'yes' : 'no'
    };
    prompt.get(fileMapping, function(err, result){
        callback(result.yesno.match(/y[es]*?/) !== null);
    });
};

var _getOutputDir = function(callback){
    var schema = {
        name: 'outputDir',
        message: 'Enter output directory for all the files',
        default: defaults.output_file_dir,
        type: 'string'
    };
    prompt.get(schema, function(err, result){
        config.boiler.output_file_dir = result.outputDir;
        callback();
    });
};

var _outputFinalConfig = function(){
    console.log(JSON.stringify(config, null, 4));
    _getYesNo(function(isAccepted){
        if(isAccepted){
            // print file
            fs.writeFile(configFileName, JSON.stringify(config, null, 4), function(err){
                if(err) {
                    console.log('There was an error writing to ' + configFileName);
                    return;
                }
                console.log('✓ Successfully created ' + configFileName.green);
            });
        }else{
            _execute();
        }
    }, true, 'validate');
};

var _validateVersion = function(val){
    // make sure there are no spaces
    if(val.indexOf(' ') >= 0) return false;
    // make sure it doesn't start or end with a period
    if(val.substring(0, 1) === '.' || val.substring(val.length - 1) === '.') return false;
    // make sure there are 1-3 dot separated components
    var comp = val.split('.');
    if(comp.length === 0 || comp.length > 3) return false;
    // make sure each component is alphanumeric
    var regex = new RegExp(/^\d+$/);
    if(!regex.test(val.replace(/\./g, ''))) return false;
    return true;
};

var _validatePackageName = function(val){
    // make sure there are no spaces
    if(val.indexOf(' ') >= 0) return false;
    // make sure it's alpha numeric (allow hyphens)
    var withoutHyphens = val.replace('-', '');
    try{
        check(withoutHyphens).isAlphanumeric();
    }catch(e){
        return false;
    }
    return true;
};

var _strpbrk = function(haystack, char_list){
  // http://kevin.vanzonneveld.net
  // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
  // +   bugfixed by: Onno Marsman
  // +    revised by: Christoph
  // +    improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strpbrk('This is a Simple text.', 'is');
  // *     returns 1: 'is is a Simple text.'
  for (var i = 0, len = haystack.length; i < len; ++i) {
    if (char_list.indexOf(haystack.charAt(i)) >= 0) {
      return haystack.slice(i);
    }
  }
  return false;
};


module.exports = {execute: _execute,
    validateVersion: _validateVersion,
    validatePackageName: _validatePackageName};