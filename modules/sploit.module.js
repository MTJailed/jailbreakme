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

function printspecs() {
    var device = window.chosendevice;
    if(!device) puts('Please initialize your device first.');
    //Print out the most important properties of the device
    puts("<b>"+(device.productname ? device.productname : device.devicetype)+"</b> "+device.sw_vers+" ("+device.sw_build+")");
    //puts("<b>Dots per inch: </b>"+device.dpi);
    puts("<b>GPU: </b>"+device.gpu);
};

function sploit_init() {

    var MAX_SUPPORT = {os: 11.31, safari: 604.1};
    var device = detectDevice(); window.chosendevice = device;
    
    var supported_browser = device.is_mobile && device.is_safari;
    var supported_type = device.devicetype == "iPhone"  || device.devicetype == "iPad";
    var supported_vers = device.sw_vers > MAX_SUPPORT.os || parseInt(device.safari_vers) > MAX_SUPPORT.safari;
/*
    if(!supported_browser) {
        puts("Failed. This exploit only works on MobileSafari.");
        return false;
    }

    if(!supported_type) {
        puts("Failed. This exploit only supports iPhone or iPad");
        return false;
    }

    if(!supported_vers) {
        puts("Failed. We do not support iOS higher than "+MAX_SUPPORT.os);
        return false;
    }

    if(!device.productname && window.chosendevice.sw_vers >=10 ) {
        puts("Device type couldn't be identified.");
        return false;
    }

    if(window.chosendevice.sw_vers >= 10) {
        window.chosendevice.offsets = Offsets(device.sw_vers, device.productname);

        if(!window.chosendevice.offsets) {
            puts("offsets missing for "+window.chosendevice.productname+", please report them.");
            return false;
        }

        alert('Chose offsets: '+JSON.stringify(window.chosendevice.offsets));
    } else {
        window.chosendevice.offsets = {}; //not needed
    }*/
    return true;
}


function start_strategy(name) {
    window.await = setInterval(function(){
        if(eval(name) !== undefined) {
            eval(name+"();");
            clearInterval(window.await);
        }
    }, 250);
}

function strategy_select() {
    if(!window.chosendevice) return false;

    if(window.chosendevice.sw_vers >= 9.0 && window.chosendevice.sw_vers < 9.35) {
        puts("Chose to use Tihmstars jailbreak me");
        include('sploit.91x32');
        start_strategy("wk91go");
    }

    else if(window.chosendevice.sw_vers === 11.3 || window.chosendevice.sw_vers === 11.31) {
        puts("Chose to use Niklas B's jailbreak me.");

        var supported_devices = ["iPhone 8", "iPhone 8+", "iPhone 6S"];
        var supported = false;

        for(device = 0; device < supported_devices.length; device++) {
            if(window.chosendevice.productname.indexOf(supported_devices[device]) > -1) {
                supported = true;
                break;
            }
        }

        if(supported) {
            include('sploit.1131');
            start_strategy("wk113go");
    
        } else {
            puts('Your '+(window.chosendevice.productname ? window.chosendevice.productname.join(' or ') : 'Unknown')+ " is not supported");
            return false
        }
    }
    return false;
}

function sploit_main() {
    //Initialize
    if(!sploit_init()) return false;

    var strategy = false;
    var device = window.chosendevice;

    printspecs(); //print the most important specifications of the device

    var strategy = strategy_select();

    try{ 
        if(strategy) {
            strategy();
        } else {
            puts("Your device or ios version isn't supported.");
            return false;
        }
    } catch(exception) {
       alert("Exploit failed: "+exception);
    }
    return true;
}

/***
 *     █████╗    ██████╗    ██╗  ██╗     ██████╗ ██╗  ██╗      ██████╗ ██╗████████╗
 *    ██╔══██╗   ╚════██╗   ╚██╗██╔╝    ██╔════╝ ██║  ██║      ██╔══██╗██║╚══██╔══╝
 *    ╚██████║    █████╔╝    ╚███╔╝     ███████╗ ███████║█████╗██████╔╝██║   ██║
 *     ╚═══██║    ╚═══██╗    ██╔██╗     ██╔═══██╗╚════██║╚════╝██╔══██╗██║   ██║
 *     █████╔╝██╗██████╔╝██╗██╔╝ ██╗    ╚██████╔╝     ██║      ██████╔╝██║   ██║
 *     ╚════╝ ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝     ╚═════╝      ╚═╝      ╚═════╝ ╚═╝   ╚═╝
 *      By Luca Todesco
 */

// ETA S0n