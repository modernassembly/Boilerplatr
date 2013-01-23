[![Build Status](https://travis-ci.org/nick-jonas/boilerplatr.png?branch=master)](https://travis-ci.org/nick-jonas/boilerplatr)

#Boilerplatr

##### A nodejs build tool for your own frameworks.  Manage your boilerplate code a little easier.

## About

Everyone's coming out with their own frameworks, but there isn't a standard way of finding/using them or most importantly - *creating your own*.  Once a developer has created their framework, they shouldn't be hassled with creating a scaffold generator for it.  By the time they've finished that, they're already onto a new framework.  Boilerplatr is a simple, framework's framework to allow you to get up and running with a build tool for your boilerplate code *quickly*.

## Requirements

You must install node:

[nodejs](http://nodejs.org/) >=v0.6.0

```bash
$ brew install node
```


## Installation

*Note*: this tool is meant to be installed as a global package, so make sure to use the `-g` flag when installing

clone the repo

```bash
$ git clone https://github.com/nick-jonas/boilerplatr.git
$ npm install -g
```

or directly from npm


```bash
$ npm install -g boilerplatr
```

## How to use

### Create your boilers

#### structure

#### templating

#### filters



### Creating a project with your boilers.

Initialize your project with

```bash

$ boiler init
```

This will walk you through the creation of `boilerplatr.json`.

Boilerplatr looks for a directory called `boilers` in the root of your project, unless otherwise specified in your `boilerplatr.json` file.


### Config `boilerplatr.json`

```json
{
    "boilersDir": "boilers/" // path relative to file with boilerplatr template files
}
```
