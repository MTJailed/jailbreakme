# Modular Javascript Loader
The modular javascript loader is a convenient script for loading scripts and resources in a modular way.

Many times as a developer you want to manage scripts in a more dynamic way to improve performance and memory resources.

In a Browser Exploitation Framework such as this, everything that effects the memory can influence the stability of the exploits negatively.

Therefore a modular javascript loader is a convenient and effective solution.

## The configuration
As ModularJS is part of the Window DOM you can globally access it's configuration options to for example set the rootfolder containing the modules that ModularJS can load.

```javascript
  ModularJS.config.modulebase = '/modules/';
```

## Modules
In the modules folder you can create modules.

Modules are basically javascript files, preferably written following the rules of Object Oriented Javascript programming.

A requirement for ModularJS is that these files end with the extension ```.module.js``` or ```.module.css```

Loading modules can be done with your favorite syntax:

```javascript
  
  /* These are the many ways you can import modules with ModularJS */
  include('example');
  Include('example');
  Import('example'); //Note that import is a reserved keyword that cannot be used!
  using('example');
  Using('example');
  Module('example');
  module('example');
```

## Libraries
Libraries are basically 'linker files', files that chain modules together into one module.

A library looks like this (examplelib.module.js):

```javascript
  var EXAMPLELIB = true; //define the library
  include('example.one'); //(.module.js) contains function one(){}
  include('example.two'); //(.module.js) contains function two(){}
 ```
 
 Pretty awesome right, now you only have to include this library to dynamically load all required submodules!
 
 ## License
 
 ModularJS is licensed under the MIT License and was written by Sem Voigtländer.
 
 Most modules / libraries in this repository are also under that license and written by Sem Voigtländer but some may differ and are from other authors.
