#!/usr/bin/env node

var commands = require('../lib/commands'),
    _ = require('lodash'),
    path = require('path'),
    program = require('commander'),
    prompt = require('prompt'),
    fs = require('fs'),
    current_directory = path.normalize(process.cwd());

// initialize program
program
    .version('0.0.1')
    .option('-i, --init', 'Initialize a project using Boilerplatr')
    // .option('-w, --watch', 'Watch an AssembleJS project')
    // .option('-b, --build', 'Build production-ready files')
    .parse(process.argv);

// customize prompt message
// prompt.message + prompt.delimiter + property.message + prompt.delimiter;
prompt.message = 'Boilerplatr'.magenta;

// set config defaults
var config = {
    boilersDir: path.resolve(current_directory, 'boilers/')
};

// read config if available & override
var configFilePath = path.join(current_directory, 'boilerplatr.json');
if(fs.existsSync(configFilePath)){
    fs.readFile(configFilePath, function(err, file){
        var userConfig = JSON.parse(file.toString());
        // resolve paths
        if(userConfig.boilersDir){
            userConfig.boilersDir = path.resolve(current_directory, userConfig.boilersDir);
        }
        config = _.extend(config, userConfig);
        execute();
    });
}else{
    execute();
}

var execute = function(){
    // command: watch
    if(program.watch){
        commands.watch.execute();
    }
    else if(program.build){
        commands.build.execute();
    }
    else{
        var template = program.args[0],
            templateDir = path.join(config.boilersDir, template);
        if(fs.existsSync(templateDir)){
            commands.write.execute(templateDir, function(err, vars, result){
                if(err) throw err;
                console.log('✓ Successfully completed ' + template.green);
            });
        }else{
            console.error('Template directory \'' + template.red + '\' does not exist in ' + templateDir);
        }
    }
};
