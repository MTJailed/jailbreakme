# An RCE exploit for iOS 11.3.1 
## by Niklas B in Co-operation with phoenhex team

### Finding offsets

iOS Stores system libraries and frameworks in a cachefile for optimal performance.

This exploit uses rop gadgets invarious frameworks from the dyld_shared_cache.

Therefore the following methods can be used for finding offsets for the exploit to add support to new devices:

- Dumping the libraries from the memory live on an iOS device by firstly loading them, then finding it with dyld, finding the base address of it with liblorgnette, then parsing it as a Mach-O file and dumping it to a file.

- Copying the entire dyld_shared_cache to either an app that supports iTunes Filesharing or via an FTP server.

The first option would be more straightforward as it only gives you the libraries you need but at this time my program as I wrote it is only able to dump the TEXT section from the libraries. You can find the code in UnjailMe.

The second option is what I did but that comes with a limitation:
- There are currently no working and precise cache extraction utillities that do not truncate or corrupt the libraries.
- Loading an entire cache (1GB) into IDA will be extremely slow
- Radare2 will load it but the analysis will take ages and its not efficient to analyze the entire cache
- Hopper will load it and you can select the library to analyze but hopper does not have very good ROP gadget search functionality other than poorly searching for opcodes.

So finding the symbol offsets is easy with hopper.

Take a look at offsets.module.js and there you can see which offsets to find.

But then there are the ROP gadgets and those may take ages to find manually in Hopper.

Until either a new cache extraction utilty is written or my iOS app for dumping libraries is finished looking for ROP gadgets will be a painful job.

