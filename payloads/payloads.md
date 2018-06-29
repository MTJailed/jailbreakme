# Payloads
Payloads are files for bootstrapping the post-exploitation stage or next-level stages of the exploit such as shellcode.

## iOS 11.X up to 11.3.1

The payload used here is empty_list by Ian Beer from Google Project zero.

It is an overflow in the virtual filesystems structures of the iOS kernel.

However it looks like some bytes are controllable, Beer chose to exploit it as if it was a null-dereference.

This decreases the reliability of the exploit with 50%, which means until a developer rewrites our improves the exploit this stage may take multiple tries.

## iOS 9.1 up to 9.3.4 32-bit

The payload consits of a full jailbreak that goes under the name of HomeDepot.

The Cydia Package Manager and required binaries are bootstrapped onto the device upon post-exploitation.

##  Ancient Payloads

The payloads used here are from the original jailbreakme and should bootstrap a full jailbreak with the Cydia packagemanager installed.

## Custom Payloads

I allow people to write custom payloads and add them to my site but they will need to share the source code with me and I will have to approve the requests manually.
