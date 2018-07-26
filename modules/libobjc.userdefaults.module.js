var Userdefaults = {
	Author: "Sem Voigtländer",
	Version: 1.0
};

var Userdefaults = function() {
	this.valueForKey = function(key) {
		return (localStorage) ? localStorage.getItem(key) : null;
	};
	this.setValueForKey = function(value, key) {
		return (localStorage) ? localStorage.setItem(value, key) : null;
	};
	this.removeObjectAtindex = function(key) {
		return (localStorage) ? localStorage.removeItem(key) : null;
	};
	this.flushStorage = function() {
		if(localStorage) localStorage.clear();
		if(navigator.cookieEnabled) document.cookie = "";
	};
	return this;
}();
