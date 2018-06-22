function supportsTouch(argument) {
    return navigator.maxTouchPoints || navigator.msMaxTouchPoints || 'ontouchstart' in window;
}

function GetDPI() {
    
    //Element properties for getting DPI
    var dpistyle = 'data-dpi-test { height: 1in; left: -100%; position: absolute; top: -100%; width: 1in; }';
    var dpistyleelement = document.createElement('style');
    var dpielement = document.createElement('data-dpi-test');
    
    dpistyleelement.setAttribute('type', 'text/css');
    dpistyleelement.setAttribute('rel', 'stylesheet');
    dpistyleelement.innerHTML = dpistyle;
    dpistyleelement.setAttribute('id', 'dpi-style');
    dpielement.setAttribute('id', 'dpi-test');
    
    //create the DPI element (1)
    document.head.appendChild(dpistyleelement);
    document.body.appendChild(dpielement);
    
    //get the dpi
    var dpi = document.getElementById('dpi-test').offsetHeight;
    
    //remove the test elements
    document.getElementById('dpi-test').remove();
    document.getElementById('dpi-style').remove();
    
    return dpi;
}

function GetGPU() {
    
    var GPU = null;
    
    var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
    var gpuelement = document.createElement('canvas');
    gpuelement.setAttribute('width', 0);
    gpuelement.setAttribute('height', 0);
    gpuelement.setAttribute('id', 'glcanvas');
    document.body.appendChild(gpuelement);
    var gl = document.getElementById('glcanvas').getContext('experimental-webgl');
    var renderinfo = null;
    try{
        renderinfo = gl.getExtension("WEBGL_debug_renderer_info");
        if(renderinfo) GPU = gl.getParameter(renderinfo.UNMASKED_RENDERER_WEBGL);
        document.getElementById('glcanvas').remove();
    } catch(ex) {
        alert(ex);
    }
    if(!GPU) GPU = false;
    return GPU;
}

function getProductName() {
    var height = window.screen.height;
    var width = window.screen.width;
    var dpi = GetDPI();
    var gpu = GetGPU();
    
    if(gpu) gpu = gpu.split('Apple ');
    if(gpu.length > 1) {
        gpu = gpu[1].split(' GPU')[0];
    } else {
        gpu = false;
    }
    
    /* iPhones */
    
    
    if(width === 320 && height === 480 && gpu =='A4') return ['iPhone 4'];
    
    if(width === 320 && height === 480 && gpu == 'A5') return ['iPhone 4S'];
    
    if(width === 320 && height === 568 && gpu == 'A5') return ['iPhone 5'];
    
    if(width === 320 && height === 568 && gpu == 'A6') return ['iPhone 5C'];
    
    if(width === 320 && height === 568 && gpu == 'A7') return ['iPhone 5S'];
    
    if(width === 375 && height === 667 && gpu == 'A8') return ['iPhone 6'];
    
    if(width === 414 && height === 736 && gpu == 'A8') return ['iPhone 6+'];
    
    if(width === 375 && height === 667 && gpu == 'A9') return ['iPhone 6S'];
    
    if(width === 414 && height === 736 && gpu == 'A9') return ['iPhone 6S+'];
    
    if(width === 320 && height === 568 && gpu == 'A9') return ['iPhone SE'];
    
    if(width === 375 && height === 667 && gpu == 'A10') return ['iPhone 7'];
    
    if(width === 414 && height === 736 && gpu == 'A10') return ['iPhone 7+'];
    
    if(width === 375 && height === 667 && gpu == 'A11') return ['iPhone 8'];
    
    if(width === 414 && height === 736 && gpu == 'A11') return ['iPhone 8+'];
    
    if(width === 375 && height === 812 && gpu == 'A11') return ['iPhone X'];
    
    /* iPads */
    if(width === 768 && height === 1024 && gpu == 'A5') return ['iPad Mini', 'iPad 2'];
    
    if(width === 768 && height === 1024 && gpu == 'A7') return ['iPad Mini 2', 'iPad Mini 3', 'iPad Air'];
    
    if(width === 768 && height === 1024 && gpu == 'A8') return ['iPad Mini 4'];
    
    if(width === 768 && height === 1024 && gpu == 'A5X') return ['iPad 3'];
    
    if(width === 768 && height === 1024 && gpu == 'A6X') return ['iPad 4'];
    
    if(width === 768 && height === 1024 && gpu == 'A8X') return ['iPad Air 2'];
    
    if(width === 768 && height === 1024 && gpu == 'A9X') return ['9.7-inch iPad Pro'];
    
    if(width === 834 && height === 1112 && gpu == 'A10X') return ['10.5-inch iPad Pro'];
    
    if(width === 1024 && height === 1366 && gpu == 'A10X') return ['12.9-inch iPad Pro'];
    
    if(width === 272 && height === 340 && gpu == 'S1') return ['Watch 1 38mm'];
    
    if(width === 312 && height === 390 && gpu == 'S1') return ['Watch 1 42mm'];
    
    if(width === 272 && height === 340 && gpu == 'S1P') return ['Watch 1 sport 38mm'];
    
    if(width === 312 && height === 390 && gpu == 'S1P') return ['Watch 1 sport 42mm'];
    
    if(width === 272 && height === 340 && gpu == 'S2') return ['Watch 2 38mm'];
    
    if(width === 312 && height === 390 && gpu == 'S2') return ['Watch 2 42mm'];
    
    if(width === 272 && height === 340 && gpu == 'S3') return ['Watch 3 38mm'];
    
    if(width === 312 && height === 390 && gpu == 'S3') return ['Watch 3 42mm'];
    
    //Legacy
    if(height <= 480) return ['iPhone 2G', 'iPhone 3', 'iPhone 3GS'];
    
    return false;
}




