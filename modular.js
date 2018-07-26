/***
 *     __   __  _______  ______   __   __  ___      _______  ______              ___  _______
 *    |  |_|  ||       ||      | |  | |  ||   |    |   _   ||    _ |            |   ||       |
 *    |       ||   _   ||  _    ||  | |  ||   |    |  |_|  ||   | ||            |   ||  _____|
 *    |       ||  | |  || | |   ||  |_|  ||   |    |       ||   |_||_           |   || |_____
 *    |       ||  |_|  || |_|   ||       ||   |___ |       ||    __  | ___   ___|   ||_____  |
 *    | ||_|| ||       ||       ||       ||       ||   _   ||   |  | ||   | |       | _____| |
 *    |_|   |_||_______||______| |_______||_______||__| |__||___|  |_||___| |_______||_______|
 *
 *    A modular javascript and css loading library written in vanilla javascript
 *    Created by Sem Voigtländer. Licensed under the MIT-License
 */

var ModularJS = {}; //struct init;

//Initialisation
ModularJS = {
	Author: "Sem Voigtländer",
	Description: "ModularJS is a vanilla javascript loader for javascript and css includes",
	Version: 1.0,
};

//Configuration
ModularJS.config = {
	vebosity: 100,
	debug: true,
	modulebase: "/"
};

//Logging functionality
ModularJS.error = function(msg) {
	throw new error(msg);
};

ModularJS.warn = function(msg) {
	console.log('%c'+msg.toString(), 'background: orange; color: black;');
};

ModularJS.log = function(msg) {
	console.log('%c'+msg.toString(), 'background: white; color: grey;');
};

ModularJS.load_resource = function(url, type) {

	try {
		//load resource needs the URL parameter
		if(!url) {
			ModularJS.error("[ModularJS][LoadResource]: Invalid Arguments: No url provided");
			return false;
		}

		url = url.toString(); //makes sure the url will be a string

		//checks whether modulebase is set and checks for explicit protocol definiton
		if(ModularJS.config.modulebase && url.indexOf('://') === -1) url = ModularJS.config.modulebase + "/" + url;
	 
		if(!type) type = 'script'; //The default type of a module is javascript

		if(type == 'script') {

			var tag = document.createElement("script");
			tag.src = url + ".module.js";
			tag.type = "text/javascript";
			tag.id = "script-"+new Date().toString();
			tag.addEventListener('load', function(){
				ModularJS.log('[ModularJS][LoadResource]: ' + tag.src);
			}, false);

			document.head.appendChild(tag);
	        document.getElementById(tag.id).remove();
		
		}
		//In case of processing a stylesheet
	    else if(type == 'style') {
	        var tag = document.createElement('style');
	        tag.href = url + ".module.css";
	        tag.type = 'text/css';
	        tag.id = 'style'+new Date().toString();
	        tag.addEventListener('load', function(){
				ModularJS.log('[ModularJS][LoadResource]: ' + tag.src);
	         }, false);
	        document.head.appendChild(tag);
	        document.getElementById(tag.id).remove();
	    }
	    
	    else {
	        ModularJS.error('[Modular][LoadResource]: '+ 'Unknown type');
	    }
	} catch (ex) {
		ModularJS.error('[ModularJS][Unknown]: A fatal Runtime Error occured.');
	}
};

var Using, using = ModularJS.load_resource;
var Module, module = ModularJS.load_resource;
var Include, include = ModularJS.load_resource;
var Import = ModularJS.load_resource;