[![Build Status](https://travis-ci.org/nick-jonas/boilerplatr.png?branch=master)](https://travis-ci.org/nick-jonas/boilerplatr)

#Boilerplatr

##### A nodejs build tool for your own frameworks.  Manage your boilerplate code a little easier.

## About

Everyone's coming out with their own frameworks, but there isn't a standard way of finding/using them or most importantly - *creating your own*.  Once a developer has created their framework, they shouldn't be hassled with creating a scaffold generator for it.  By the time they've finished that, they're already onto a new framework.  Boilerplatr is a simple, framework's framework to allow you to get up and running with a build tool for your boilerplate code *quickly*.

*Note: the term `boilers` below will refer to the template files a user creates to work with boilerplatr*

## Requirements

You must have [nodejs](http://nodejs.org/) installed, tested for v.0.6.0 or higher.


Using Homebrew:

```bash
$ brew install node
```


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

This will walk you through the creation of `boilerplatr.json`.

Boilerplatr looks for a directory called `boilers` in the root of your project, unless otherwise specified in your `boilerplatr.json` file.


boilerplatr.json
----

This file should always be in the root of your project, and allows you to override the default settings.

```json
{
    "boilersDir": "./boilers"
}
```

boilersDir: By default, the commands will look for a `boilers` directory in the root of your project.  If your boilers are located elsewhere, put the location here relative to the path of the project root
