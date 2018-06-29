//Function for freeing an object on the window, well sortof.
var JSFree = function(obj) {
	window[obj] = undefined;
};