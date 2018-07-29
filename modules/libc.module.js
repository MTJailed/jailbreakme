let EXIT_FAILURE = 1;
let EXIT_SUCCESS = 0;
let RAND_MAX = 0x7fffffff;

var NO = false;
var YES = true;

var DEFINE = function(o) {
    eval("window."+o+"=true;");
};

var DEFINED = true || 1 || {};

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

function Int64(v) {
    // The underlying byte array.
    var bytes = new Uint8Array(8);

    switch (typeof v) {
        case 'number':
            v = '0x' + Math.floor(v).toString(16);
        case 'string':
            if (v.startsWith('0x'))
                v = v.substr(2);
            if (v.length % 2 == 1)
                v = '0' + v;

            var bigEndian = unhexlify(v, 8);
            bytes.set(Array.from(bigEndian).reverse());
            break;
        case 'object':
            if (v instanceof Int64) {
                bytes.set(v.bytes());
            } else {
                if (v.length != 8)
                    throw TypeError("Array must have excactly 8 elements.");
                bytes.set(v);
            }
            break;
        case 'undefined':
            break;
        default:
            throw TypeError("Int64 constructor requires an argument.");
    }

    // Return a double whith the same underlying bit representation.
    this.asDouble = function() {
        // Check for NaN
        if (bytes[7] == 0xff && (bytes[6] == 0xff || bytes[6] == 0xfe))
            throw new RangeError("Integer can not be represented by a double");

        return Struct.unpack(Struct.float64, bytes);
    };

    // Return a javascript value with the same underlying bit representation.
    // This is only possible for integers in the range [0x0001000000000000, 0xffff000000000000)
    // due to double conversion constraints.
    this.asJSValue = function() {
        if ((bytes[7] == 0 && bytes[6] == 0) || (bytes[7] == 0xff && bytes[6] == 0xff))
            throw new RangeError("Integer can not be represented by a JSValue");

        // For NaN-boxing, JSC adds 2^48 to a double value's bit pattern.
        this.assignSub(this, 0x1000000000000);
        var res = Struct.unpack(Struct.float64, bytes);
        this.assignAdd(this, 0x1000000000000);

        return res;
    };

    // Return the underlying bytes of this number as array.
    this.bytes = function() {
        return Array.from(bytes);
    };

    // Return the byte at the given index.
    this.byteAt = function(i) {
        return bytes[i];
    };

    // Return the value of this number as unsigned hex string.
    this.toString = function() {
        return '0x' + hexlify(Array.from(bytes).reverse());
    };

    // Basic arithmetic.
    // These functions assign the result of the computation to their 'this' object.

    // Decorator for Int64 instance operations. Takes care
    // of converting arguments to Int64 instances if required.
    function operation(f, nargs) {
        return function() {
            if (arguments.length != nargs)
                throw Error("Not enough arguments for function " + f.name);
            for (var i = 0; i < arguments.length; i++)
                if (!(arguments[i] instanceof Int64))
                    arguments[i] = new Int64(arguments[i]);
            return f.apply(this, arguments);
        };
    }

    // this = -n (two's complement)
    this.assignNeg = operation(function neg(n) {
        for (var i = 0; i < 8; i++)
            bytes[i] = ~n.byteAt(i);

        return this.assignAdd(this, Int64.One);
    }, 1);

    // this = a + b
    this.assignAdd = operation(function add(a, b) {
        var carry = 0;
        for (var i = 0; i < 8; i++) {
            var cur = a.byteAt(i) + b.byteAt(i) + carry;
            carry = cur > 0xff | 0;
            bytes[i] = cur;
        }
        return this;
    }, 2);

    // this = a - b
    this.assignSub = operation(function sub(a, b) {
        var carry = 0;
        for (var i = 0; i < 8; i++) {
            var cur = a.byteAt(i) - b.byteAt(i) - carry;
            carry = cur < 0 | 0;
            bytes[i] = cur;
        }
        return this;
    }, 2);
}

// Constructs a new Int64 instance with the same bit representation as the provided double.
Int64.fromDouble = function(d) {
    var bytes = Struct.pack(Struct.float64, d);
    return new Int64(bytes);
};

// Convenience functions. These allocate a new Int64 to hold the result.

// Return -n (two's complement)
function Neg(n) {
    return (new Int64()).assignNeg(n);
}

// Return a + b
function Add(a, b) {
    return (new Int64()).assignAdd(a, b);
}

// Return a - b
function Sub(a, b) {
    return (new Int64()).assignSub(a, b);
}

// Some commonly used numbers.
Int64.Zero = new Int64(0);
Int64.One = new Int64(1);

// That's all the arithmetic we need for exploiting WebKit.. :)