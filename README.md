#Boilerplatr

##### A dead simple way to manage, publish, and share your boilerplate files.

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

Run this command at the root of your project

```bash
$ boiler init
```

This will walk you through the creation of `package.json`.

Now you can get started with creating your boilerplate files. Place all your template files relative to the root, where `package.json` is.  The [dOT templating system](http://olado.github.com/doT/index.html) is used throughout all your files, including your config in `package.json`.

When you're done, you can use this command to use your boiler.  *(Note: this is referencing the name used in `package.json`)*

```bash
$ boiler name-of-your-boiler
```

Run this command to publish your project for other people to use.

```bash
$ boiler publish
```


package.json
----

A `package.json` file is required to be in the root of your file, which allows your template to work with [NPM](https://npmjs.org/).  The command `boiler init` will walk you through the file setup for this.

Bare minimum requirement:

```json
{
    "name":      "my-template",
    "version":   "0.0.1",
    "boiler": {}
}
```


Here is a more advanced setup:

```json
{
    "name":      "my-template",
    "version":   "0.0.1",
    "boiler": {
        "output_file_dir": "./",
        "file_filter":      ["!.DS_Store", "!thumbs.db"],
        "dir_filter":       ["!.svn", "!.git", "!.sass-cache"],
        "file_mapping":     [
            {
                "input":    "/js/example.jquery.js",
                "output":   "/js/<%= boiler.pluginName %>.jquery.js"
            }
        ],
        "var_mapping":      {
            "pluginName":{
                "description": "Enter the name of your jQuery plugin",
                "type": "string",
                "default": "example"
            }
        }
    }
}
```

###Use Case

With the above `package.json` setup, here is an example command-line scenario:

```bash
$ boiler my-template
Boilerplatr: Enter the name of your jQuery plugin (example):
$ myWonderfulPlugin
```

The user is required to type in a String value, in this case, "myWonderfulPlugin", and this value is used everywhere that `<%= boiler.pluginName %>` is found in the template files. (i.e. `/js/example.jquery.js` will also be outputted to `/js/myWonderfulPlugin.jquery.js`)


###Config


* **name** : your boiler name
* **version** : your boiler version number
* **boiler**
    * **output_file_dir** : outputs the template to the current directory
    * **file_filter** : outputs the template to the current directory
    * **dir_filter** : outputs the template to the current directory
    * **file_mapping** : an array of file mapping objects
        * Each file_mapping object has an `input` and `output` property.  The `input` is the path to the original file, and the `output` is the filename after the templating is done.  You can also use <%= boiler.myFileName %> templating here to make this more dynamic.
    * **var_mapping** : a collection of var_mapping objects
        * name of the variable
            * **description** :  the prompt that the user will see
            * **type** : type restrictions on user input
            * **default** : offer a default value to the user
