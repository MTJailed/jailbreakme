include('libaddressspace.memdump');

var PAGE_SIZE_16K = 1024 * 16;
var PAGE_SIZE_4K = 4 * 1024;
var HOST_PAGE_SIZE = {};
HOST_PAGE_SIZE =  function() {return HOST_PAGE_SIZE.pagesize || PAGE_SIZE_16K;};

HOST_PAGE_SIZE.init = function(sz) {
	sz == PAGE_SIZE_16K || sz == PAGE_SIZE_4K ? HOST_PAGE_SIZE.pagesize = sz : console.error('Invalid pagesize.');
};

function vm_allocate(size) {
	var addrspace = new Array();
	var numpages = size / HOST_PAGE_SIZE(); if(size <= HOST_PAGE_SIZE()) numpages = 1;

	console.log('Allocating '+numpages+' page(s).');
	for(i = 0; i < numpages; i++) {
		addrspace[i] = new Array(HOST_PAGE_SIZE());
	} 
	return addrspace;
}

function vm_read64(size, start, method) {
	var end = start+(size*8);
	var data = vm_allocate(size);
	var CURRENT_PAGE = 0;
	for(off = 0; off < end; off+=8) {
		data[CURRENT_PAGE][off] = method.read(start+off);
		if(i >= HOST_PAGE_SIZE()) {
			CURRENT_PAGE++;
		}
	}
	var out = '';
	for(NUMPAGES = CURRENT_PAGE, PAGE = 0; PAGE <= NUMPAGES; PAGE++) {
		out += data[PAGE].join('');
	}
	return out;
}