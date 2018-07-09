//Function for freeing an object on the window, well sortof.
var JSFree = function(ptr) {
	window[ptr] = undefined;
};

var JSAlloc = function size(name, size_t) {
	if(typeof eval('window.'+name) !== 'undefined') return false;
	eval('window.'+name+'=new Array('+size+');');
};

free = JSFree;
malloc = JSAlloc;

uint32_t = function(n){return (new Uint32Array(n))[0];};
size_t = uint32_t;

function swap16(val) {
	return ((val & 0xFF) << 8) | ((val >> 8) & 0xFF);
}

function swap32(val) {
    return ((val & 0xFF) << 24) | ((val & 0xFF00) << 8) | ((val >> 8) & 0xFF00) | ((val >> 24) & 0xFF);
}


function StringtoCharArray(string) {
	var str = string.split('');
	var out = new Array();
	str.forEach(function(c){
		out.push(c.charCodeAt(0));
	});
	str = undefined;
	return out;
}

function charArrayToString(array) {
	var str = '';
	array.forEach(function(uint8_t){
		str+=String.fromCharCode(uint8_t);
	});
	array = undefined;
	return str;
}

