/**
 PlistParser: a JavaScript utility to process Plist XML into JSON
 @author Todd Gehman (toddgehman@gmail.com)
 Copyright (c) 2010 Todd Gehman

 --- 

 Usage:
   var jsonString = PlistParser.parse(xmlString);

 ---
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var PlistParser = {};

PlistParser.parse = function(plist_xml){
  // Special case XML munging if we're running in Appcelerator Titanium
  try{
    if (typeof Titanium.XML != 'undefined'){
      plist_xml = Titanium.XML.parseString(plist_xml);
    }
  } catch(e){
    var parser = new DOMParser();
		  plist_xml = parser.parseFromString(plist_xml, 'text/xml');
  }
    
  var result = this._xml_to_json(plist_xml.getElementsByTagName('plist').item(0));
  return result;
};

PlistParser._xml_to_json = function(xml_node) {
  var parser = this;
  var parent_node = xml_node;
  var parent_node_name = parent_node.nodeName;

  // console.log("Working on parent node: ");
  // console.log(parent_node);

  var child_nodes = [];
  for(var i = 0; i < parent_node.childNodes.length; ++i){
    var child = parent_node.childNodes.item(i);
    if (child.nodeName != '#text'){
      child_nodes.push(child);
    };
  };
  
  switch(parent_node_name){

    case 'plist':
      if (child_nodes.length > 1){
        // I'm not actually sure if it is legal to have multiple
        // top-level nodes just below <plist>. But I originally 
        // wrote it to handle an array of nodes at that level,
        // so I'm leaving this handling in for now.
        var plist_array = [];
        for(var i = 0; i < child_nodes.length; ++i){
           plist_array.push(parser._xml_to_json(child_nodes[i]));
        };
        // var plist_hash = {};
        // plist_hash['plist'] = plist_array;
        // return plist_hash;
        return plist_array;
      } else {
        // THIS is the standard case. The top-most node under
        // <plist> is either a <dict> or an <array>.
        return parser._xml_to_json(child_nodes[0]);
      }
      break;

    case 'dict':

      var dictionary = {};
      var key_name;
      var key_value;
      for(var i = 0; i < child_nodes.length; ++i){
        var child = child_nodes[i];
        if (child.nodeName == '#text'){
          // ignore empty text children
        } else if (child.nodeName == 'key'){
          key_name = PlistParser._textValue(child.firstChild);
        } else {
          key_value = parser._xml_to_json(child);
          dictionary[key_name] = key_value;
        }
      }

      return dictionary;

    case 'array':

      var standard_array = [];
      for(var i = 0; i < child_nodes.length; ++i){
        var child = child_nodes[i];
        standard_array.push(parser._xml_to_json(child));
      }
      return standard_array;

    case 'string':

      return PlistParser._textValue(parent_node);

    case 'date':

      var date = PlistParser._parseDate(PlistParser._textValue(parent_node));
      return date.toString();

    case 'integer':
    
      // Second argument (radix parameter) forces string to be interpreted in base 10.
      return parseInt(PlistParser._textValue(parent_node), 10);

    case 'real':
    
      return parseFloat(PlistParser._textValue(parent_node));

    case 'data':

      return PlistParser._textValue(parent_node);

    case 'true':

      return true;

    case 'false':
    
      return false;
      
    
    case '#text':

      break;
  };
};


PlistParser._textValue = function(node) {
  if (node.text){
    return node.text;
  } else {
    return node.textContent;
  };
};

// Handle date parsing in non-FF browsers
// Thanks to http://www.west-wind.com/weblog/posts/729630.aspx
PlistParser._parseDate = function(date_string){
  var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
  var matched_date = reISO.exec(date_string);
  if (matched_date){ 
    return new Date(Date.UTC(+matched_date[1], +matched_date[2] - 1, +matched_date[3], +matched_date[4], +matched_date[5], +matched_date[6]));
  };
};


// Lifted (then modified) from: 
// http://blog.stchur.com/2007/04/06/serializing-objects-in-javascript/
PlistParser.serialize = function(_obj) {
  // Let Gecko browsers do this the easy way
  try{
    if (typeof _obj.toSource !== 'undefined' && typeof _obj.callee === 'undefined') {
      return _obj.toSource();
    }
  } catch(e) {
    // Keep on truckin'.
  }

  // Other browsers must do it the hard way
  switch (typeof _obj)
  {
    // numbers, booleans, and functions are trivial:
    // just return the object itself since its default .toString()
    // gives us exactly what we want
    case 'number':
    case 'boolean':
    case 'function':
      return _obj;

    // for JSON format, strings need to be wrapped in quotes
    case 'string':
      return '\'' + _obj + '\'';

    case 'object':
      var str;
      if (_obj.constructor === Array || typeof _obj.callee !== 'undefined')
      {
        str = '[';
        var i, len = _obj.length;
        for (i = 0; i < len-1; i++) { str += PlistParser.serialize(_obj[i]) + ','; }
        str += PlistParser.serialize(_obj[i]) + ']';
      }
      else
      {
        str = '{';
        var key;
        for (key in _obj) { 
          // "The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype."
          if (_obj.hasOwnProperty(key)) {
            str += key + ':' + PlistParser.serialize(_obj[key]) + ','; 
          };
        };
        str = str.replace(/\,$/, '') + '}';
      }
      return str;

    default:
      return 'UNKNOWN';
  };
};

PlistParser.toPlist = function(obj){
  var xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">';

  var container = document.createElement('xml');
  var plist = document.createElement('plist');
  plist.setAttribute('version','1.0');
  container.appendChild(plist);
  
  var root = document.createElement('dict');
  plist.appendChild(root);

  var getISOString = function(date){
    function pad(n) { return n < 10 ? '0' + n : n }
    return date.getUTCFullYear() + '-'
      + pad(date.getUTCMonth() + 1) + '-'
      + pad(date.getUTCDate()) + 'T'
      + pad(date.getUTCHours()) + ':'
      + pad(date.getUTCMinutes()) + ':'
      + pad(date.getUTCSeconds()) + 'Z';
  }

  var walkObj = function(target, obj, callback){
    for(var i in obj){
      callback(target, i, obj[i]);
    }
  }

  var processObject = function(target, name, value){
    var key = document.createElement('key');
    key.innerHTML = name;
    target.appendChild(key);
    if(typeof value == 'object'){
      if(value instanceof Date){
        var date = document.createElement('date');
        date.innerHTML = getISOString(value);
        target.appendChild(date);
      }else{
        var dict = document.createElement('dict');
        walkObj(dict, value, processObject)
        target.appendChild(dict);
      }
    }else if(typeof value == 'boolean'){
      var bool = document.createElement(value.toString());
      target.appendChild(bool);
    }else{
      var string = document.createElement('string');
      string.innerHTML = value;
      target.appendChild(string);
    }
  };
  walkObj(root, obj, processObject);

  return xml+container.innerHTML;
};