(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.machoEntitlements = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],4:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],5:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":4,"_process":2,"inherits":3}],6:[function(require,module,exports){
'use strict';

const fatmacho = require('fatmacho');
const macho = require('macho');
const fs = require('fs');

const CSSLOT_CODEDIRECTORY = 0;
const CSSLOT_REQUIREMENTS = 2;
const CSSLOT_ENTITLEMENTS = 5;

function parseEntitlements (data) {
  const count = data.readUInt32BE(8);
  for (let i = 0; i < count; i++) {
    const base = 8 * i;
    const type = data.readUInt32BE(base + 12);
    const blob = data.readUInt32BE(base + 16);
    if (type === CSSLOT_ENTITLEMENTS) {
      const size = data.readUInt32BE(blob + 4);
      return data.slice(blob + 8, blob + size);
    }
  }
  return null;
}

function getEntitlements (data, machoObject) {
  for (let cmd of machoObject.cmds) {
    if (cmd.type === 'code_signature') {
      return parseEntitlements(data.slice(cmd.dataoff));
    }
  }
  return null;
}

function getEntitlementsFromBuffer (data) {
  try {
    const hdrs = macho.parse(data);
    return getEntitlements(data, hdrs);
  } catch (e) {
    try {
      const bins = fatmacho.parse(data);
      const hdrs = macho.parse(bins[0].data);
      return getEntitlements(bins[0].data, hdrs);
    } catch (e2) {
      return null;
    }
  }
}

function getEntitlementsFromFile (path) {
  const data = fs.readFileSync(path);
  return getEntitlementsFromBuffer(data);
}

