//@enum VERBOSITY
var VERBOSITY = {
	LOW: 0,
	DEFAULT: 1,
	HIGH: 2,
	VERBOSE: 3
};

//Set the verbosity to the default verbosity
verbosity = VERBOSITY.DEFAULT;

//Override the print function that normally would request a printer popup with one that calls alert() instead
print = alert;//function(x){alert(x);puts(x)};

