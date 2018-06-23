# A kernel exploit for iOS up to 11.3.1
## By Ian Beer (Writeup modified by Sem Voigtländer)


### The Bug
getvolattrlist takes a user controlled bufferSize argument via the fgetattrlist syscall.

*When allocating a kernel buffer to serialize the attr list to there's the following comment:*

```C
/*
* Allocate a target buffer for attribute results.
* Note that since we won't ever copy out more than the caller requested,
* we never need to allocate more than they offer.
*/
  ab.allocated = ulmin(bufferSize, fixedsize + varsize);
  if (ab.allocated > ATTR_MAX_BUFFER) {
    error = ENOMEM;
   VFS_DEBUG(ctx, vp, "ATTRLIST - ERROR: buffer size too large (%d limit %d)", ab.allocated, ATTR_MAX_BUFFER);
    goto out;
  }
  MALLOC(ab.base, char *, ab.allocated, M_TEMP, M_ZERO | M_WAITOK);
```

*The problem is that the code doesn't then correctly handle the case when the user supplied buffer size*
*is smaller that the requested header size. If we pass ATTR_CMN_RETURNED_ATTRS we'll hit the following code:*

```C
  /* Return attribute set output if requested. */
  if (return_valid) {
    ab.actual.commonattr |= ATTR_CMN_RETURNED_ATTRS;
    if (pack_invalid) {
      /* Only report the attributes that are valid */
      ab.actual.commonattr &= ab.valid.commonattr;
      ab.actual.volattr &= ab.valid.volattr;
    }
    bcopy(&ab.actual, ab.base + sizeof(uint32_t), sizeof (ab.actual));
  }
```

There's no check that the allocated buffer is big enough to hold at least that.

### Exploitation
Ian Beer will is planning to publish a longer-form write up of this in the future but for now he explained the following about how his exploit works:

The bug makes it possible to write 8 zero bytes off the end of a kalloc.16 allocation.

Whilst it looks like the possibility exists to be able to control a few bits in those bytes, Beer is still unconfident about it.

Therefore Ian Beer has chosen to exploit it as if it was writing a NULL pointer off the end.

As this is a very limited primitive there are some possible exploitation methods as following:

- target a reference count, trying to turn the overflow into a UaF bug
- target a lock, trying to turn the overflow into a race condition bug
- target a pointer, trying to leak a reference count
- target a validated datastructure where 0 is an interesting value to change something to

Beer chose the first option. 

This method comes with two further requirements:
- target needs a reference count in the first 8 bytes
- target has to be overflowable into from kalloc.16

Therefore Beer then chose to target struct ipc_port.

This struct has a reference count field as its second dword thus fulfilling the first requirement.

It is however not allocated in kalloc.16; instead it lives in its own zone (ipc_ports.)

For exploitation this means having to align a kalloc.16 zone block just before an ipc_ports one, then overflow out of the
last kalloc.16 allocation in the kalloc.16 block into the first on in ipc_ports.

Two tricks can make this easier:
- freelist reversal
- safely-overflowable allocations

#### Freelist Reversal
zone allocations will come first from intermediate (partially full) pages.

This means that when freeíng and allocating k.16 objects somewhere in the middle of the groom they won't be re-used until
the current intermediate page is either full or empty.

This can be challenging  because fresh page's freelist's are filled semi-randomly such that their allocations will go from the inside to the outside:

 | 9 8 6 5 2 1 3 4 7 10 | <-- example "randomized" allocation order from a fresh all-free page

Meaning that the final intermediate k.16 and ports pages will look a bit like this:

| - - - 5 2 1 3 4 - - | - - - 4 1 2 3 5 - - |
        kalloc.16             ipc_ports

If the overflow is used to corrupt a freelist entry the kernel will panic if it gets allocated, this should be avoided.

The trick is that by controlling the allocation and free order thefreelists can be reversed such that the final intermediate pages will look more like this:

| 1 4 - - - - - 5 3 2 | 2 5 - - - - - 4 3 1 |
      kalloc.16               ipc_ports

At this point it is much more likely to be able  to free a kalloc.16 and realloc it for the overflow such that the first qword of an ipc_port can be hit.

### Safely-Overflowable allocations
Since there are likely to be many candidate allocations it is needed to overflow out of before the first target is hit (which is right at the end, just before the ipc_port) in order to make sure that the allocated objects on the kalloc.16 page are safe to corrupt with a NULL pointer.

Beer used mach message ool_port descriptors for this, as NULL is a valid value.

### Exploit Flow

First the groom is done to reverse the kalloc.16 freelists and start trying to overflow into an ipc_port.

The approximate range of mach port names is which contain the to-be-corrupted port is known so after each overflow attempt the exploit checks each of these ports to see if the port was corrupted.

A side-effect of successful corruption is that the port's io_active flag will be set to zero.

This can be detected without causing side-effects using the mach_port_kobject MIG method.

Once the corrupted port is found, a reference should be caused to be taken and dropped on it; 

More important is that the code path is needed which does this to not check the io_active flag. 

mach_port_set_attributes provides this functionality.

Now the NULL pointer is turned to write off the end of a kalloc.16 into a dangling mach port :)

A zone garbage collector is then caused, aiming to get the port's memory reused as a kalloc.4096 page.

Next the exploit should get it reused as a ool_ports descriptor where the ip_context field overlaps with a send right that is send to a canary port. 

This provides information about the approximate address of our objects in the kernel.

The exploit replaces the ool_desc with a pipe buffer and with a bit of fiddling it is possible to find out where the dangling mach port is in memory.

A fake kernel taskport is created in there and then the exploit cleans up the mess it left behind.


### Reliability

The exploit is functional which was Ian's goal, however the exploit is around 30% reliable at the time it was released.

It all relies on how quickly the inital overflow and test loop are done.

If something else comes in and allocates or frees in kalloc.16 the probability increasesthat a freelsit enry or something else gets corrupted, causing a kernel panic.

The exploit can be improved to be more reliable and Ian only demonstrated the exploitability of this bug.

Success rates seem to be highest when the device has been rebooted and left idle for a bit.

### Cleanup
If the exploit does work it should clean up after itself and not panic the device. 

The fake kernel task port will stay alive.

Use the functions in kmem.h to read and write kernel memory. 

Persist a send-right to tfp0 in there if you want to keep kernel memory access after this process exits.

The exploit should work on iOS 11 through iOS 11.3.1 for all devices (iPad / iPhone).
