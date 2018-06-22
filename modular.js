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

//Overwrite the logging with coloured logging
console.old_log = console.log;
console.log = function(str, foreColor, backColor) {
    console.old_log('%c'+str, 'background: '+backColor+'; color: '+foreColor);
};


var Using = function(resourceurl, type) {
    
    //Check if we have a resource URL
    if(!resourceurl) { throw new Error('[Modular]: Please specify a resource url.'); return false; }
    
    //Cast the url to a string
    if(typeof resourceurl !== 'string') { resourceurl = resourceurl.toString();}
    
    //Detect whether it is an external or internal resource
    if(window.module_base && resourceurl.indexOf('://') == -1) {
        resourceurl = window.module_base + '/' + resourceurl;
    }
    
    if(!type) { if(window.VERBOSE){console.warn('[Modular]: Type not specified, defaults to javascript.');} type = 'script';}
    
    if(typeof type !== 'string') { type = type.toString();}
    
    //In case we are processing a script
    if(type == 'script') {
        var tag = document.createElement('script');
        tag.src = resourceurl+'.module.js';
        tag.type = 'text/javascript';
        tag.id = 'script'+new Date().toString();
        tag.addEventListener('load', function(){
            console.log('[Modular]: Loading ' + tag.src, 'yellow');
         }, false);
        document.head.appendChild(tag);
        document.getElementById(tag.id).remove();
    }
    //In case we are processing a stylesheet
    else if(type == 'style') {
        var tag = document.createElement('style');
        tag.href = resourceurl;
        tag.type = 'text/css';
        tag.id = 'style'+new Date().toString();
        tag.addEventListener('load', function(){
            console.log('[Modular]: Loading ' + resourceurl, 'yellow');
         }, false);
        document.head.appendChild(tag);
        document.getElementById(tag.id).remove();
    }
    
    else {
        console.error('[Modular] Unknown type');
    }

};

//Derratives
var using = Using;
var include = using;
var Include = include;
var Module = Include;
var module = Module;
