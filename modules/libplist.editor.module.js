
String.prototype.toUint8Array = function() {
	return new (TextEncoder || TextEncoderLite)('utf-8').encode(this);
};

Uint8Array.prototype.toCString = function() {
	return new (TextDecoder || TextDecoderLiter)('utf-8').decode(this);
};

var _PlistError = function _PlistError(e, caller) {
	throw new Error("An error occured at Object: \n"+JSON.stringify(caller)+"\nError: "+e);
};



var PlistBool = function PlistBool(value) {
	if(typeof value !== 'boolean' && typeof value !== 'number') new _PlistError('Cannot convert value to bool', this);
	return "<"+value+"/>";
};

var PlistInteger = function PlistInteger(value) {
	if(typeof value !== 'number') value = parseInt(value);
	this.head = "<integer>";
	this.value = value;
	this.foot = "</integer>";
};
var PlistString = function PlistString(value) {
	if(typeof value !== 'string') value = value.toString();
	this.head = "<string>";
	this.value = value;
	this.foot = "</string>";
};
var PlistDict = function PlistDict(elements = [])
{
	this.head = "<dict>";
	this.elements = elements;
	this.foot = "</dict>";
};
PlistDict.Add = function(key, value) {
	this.elements.push([key, value]);
};

var PlistKey = function PlistKey(name, value = {})
{
	if(!name) return;
	this.head = "<key>"+name+"</key>";
	this.value = value;
};

var PlistArray = function PlistArray(elements = [])
{
	this.head = "<array>";
	this.elements = elements;
	this.foot = "</array>";
};

var PlistData = function PlistData(value = "", isBase64 = false)
{
	if(typeof value !== 'string') string = new (TextEncoder || TextEncoderLite)('utf-').encode()
	this.head = "<data>";
	this.value = isBase64 ?  value : btoa(value);
	this.foot = "</data>";
};

var PlistDate = function PlistDate(value) {
	this.head = "<date>";
	this.value = new Date().toISOString();
	this.foot = "</date>";
}

var Plist = function Plist()
{
	this.head =  '<?xml version="1.0" encoding="UTF-8"?>';
	this.head += '<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">';
	this.head += '<plist version="1.0">';
	this.body = new PlistDict();
	this.foot = '</plist>';	
};
Plist.prototype.Add = function(element) {
	this.body.elements.push(element);
};
Plist.prototype.Build = function() {
	this.result = this.head;
	this.result += this.body.head;
	for(i = 0; i < this.body.elements.length; i++) {
		this.result += this.body.elements[i].head;
		this.result += this.body.elements[i].foot;
	}
	this.result += this.body.foot;
	return result;
};