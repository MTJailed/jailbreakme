//Function for freeing an object on the window, well sortof.
var JSFree = function(obj) {
	window[obj] = undefined;
};

var JSAlloc = function size(name, size) {
	if(typeof eval('window.'+name) !== 'undefined') return false;
	eval('window.'+name+'=new Array('+size+');');
};

free = JSFree;
malloc = JSAlloc;