function getOSVersionFromUA() {
    return parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1]) .replace('undefined', '3_2').replace('_', '.').replace('_', '')) || false;
}

function getBuildFromUA() {
    var tmp = navigator.userAgent.split('Mobile/');
    tmp = (tmp.length > 1) ? tmp[1].split(' ') : null;
    if(tmp) tmp = tmp[0];
    return tmp;
}

function BuildToVerson(build) {
    if(typeof build !== 'string') return null;
    if(build == '15F79') return 11.4;
    if(build == '15E302') return 11.31;
    if(build == '15E216') return 11.301;
    if(build == '15E148') return 11.300;
    if(build == '15D100') return 11.26;
    if(build == '15D60') return 11.22;
    if(build == '15C153') return 11.21;
    if(build == '15C114') return 11.2;
    if(build == '15B202') return 11.12;
    if(build == '15B150') return 11.11;
    if(build == '15B93') return 11.1;
    if(build == '15A432') return 11.03;
    if(build == '15A421') return 11.02;
    if(build == '15A402') return 11.01;
    if(build == '15A372') return 11.0;
    if(build == '14G60') return 10.33;
    if(build == '14F89') return 10.32;
    if(build == '14E302') return 10.31;
    if(build == '14E277') return 10.3;
    if(build == '14D27') return 10.21;
    if(build == '14C92') return 10.2;
    if(build == '14B150') return 10.111;
    if(build == '14B100') return 10.110;
    if(build == '14B72') return 10.1;
    if(build == '14A456') return 10.02;
    if(build == '14A403') return 10.01;
    if(build == '13G36') return 9.35;
    if(build == '13G35') return 9.34;
    if(build == '13G34') return 9.33;
    if(build == '13F69') return 9.32;
    if(build == '13E238') return 9.31;
    if(build == '13E233') return 9.3;
    if(build == '13D20') return 9.211;
    if(build == '13D15') return 9.210;
    if(build == '13C75') return 9.2;
    if(build == '13B143') return 9.1;
    if(build == '13A452') return 9.02;
    if(build == '13A404') return 9.01;
    if(build == '13A344') return 9.0;
    if(build == '12H321') return 8.41;
    if(build == '12H143') return 8.4;
    if(build == '12F70') return 8.3;
    if(build == '12B466') return 8.13;
    if(build == '12B440') return 8.12;
    if(build == '12B436') return 8.11;
    if(build == '12B411') return 8.1;
    if(build == '12A405') return 8.02;
    if(build == '12A402') return 8.01;
    if(build == '12A365') return 8.0;
    
    return false;
}

function detectDevice() {
    var device = {};
    
    device.is_mobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    device.is_safari = device.is_mobile && (/Mobile/i.test(navigator.userAgent));
    device.sw_build = getBuildFromUA();
    device.sw_vers = BuildToVerson(device.sw_build) ||  getOSVersionFromUA();
    device.webkit_vers = window.navigator.userAgent.indexOf('AppleWebKit') > -1 ? window.navigator.userAgent.split('AppleWebKit')[1].replace('/', '') : null;
    device.safari_vers = window.navigator.userAgent.indexOf('Safari') > -1 ? window.navigator.userAgent.split('Version/')[1] : null;
    device.language = navigator.systemLanguage || navigator.language;
    device.timezone = String(String(new Date()).split("(")[1]).split(")")[0];
    device.devicetype = (navigator.userAgent.match(/iPhone/i) ? "iPhone" : (navigator.userAgent.match(/iPad/i) ? "iPad" : null));
    device.productname = getProductName();
    device.gpu = GetGPU();
    device.dpi = GetDPI();
    device.identifier = Sha1.hash(navigator.userAgent+device.gpu+device.dpi+device.language+device.timezone+device.type+device.productname+device.sw_build+navigator.doNotTrack+device.language);
    if(device.gpu) {
        device.bit32 = parseInt(device.gpu.split('A')[0][0]) < 7;
    } else {
        device.bit32 = true;
    }
    return device;
}
