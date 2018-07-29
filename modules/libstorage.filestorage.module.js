var LIBSTORAGE_FILESTORAGE = true;
var FileStorage = {};

FileStorage.config = {
	Author: "Sem Voigtländer",
	Version: 1.0,
	License: "MIT License"
};

FileStorage.mode = {
	XML: 0,
	FETCH: 1
};

FileStorage.getcontents = function(FSMode, url, callback = Function, timeout = 500) {
	if(!FSMode) { //XML (Legacy)
		var req = new XMLHttpRequest();
		req.open('GET', url, false);
    	req.overrideMimeType('text\/plain; charset=x-user-defined');
    	req.send(null);
    	return req.status === 200 ? req.responseText : null;
	} else { //FETCH (Modern)
		fetch(url).then( (rsp) => {
			rsp.arrayBuffer().then(buffer => {
				console.log('[FileStorage][GetContents]: received file pushing to callback.');
				callback(buffer);
			});
		});
	}
};

FileStorage.download = function(data, mimetype, filename) {
	var b = new Blob([data], { type: mimetype });
	var dl = document.createElement('a');
	dl.download = filename;
	window.URL = window.URL || window.WebkitURL;
	dl.href = URL.createObjectURL(b);
	dl.dataset.downloadurl = [mimetype, dl.download, dl.href].join(':');
	dl.style.display = 'none';
	document.body.appendChild(dl);
	dl.click();
	document.body.removeChild(dl);
	setTimeout(function(){URL.revokeObjectURL(dl.href);}, 1500);
};

FileStorage.save = function(data, name) {
	localStorage[name] = data;
};

FileStorage.open = function(name) {
	return localStorage[name];
};