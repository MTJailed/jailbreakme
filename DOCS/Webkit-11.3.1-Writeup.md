# An RCE exploit for iOS 11.3.1 
## by Niklas B in Co-operation with phoenhex team
### Extended by Sem Voigtländer

### Finding offsets

iOS Stores system libraries and frameworks in a cachefile for optimal performance.

This exploit uses rop gadgets invarious frameworks from the dyld_shared_cache.

Therefore the following methods can be used for finding offsets for the exploit to add support to new devices:

- Dumping the libraries from the memory live on an iOS device by firstly loading them, then finding it with dyld, finding the base address of it with liblorgnette, then parsing it as a Mach-O file and dumping it to a file.

- Copying the entire dyld_shared_cache to either an app that supports iTunes Filesharing or via an FTP server.

The first option would be more straightforward as it only gives you the libraries you need but at this time my program as I wrote it is only able to dump the TEXT section from the libraries. You can find the code in UnjailMe.

The second option is what I did but that comes with a limitation:
- ~~There are currently no working and precise cache extraction utillities that do not truncate or corrupt the libraries.~~
- Loading an entire cache (1GB) into IDA will be extremely slow so it needs to be extracted.
- Radare2 can be used to find the ROP gadgets
- My offset finder can find the offsets of the needed symbols on-device, otherwise hopper can be used.

Take a look at offsets.module.js and there you can see which offsets to find.
You can find my offset finder on this repository under releases.

To find the popx8 gadget in ModelIO use the followin in radare2:
```radare2
	"/c ldr x8, [sp, 0x28]; ldr x0, [x8, 0x18]; ldp x29, x30, [sp, 0x50]; add sp, sp, 0x60; ret"
```

