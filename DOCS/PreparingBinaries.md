# Preparing Binaries
At this time the exploit will attempt to run ssh and bootstrap the rootless jailbreak from /var/mobile/Media/webkit

Therefore you need to prepare the following resources

##  Preparation
1. Take any AFCClient (iFunBox, 3utools, ifuse, etc.)

2. Extract bootstrap.zip on your computer and move the extracted webkit folder into /var/mobile/Media using the AFCClient

3. You are done now and SSH should be started on successful exploitation.

## RootFS Remount
This exploit aims to not mess with anything on the rootfilesystem as long as it is not bootstrapping electra yet.

This is to prevent bugs if occuring from damaging your system or interferring with an existing jailbreak.

## NVRAM unlock
The exploit unlocks the NVRAM which allows writing to and reading from it to for example set a nonce.
