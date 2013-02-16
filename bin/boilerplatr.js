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
    .option('-i, --init', 'Initialize a boiler')
    .option('-p, --publish', 'Publish a boiler')
    .option('-l, --list', 'List boilers')
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

if(program.init){
    commands.init.execute();
}
else if(program.publish){
    commands.publish.execute();
}
else if(program.list){
    commands.list.execute();
}
else{
    // execute boiler
}

var execute = function(){
    if(program.watch){ /// watch: TODO
        commands.watch.execute();
    }
    else if(program.build){ /// build: TODO
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
