#!/usr/bin/env node

var commands = require('../lib/commands'),
    _ = require('lodash'),
    path = require('path'),
    program = require('commander'),
    prompt = require('prompt'),
    fs = require('fs'),
    current_directory = path.normalize(process.cwd());

// follow npm's command list
// http://howtonode.org/introduction-to-npm
// initialize program
program
    .version('0.0.1')
    .option('-i, --init', 'Initialize package.json')
    .option('-l, --list', 'List installed boilers (both globally and locally)')
    .option('-p, --publish', 'Publish boiler to NPM')
    .parse(process.argv);

// customize prompt message
// prompt.message + prompt.delimiter + property.message + prompt.delimiter;
prompt.message = 'Boilerplatr'.magenta;

var execute = function(){
    var template = program.args[0],
        templateDir = path.join(path.resolve(__dirname + '/../node_modules/'), template);
    if(fs.existsSync(templateDir)){
        commands.write.execute(templateDir, function(err, vars, result){
            if(err) throw err;
            console.log('✓ Successfully completed ' + template.green);
        });
    }else{
        console.error('Template directory \'' + template.red + '\' does not exist in ' + templateDir);
    }
};

if(program.init){
    commands.init.execute();
}
else if(program.list){
    commands.list.execute();
}
else if(program.publish){
    // TO DO
    // use npm api to publish this boiler
}
else{
    execute();
}