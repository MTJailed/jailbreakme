let EXIT_FAILURE = 1;
let EXIT_SUCCESS = 0;
let RAND_MAX = 0x7fffffff;

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

function sizeof(obj) {
    var bytes = 0;

    function _mem_size(obj) {
        if(obj !== null && obj !== undefined) {
            switch(typeof obj) {
            case 'number':
                bytes += 8;
                break;
            case 'string':
                bytes += obj.length * 2;
                break;
            case 'boolean':
                bytes += 4;
                break;
            case 'object':
                var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                if(objClass === 'Object' || objClass === 'Array') {
                    for(var key in obj) {
                        if(!obj.hasOwnProperty(key)) continue;
                        sizeOf(obj[key]);
                    }
                } else bytes += obj.toString().length * 2;
                break;
            }
        }
        return bytes;
    };
    return _mem_size(obj);
};


let int8_t = function(x = 0) {
	let cast = new Int8Array(1);
	cast[0] = x;
	return cast[0];
};

let int16_t = function(x = 0) {
	let cast = new Int16Array(1);
	cast[0] = x;
	return cast[0];
};

let int32_t = function(x = 0) {
	let cast = new Int32Array(1);
	cast[0] = x;
	return cast[0];
};

let uint8_t = function(x = 0) {
	let cast = new Uint8Array(1);
	cast[0] = x;
	return cast[0];
};

let uint16_t = function(x = 0) {
	let cast = new Uint16Array(1);
	cast[0] = x;
	return cast[0];
};

let uint32_t = function(x = 0) {
	let cast = new Uint32Array(1);
	cast[0] = x;
	return cast[0];
};

let float = function(x = 0) {
	let cast = new Float32Array(x);
	cast[0] = x;
	return cast[0];
};

let double = function(x = 0) {
	let cast = new Float64Array(x);
	cast[0] = x;
	return cast[0];
};

let int = function(x = 0) {
	return double(x)<<0;
};