module.exports = {
  'parse': getEntitlementsFromBuffer,
  'parseFile': getEntitlementsFromFile
};

},{"fatmacho":7,"fs":1,"macho":8}],7:[function(require,module,exports){
'use strict';

const fat = exports;

const CAFEBABE = 3405691582;

const cpuType = {
  0x00000003: 'i386',
  0x80000003: 'x86_64',
  0x00000009: 'arm',
  0x80000009: 'arm64',
  0x00000000: 'arm64',
  0x0000000a: 'ppc_32',
  0x8000000a: 'ppc_64',
}

fat.parse = function(data, cb) {
  const u32 = function (x) {
    return data.readUInt32BE(x);
  }
  const magic = u32(0);
  if (magic !== CAFEBABE) {
    throw 'invalid file format'
  }
  const eof = data.length;
  const ncmds = u32(4);
  var slices = [];
  for (var cmd = 0, off = 12; cmd < ncmds; off += 20, cmd++) {
    const cpu = u32(off);
    const from = u32(off+4);
    const size = u32(off+8);
    if (from === 0 || size === 0) {
      console.error('fat.parse: skip null entry', cmd);
      continue;
    }
    if (from + size > eof || off > eof) {
      console.error('fat.parse: skip out of range entry', cmd);
      continue;
    }
    slices.push({
      arch: cpuType[cpu] || cpu,
      offset: from,
      size: size,
      align: u32(off+12),
      data: data.slice(from, from + size)
    });
  }
  return slices;
}

},{}],8:[function(require,module,exports){
var macho = exports;

macho.constants = require('./macho/constants');
macho.Parser = require('./macho/parser');

macho.parse = function parse(buf) {
  return new macho.Parser().execute(buf);
};

},{"./macho/constants":9,"./macho/parser":10}],9:[function(require,module,exports){
var constants = exports;

constants.cpuArch = {
  mask: 0xff000000,
  abi64: 0x01000000
};

constants.cpuType = {
  0x01: 'vax',
  0x06: 'mc680x0',
  0x07: 'i386',
  0x01000007: 'x86_64',
  0x0a: 'mc98000',
  0x0b: 'hppa',
  0x0c: 'arm',
  0x0100000c: 'arm64',
  0x0d: 'mc88000',
  0x0e: 'sparc',
  0x0f: 'i860',
  0x10: 'alpha',
  0x12: 'powerpc',
  0x01000012: 'powerpc64'
};

constants.endian = {
  0xffffffff: 'multiple',
  0: 'le',
  1: 'be'
};

constants.cpuSubType = {
  mask: 0x00ffffff,
  vax: {
    0: 'all',
    1: '780',
    2: '785',
    3: '750',
    4: '730',
    5: 'I',
    6: 'II',
    7: '8200',
    8: '8500',
    9: '8600',
    10: '8650',
    11: '8800',
    12: 'III'
  },
  mc680x0: {
    1: 'all',
    2: '40',
    3: '30_only'
  },
  i386: {},
  x86_64: {
    3: 'all',
    4: 'arch1'
  },
  mips: {
    0: 'all',
    1: 'r2300',
    2: 'r2600',
    3: 'r2800',
    4: 'r2000a',
    5: 'r2000',
    6: 'r3000a',
    7: 'r3000'
  },
  mc98000: {
    0: 'all',
    1: 'mc98601'
  },
  hppa: {
    0: 'all',
    1: '7100lc'
  },
  mc88000: {
    0: 'all',
    1: 'mc88100',
    2: 'mc88110'
  },
  sparc: {
    0: 'all'
  },
  i860: {
    0: 'all',
    1: '860'
  },
  powerpc: {
    0: 'all',
    1: '601',
    2: '602',
    3: '603',
    4: '603e',
    5: '603ev',
    6: '604',
    7: '604e',
    8: '620',
    9: '750',
    10: '7400',
    11: '7450',
    100: '970'
  },
  arm: {
    0: 'all',
    5: 'v4t',
    6: 'v6',
    7: 'v5tej',
    8: 'xscale',
    9: 'v7',
    10: 'v7f',
    11: 'v7s',
    12: 'v7k',
    14: 'v6m',
    15: 'v7m',
    16: 'v7em'
  }
};

function cpuSubtypeIntel(a, b, name) {
  constants.cpuSubType.i386[a + (b << 4)] = name;
}

[
  [3, 0, 'all'],
  [4, 0, '486'],
  [4, 8, '486sx'],
  [5, 0, '586'],
  [6, 1, 'pentpro'],
  [6, 3, 'pentII_m3'],
  [6, 5, 'pentII_m5'],
  [7, 6, 'celeron'],
  [7, 7, 'celeron_mobile'],
  [8, 0, 'pentium_3'],
  [8, 1, 'pentium_3_m'],
  [8, 2, 'pentium_3_xeon'],
  [9, 0, 'pentium_m'],
  [10, 0, 'pentium_4'],
  [10, 1, 'pentium_4_m'],
  [11, 0, 'itanium'],
  [11, 1, 'itanium_2'],
  [12, 0, 'xeon'],
  [12, 1, 'xeon_mp']
].forEach(function(item) {
  cpuSubtypeIntel(item[0], item[1], item[2]);
});

constants.fileType = {
  1: 'object',
  2: 'execute',
  3: 'fvmlib',
  4: 'core',
  5: 'preload',
  6: 'dylib',
  7: 'dylinker',
  8: 'bundle',
  9: 'dylib_stub',
  10: 'dsym',
  11: 'kext'
};

constants.flags = {
  0x1: 'noundefs',
  0x2: 'incrlink',
  0x4: 'dyldlink',
  0x8: 'bindatload',
  0x10: 'prebound',
  0x20: 'split_segs',
  0x40: 'lazy_init',
  0x80: 'twolevel',
  0x100: 'force_flat',
  0x200: 'nomultidefs',
  0x400: 'nofixprebinding',
  0x800: 'prebindable',
  0x1000: 'allmodsbound',
  0x2000: 'subsections_via_symbols',
  0x4000: 'canonical',
  0x8000: 'weak_defines',
  0x10000: 'binds_to_weak',
  0x20000: 'allow_stack_execution',
  0x40000: 'root_safe',
  0x80000: 'setuid_safe',
  0x100000: 'reexported_dylibs',
  0x200000: 'pie',
  0x400000: 'dead_strippable_dylib',
  0x800000: 'has_tlv_descriptors',
  0x1000000: 'no_heap_execution'
};

constants.cmdType = {
  0x80000000: 'req_dyld',
  0x1: 'segment',
  0x2: 'symtab',
  0x3: 'symseg',
  0x4: 'thread',
  0x5: 'unixthread',
  0x6: 'loadfvmlib',
  0x7: 'idfvmlib',
  0x8: 'ident',
  0x9: 'fmvfile',
  0xa: 'prepage',
  0xb: 'dysymtab',
  0xc: 'load_dylib',
  0xd: 'id_dylib',
  0xe: 'load_dylinker',
  0xf: 'id_dylinker',
  0x10: 'prebound_dylib',
  0x11: 'routines',
  0x12: 'sub_framework',
  0x13: 'sub_umbrella',
  0x14: 'sub_client',
  0x15: 'sub_library',
  0x16: 'twolevel_hints',
  0x17: 'prebind_cksum',

  0x80000018: 'load_weak_dylib',
  0x19: 'segment_64',
  0x1a: 'routines_64',
  0x1b: 'uuid',
  0x8000001c: 'rpath',
  0x1d: 'code_signature',
  0x1e: 'segment_split_info',
  0x8000001f: 'reexport_dylib',
  0x20: 'lazy_load_dylib',
  0x21: 'encryption_info',
  0x80000022: 'dyld_info',
  0x80000023: 'dyld_info_only',
  0x24: 'version_min_macosx',
  0x25: 'version_min_iphoneos',
  0x26: 'function_starts',
  0x27: 'dyld_environment',
  0x80000028: 'main',
  0x29: 'data_in_code',
  0x2a: 'source_version',
  0x2b: 'dylib_code_sign_drs',
  0x2c: 'encryption_info_64',
  0x2d: 'linker_option'
};

constants.prot = {
  none: 0,
  read: 1,
  write: 2,
  execute: 4
};

constants.segFlag = {
  1: 'highvm',
  2: 'fvmlib',
  4: 'noreloc',
  8: 'protected_version_1'
};

constants.segTypeMask = 0xff;
constants.segType = {
  0: 'regular',
  1: 'zerofill',
  2: 'cstring_literals',
  3: '4byte_literals',
  4: '8byte_literals',
  5: 'literal_pointers',
  6: 'non_lazy_symbol_pointers',
  7: 'lazy_symbol_pointers',
  8: 'symbol_stubs',
  9: 'mod_init_func_pointers',
  0xa: 'mod_term_func_pointers',
  0xb: 'coalesced',
  0xc: 'gb_zerofill',
  0xd: 'interposing',
  0xe: '16byte_literals',
  0xf: 'dtrace_dof',
  0x10: 'lazy_dylib_symbol_pointers',
  0x11: 'thread_local_regular',
  0x12: 'thread_local_zerofill',
  0x13: 'thread_local_variables',
  0x14: 'thread_local_variable_pointers',
  0x15: 'thread_local_init_function_pointers'
};

constants.segAttrUsrMask = 0xff000000;
constants.segAttrUsr = {
  '-2147483648': 'pure_instructions',
  0x40000000: 'no_toc',
  0x20000000: 'strip_static_syms',
  0x10000000: 'no_dead_strip',
  0x08000000: 'live_support',
  0x04000000: 'self_modifying_code',
  0x02000000: 'debug'
};

constants.segAttrSysMask = 0x00ffff00;
constants.segAttrSys = {
  0x400: 'some_instructions',
  0x200: 'ext_reloc',
  0x100: 'loc_reloc'
};

},{}],10:[function(require,module,exports){
var util = require('util');
var Reader = require('endian-reader');

var macho = require('../macho');
var constants = macho.constants;

function Parser() {
  Reader.call(this);
};
util.inherits(Parser, Reader);
module.exports = Parser;

Parser.prototype.execute = function execute(buf) {
  var hdr = this.parseHead(buf);
  if (!hdr)
    throw new Error('File not in a mach-o format');

  hdr.cmds = this.parseCommands(hdr, hdr.body, buf);
  delete hdr.body;

  return hdr;
};

Parser.prototype.mapFlags = function mapFlags(value, map) {
  var res = {};

  for (var bit = 1; (value < 0 || bit <= value) && bit !== 0; bit <<= 1)
    if (value & bit)
      res[map[bit]] = true;

  return res;
};

Parser.prototype.parseHead = function parseHead(buf) {
  if (buf.length < 7 * 4)
    return false;

  var magic = buf.readUInt32LE(0);
  var bits;
  if (magic === 0xfeedface || magic === 0xcefaedfe)
    bits = 32;
  else if (magic === 0xfeedfacf || magic == 0xcffaedfe)
    bits = 64;
  else
    return false;

  if (magic & 0xff == 0xfe)
    this.setEndian('be');
  else
    this.setEndian('le');

  if (bits === 64 && buf.length < 8 * 4)
    return false;

  var cputype = constants.cpuType[this.readInt32(buf, 4)];
  var cpusubtype = this.readInt32(buf, 8);
  var filetype = this.readUInt32(buf, 12);
  var ncmds = this.readUInt32(buf, 16);
  var sizeofcmds = this.readUInt32(buf, 20);
  var flags = this.readUInt32(buf, 24);

  // Get endian
  var endian;
  if ((cpusubtype & constants.endian.multiple) === constants.endian.multiple)
    endian = 'multiple';
  else if (cpusubtype & constants.endian.be)
    endian = 'be';
  else
    endian = 'le';

  cpusubtype &= constants.cpuSubType.mask;

  // Get subtype
  var subtype;
  if (endian === 'multiple')
    subtype = 'all';
  else if (cpusubtype === 0)
    subtype = 'none';
  else
    subtype = constants.cpuSubType[cputype][cpusubtype];

  // Stringify flags
  var flagMap = this.mapFlags(flags, constants.flags);

  return {
    bits: bits,
    magic: magic,
    cpu: {
      type: cputype,
      subtype: subtype,
      endian: endian
    },
    filetype: constants.fileType[filetype],
    ncmds: ncmds,
    sizeofcmds: sizeofcmds,
    flags: flagMap,

    cmds: null,
    body: bits === 32 ? buf.slice(28) : buf.slice(32)
  };
};

Parser.prototype.parseCommands = function parseCommands(hdr, buf, file) {
  var cmds = [];

  var align;
  if (hdr.bits === 32)
    align = 4;
  else
    align = 8;

  for (var offset = 0, i = 0; offset + 8 < buf.length, i < hdr.ncmds; i++) {
    var type = constants.cmdType[this.readUInt32(buf, offset)];
    var size = this.readUInt32(buf, offset + 4) - 8;

    offset += 8;
    if (offset + size > buf.length)
      throw new Error('Command body OOB');

    var body = buf.slice(offset, offset + size);
    offset += size;
    if (offset & align)
      offset += align - (offset & align);

    cmds.push(this.parseCommand(type, body, file));
  }

  return cmds;
};

Parser.prototype.parseCStr = function parseCStr(buf) {
  for (var i = 0; i < buf.length; i++)
    if (buf[i] === 0)
      break;
  return buf.slice(0, i).toString();
};

Parser.prototype.parseLCStr = function parseLCStr(buf, off) {
  if (off + 4 > buf.length)
    throw new Error('lc_str OOB');

  var offset = this.readUInt32(buf, off) - 8;
  if (offset > buf.length)
    throw new Error('lc_str offset OOB');

  return this.parseCStr(buf.slice(offset));
};

Parser.prototype.parseCommand = function parseCommand(type, buf, file) {
  if (type === 'segment')
    return this.parseSegmentCmd(type, buf, file);
  else if (type === 'segment_64')
    return this.parseSegmentCmd(type, buf, file);
  else if (type === 'symtab')
    return this.parseSymtab(type, buf);
  else if (type === 'symseg')
    return this.parseSymseg(type, buf);
  else if (type === 'encryption_info')
    return this.parseEncryptionInfo(type, buf);
  else if (type === 'encryption_info_64')
    return this.parseEncryptionInfo64(type, buf);
  else if (type === 'dysymtab')
    return this.parseDysymtab(type, buf);
  else if (type === 'load_dylib' || type === 'id_dylib')
    return this.parseLoadDylib(type, buf);
  else if (type === 'load_weak_dylib')
    return this.parseLoadDylib(type, buf);
  else if (type === 'load_dylinker' || type === 'id_dylinker')
    return this.parseLoadDylinker(type, buf);
  else if (type === 'version_min_macosx' || type === 'version_min_iphoneos')
    return this.parseVersionMin(type, buf);
  else if (type === 'code_signature' || type === 'segment_split_info')
    return this.parseLinkEdit(type, buf);
  else if (type === 'function_starts')
    return this.parseFunctionStarts(type, buf, file);
  else if (type === 'data_in_code')
    return this.parseLinkEdit(type, buf);
  else if (type === 'dylib_code_sign_drs')
    return this.parseLinkEdit(type, buf);
  else if (type === 'main')
    return this.parseMain(type, buf);
  else
    return { type: type, data: buf };
};

Parser.prototype.parseSegmentCmd = function parseSegmentCmd(type, buf, file) {
  var total = type === 'segment' ? 48 : 64;
  if (buf.length < total)
    throw new Error('Segment command OOB');

  var name = this.parseCStr(buf.slice(0, 16));

  if (type === 'segment') {
    var vmaddr = this.readUInt32(buf, 16);
    var vmsize = this.readUInt32(buf, 20);
    var fileoff = this.readUInt32(buf, 24);
    var filesize = this.readUInt32(buf, 28);
    var maxprot = this.readUInt32(buf, 32);
    var initprot = this.readUInt32(buf, 36);
    var nsects = this.readUInt32(buf, 40);
    var flags = this.readUInt32(buf, 44);
  } else {
    var vmaddr = this.readUInt64(buf, 16);
    var vmsize = this.readUInt64(buf, 24);
    var fileoff = this.readUInt64(buf, 32);
    var filesize = this.readUInt64(buf, 40);
    var maxprot = this.readUInt32(buf, 48);
    var initprot = this.readUInt32(buf, 52);
    var nsects = this.readUInt32(buf, 56);
    var flags = this.readUInt32(buf, 60);
  }

  function prot(p) {
    var res = { read: false, write: false, exec: false };
    if (p !== constants.prot.none) {
      res.read = (p & constants.prot.read) !== 0;
      res.write = (p & constants.prot.write) !== 0;
      res.exec = (p & constants.prot.execute) !== 0;
    }
    return res;
  }

  var sectSize = type === 'segment' ? 32 + 9 * 4 : 32 + 8 * 4 + 2 * 8;
  var sections = [];
  for (var i = 0, off = total; i < nsects; i++, off += sectSize) {
    if (off + sectSize > buf.length)
      throw new Error('Segment OOB');

    var sectname = this.parseCStr(buf.slice(off, off + 16));
    var segname = this.parseCStr(buf.slice(off + 16, off + 32));

    if (type === 'segment') {
      var addr = this.readUInt32(buf, off + 32);
      var size = this.readUInt32(buf, off + 36);
      var offset = this.readUInt32(buf, off + 40);
      var align = this.readUInt32(buf, off + 44);
      var reloff = this.readUInt32(buf, off + 48);
      var nreloc = this.readUInt32(buf, off + 52);
      var flags = this.readUInt32(buf, off + 56);
    } else {
      var addr = this.readUInt64(buf, off + 32);
      var size = this.readUInt64(buf, off + 40);
      var offset = this.readUInt32(buf, off + 48);
      var align = this.readUInt32(buf, off + 52);
      var reloff = this.readUInt32(buf, off + 56);
      var nreloc = this.readUInt32(buf, off + 60);
      var flags = this.readUInt32(buf, off + 64);
    }

    sections.push({
      sectname: sectname,
      segname: segname,
      addr: addr,
      size: size,
      offset: offset,
      align: align,
      reloff: reloff,
      nreloc: nreloc,
      type: constants.segType[flags & constants.segTypeMask],
      attributes: {
        usr: this.mapFlags(flags & constants.segAttrUsrMask,
                           constants.segAttrUsr),
        sys: this.mapFlags(flags & constants.segAttrSysMask,
                           constants.segAttrSys)
      },
      data: file.slice(offset, offset + size)
    });
  }

  return {
    type: type,
    name: name,
    vmaddr: vmaddr,
    vmsize: vmsize,
    fileoff: fileoff,
    filesize: filesize,
    maxprot: prot(maxprot),
    initprot: prot(initprot),
    nsects: nsects,
    flags: this.mapFlags(flags, constants.segFlag),
    sections: sections
  };
};

Parser.prototype.parseSymtab = function parseSymtab(type, buf) {
  if (buf.length !== 16)
    throw new Error('symtab OOB');

  return {
    type: type,
    symoff: this.readUInt32(buf, 0),
    nsyms: this.readUInt32(buf, 4),
    stroff: this.readUInt32(buf, 8),
    strsize: this.readUInt32(buf, 12)
  };
};

Parser.prototype.parseSymseg = function parseSymseg(type, buf) {
  if (buf.length !== 8)
    throw new Error('symseg OOB');

  return {
    type: type,
    offset: this.readUInt32(buf, 0),
    size: this.readUInt32(buf, 4)
  };
};

Parser.prototype.parseEncryptionInfo = function parseEncryptionInfo(type, buf) {
  if (buf.length !== 12)
    throw new Error('encryptinfo OOB');

  return {
    type: type,
    offset: this.readUInt32(buf, 0),
    size: this.readUInt32(buf, 4),
    id: this.readUInt32(buf, 8),
  };
};

Parser.prototype.parseEncryptionInfo64 = function parseEncryptionInfo64(type, buf) {
  if (buf.length !== 16)
    throw new Error('encryptinfo64 OOB');

  return this.parseEncryptionInfo(type, buf.slice(0, 12));
};

Parser.prototype.parseDysymtab = function parseDysymtab(type, buf) {
  if (buf.length !== 72)
    throw new Error('dysymtab OOB');

  return {
    type: type,
    ilocalsym: this.readUInt32(buf, 0),
    nlocalsym: this.readUInt32(buf, 4),
    iextdefsym: this.readUInt32(buf, 8),
    nextdefsym: this.readUInt32(buf, 12),
    iundefsym: this.readUInt32(buf, 16),
    nundefsym: this.readUInt32(buf, 20),
    tocoff: this.readUInt32(buf, 24),
    ntoc: this.readUInt32(buf, 28),
    modtaboff: this.readUInt32(buf, 32),
    nmodtab: this.readUInt32(buf, 36),
    extrefsymoff: this.readUInt32(buf, 40),
    nextrefsyms: this.readUInt32(buf, 44),
    indirectsymoff: this.readUInt32(buf, 48),
    nindirectsyms: this.readUInt32(buf, 52),
    extreloff: this.readUInt32(buf, 56),
    nextrel: this.readUInt32(buf, 60),
    locreloff: this.readUInt32(buf, 64),
    nlocrel: this.readUInt32(buf, 68)
  };
};

Parser.prototype.parseLoadDylinker = function parseLoadDylinker(type, buf) {
  return {
    type: type,
    cmd: this.parseLCStr(buf, 0)
  };
};

Parser.prototype.parseLoadDylib = function parseLoadDylib(type, buf) {
  if (buf.length < 16)
    throw new Error('load_dylib OOB');

  return {
    type: type,
    name: this.parseLCStr(buf, 0),
    timestamp: this.readUInt32(buf, 4),
    current_version: this.readUInt32(buf, 8),
    compatibility_version: this.readUInt32(buf, 12)
  };
};

Parser.prototype.parseVersionMin = function parseVersionMin(type, buf) {
  if (buf.length !== 8)
    throw new Error('min version OOB');

  return {
    type: type,
    version: this.readUInt16(buf, 2) + '.' + buf[1] + '.' + buf[0],
    sdk: this.readUInt16(buf, 6) + '.' + buf[5] + '.' + buf[4]
  };
};

Parser.prototype.parseLinkEdit = function parseLinkEdit(type, buf) {
  if (buf.length !== 8)
    throw new Error('link_edit OOB');

  return {
    type: type,
    dataoff: this.readUInt32(buf, 0),
    datasize: this.readUInt32(buf, 4)
  };
};

// NOTE: returned addresses are relative to the "base address", i.e.
//       the vmaddress of the first "non-null" segment [e.g. initproto!=0]
//       (i.e. __TEXT ?)
Parser.prototype.parseFunctionStarts = function parseFunctionStarts(type,
                                                                    buf,
                                                                    file) {
  if (buf.length !== 8)
    throw new Error('function_starts OOB');

  var dataoff = this.readUInt32(buf, 0);
  var datasize = this.readUInt32(buf, 4);
  var data = file.slice(dataoff, dataoff + datasize);

  var addresses = [];
  var address = 0; // TODO? use start address / "base address"

  // read array of uleb128-encoded deltas
  var delta = 0, shift = 0;
  for (var i = 0; i < data.length; i++) {
    delta |= (data[i] & 0x7f) << shift;
    if ((data[i] & 0x80) !== 0) { // delta value not finished yet
      shift += 7;
      if (shift > 24)
        throw new Error('function_starts delta too large');
      else if (i + 1 === data.length)
        throw new Error('function_starts delta truncated');
    } else if (delta === 0) { // end of table
      break;
    } else {
      address += delta;
      addresses.push(address);
      delta = 0;
      shift = 0;
    }
  }

  return {
    type: type,
    dataoff: dataoff,
    datasize: datasize,
    addresses: addresses
  };
};

Parser.prototype.parseMain = function parseMain(type, buf) {
  if (buf.length < 16)
    throw new Error('main OOB');

  return {
    type: type,
    entryoff: this.readUInt64(buf, 0),
    stacksize: this.readUInt64(buf, 8)
  };
};

},{"../macho":8,"endian-reader":11,"util":5}],11:[function(require,module,exports){
function Reader(endian) {
  this.endian = null;

  if (endian)
    this.setEndian(endian);
};
module.exports = Reader;

Reader.prototype.setEndian = function setEndian(endian) {
  this.endian = /le|lsb|little/i.test(endian) ? 'le' : 'be';
};

Reader.prototype.readUInt8 = function readUInt8(buf, offset) {
  return buf.readUInt8(offset);
};

Reader.prototype.readInt8 = function readInt8(buf, offset) {
  return buf.readInt8(offset);
};

Reader.prototype.readUInt16 = function readUInt16(buf, offset) {
  if (this.endian === 'le')
    return buf.readUInt16LE(offset);
  else
    return buf.readUInt16BE(offset);
};

Reader.prototype.readInt16 = function readInt16(buf, offset) {
  if (this.endian === 'le')
    return buf.readInt16LE(offset);
  else
    return buf.readInt16BE(offset);
};

Reader.prototype.readUInt32 = function readUInt32(buf, offset) {
  if (this.endian === 'le')
    return buf.readUInt32LE(offset);
  else
    return buf.readUInt32BE(offset);
};

Reader.prototype.readInt32 = function readInt32(buf, offset) {
  if (this.endian === 'le')
    return buf.readInt32LE(offset);
  else
    return buf.readInt32BE(offset);
};

Reader.prototype.readUInt64 = function readUInt64(buf, offset) {
  var a = this.readUInt32(buf, offset);
  var b = this.readUInt32(buf, offset + 4);
  if (this.endian === 'le')
    return a + b * 0x100000000;
  else
    return b + a * 0x100000000;
};

Reader.prototype.readInt64 = function readInt64(buf, offset) {
  if (this.endian === 'le') {
    var a = this.readUInt32(buf, offset);
    var b = this.readInt32(buf, offset + 4);
    return a + b * 0x100000000;
  } else {
    var a = this.readInt32(buf, offset);
    var b = this.readUInt32(buf, offset + 4);
    return b + a * 0x100000000;
  }
};

},{}]},{},[6])(6)
});