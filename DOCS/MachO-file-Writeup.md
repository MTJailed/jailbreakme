# The Mach-O File format
A file format is a standard for how a file is structured.

Mach-O (MACH/MUCK Object) is a well-structured fileformat used by mainly iOS and macOS binaries.

Mach-O Files have a header with info about the structure of the file such as the cpu type, file type and dynamic loader info.

From there on the sections of the file can easily be found and analyzed to learn more about the file.

Commandline utillities such as nm and strings use a mach-o parser to analyze the file.

## Endianess
Endianness tells something about how data is read by the cpu.

You can read bytes from left to right or from right to left.

Big endian: (01 AB CD EF)

Little endian: (EF CD AB 01)

Mach-O Files can have multiple architectures and multiple endianness

## Magic
The magic is a magic 32-bit integer defining the start of a mach-o file.

The header of the file comes directly after.

There are the following magics that a mach-o file can have:

* 0xFEEDFACE (32-bit)
* 0xFEEDFACF (64-bit)
* 0xCEFAEDFE (little endian 32-bit)
* 0xCFFAEDFE (little endian 64-bit)


## Header
The header of a 32-bit Mach-O file looks like this (from mach-o/loader.h (opensource.apple.com):
```C
	struct mach_header {
		uint32_t	magic;		/* mach magic number identifier */
		cpu_type_t	cputype;	/* cpu specifier */
		cpu_subtype_t	cpusubtype;	/* machine specifier */
		uint32_t	filetype;	/* type of file */
		uint32_t	ncmds;		/* number of load commands */
		uint32_t	sizeofcmds;	/* the size of all the load commands */
		uint32_t	flags;		/* flags */
	};
```

From this you can get info about its endianness by looking at the magic, the cpu it was build for, the file type (Executable, Kernel Extension, Shared Library, etc.).


## Load Commands
Directly after the header the load commands start.

There are many load commands giving info about the file and LC_MAIN is the main load command.

## Segments

## Sections

## The strings table

## The symbol table

## The Objective-C info