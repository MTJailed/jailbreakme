var memorydump = function(vm_addr_base = 0, vm_size = 0, primitive = Function) {
	var out = [];
	var addr_index = vm_addr_base;
	out.push('0x'+addr_index.toString(16)+": ");
	for(off = 0; off < vm_size; off++) {
		out.push(primitive.read(vm_addr_base+off, 1)[0].toString(16));
		if(off%16==0 && off != 0){
			addr_index+=16;
		 	out.push('\n'+'0x'+addr_index.toString(16)+": ");

		}
	}
	return out.join(' ');
};