[![Build Status](https://travis-ci.org/nick-jonas/boilerplatr.png?branch=master)](https://travis-ci.org/nick-jonas/boilerplatr)

#Boilerplatr

##### A dead simple nway to manage, publish, and share your boilerplate files.

## About

Everyone's coming out with their own frameworks, but there isn't a standard way of finding and using them.  Once a developer has created their framework, they shouldn't be hassled with creating a scaffold generator for it.  By the time they've finished that, they're already onto a new framework.  Boilerplatr is a simple package mananger built on nodejs to allow you to get up and running with *quickly*, with as little as possible overhead.

*Note: the term `boilers` below will refer to the template files a user creates to work with boilerplatr*

## Requirements

You must have [nodejs](http://nodejs.org/) installed, tested for v.0.6.0 or higher.  [Here is a guide](http://howtonode.org/how-to-install-nodejs) for how to install it on your system.

## Installation

*Note*: this tool is meant to be installed as a global package, so make sure to use the `-g` flag to make sure it's placed in your system's bin directory.

clone the repo

```bash
$ git clone https://github.com/nick-jonas/boilerplatr.git
$ npm install -g
```

or directly from npm


```bash
$ npm install -g boilerplatr
```

## Create a Boiler


##Creating a project with your Boilers.

Run this command at the root of your project

```bash

$ boiler init
```

This will walk you through the creation of `.boilerconfig`.

Boilerplatr looks for a directory called `boilers` in the root of your project, unless otherwise specified in your `boilerplatr.json` file.


package.json
----

A `package.json` file is required to be in the root of your file, which allows your template to work with [NPM](https://npmjs.org/).  The command `boiler init` will walk you through the file setup for this.

Bare minimum requirement:

```json
{
    "name":      "my-template",  // your boiler name
    "version":   "0.0.1",        // your boiler version number
    "boiler": {}
}
```


A more advanced setup:

```json
{
    "name":      "my-template",  // your boiler name
    "version":   "0.0.1",        // your boiler version number
    "boiler": {
        "output_file_dir": "./",  // outputs the template to the current directory
        "file_filter":      ["!.DS_Store", "!thumbs.db"],  // filter these files from output
        "dir_filter":       ["!.svn", "!.git", "!.sass-cache"], // filter these directories from output
        "file_mapping":     [
            {
                // this will prompt the user for a plugin name
                // with user input 'myPlugin', the output file
                // will be '/js/myPlugin.jquery.js'

                "input":    "/js/example.jquery.js",
                "output":   "/js/<%= boiler.pluginName %>.jquery.js"
            }
        ],
        "var_mapping":      {

            // for each variable in your template, you can define how
            // how the user prompt will display.  the user is prompted
            // with the 'description' field, and you can restrict their
            // input with the 'type' field, while also provide a default

            "pluginName":{
                "description": "Enter the name of your jQuery plugin",
                "type": "string",
                "default": "example"
            }
        }
    }
}
```
