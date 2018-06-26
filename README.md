# Jailbreak Me 13.37
A webbased jailbreak solution unifying existing jailbreak me solutions and new ones.

Created by Sem Voigtländer

## Rules
- Please respect the work of all developers who have made this possible
- Please pay attention to the license in this repository
- Do not in any form use the code in this repository for malware or data exfiltration.
- When using the logic or code used in this repository all developers should be accredited as mentioned in the credits.
- Jailbreaking with this is fun but be aware of the security risks of not updating your main device, anyone can use these bugs to spy or harm your device.

## Support

- 8.4.1 & 9.3 up to 9.3.3 & 11.3.1 (64-bit)
- 3.1.2 up to 4.0.1 & 8.4.1 and 9.1 up to 9.3.4 (32-bit)

### 64-bit devices
#### 11.3.1: iPhone 8, 8+, X (more to come)
This uses Ian Beer's empty_list as a payload.
You can read about this exploit here: https://github.com/MTJailed/jailbreakme/blob/master/DOCS/Emptylist-11.3.1-Writeup.md

#### 9.3 - 9.3.x: All devices (Thanks to Luca Todesco)
This uses Pangu NvWaStone as a payload and has been written by Luca Todesco (@qwertyoruiopz).

Nvwastone slides by Pangu: https://www.blackhat.com/docs/us-16/materials/us-16-Wang-Pangu-9-Internals.pdf

Extended writeup about nvwastone by Jonathan Levin: http://newosxbook.com/articles/nuwashi.pdf

Simple writeup about nvwastone by Nettitude Labs: https://labs.nettitude.com/blog/what-is-the-jailbreak-for-ios-9-3-3-actually-doing-part-1/

#### 8.4.1 (soon)
This will use the work of Tihmstar and use EtaSon?? as a payload.

### 32-bit new devices
~~10.3.3: Coming in the far future~~ *(Can't make promises)*

~~9.3.5: Coming in the far future~~ *(Can't make promises)*

#### 9.1 - 9.3.4: All devices (Thanks to Tihmstar)
This uses HomeDepot as a payload. The webkit exploit has been written by Tihmstar.

Vulnerabilites used in this jailbreak also go under the name Pegasus.

Homedepot on the iPhone wiki: https://www.theiphonewiki.com/wiki/Home_Depot

#### 8.4.1: (soon)
This will use the work of Tihmstar and use EtaSon?? as a payload.

#### 7.1 - 7.1.2: (Soon)
Neat vulnerability in CoreGraphics at the time can gain arbitrary code execution.

Might need manual patching of the dyld_shared_cache for newer devices.

At this time the exploit is just a demo of gaining code execution, any contributions are welcome.

Will use the evasi0n jailbreak.

Talk about evasi0n at 34C3 by Arg: https://mirror.netcologne.de/CCC//congress/2017/h264-hd/34c3-8720-eng-iOS_kernel_exploitation_archaeology.mp4

Writeup: http://www.binamuse.com/papers/CoreGraphicsInformationLeakReport.pdf

Poc: https://github.com/feliam/CVE-2014-4378 by @feliam

### 32-bit ancient devices (Thanks to Comex)

How to compile: https://mirrors.sipsik.net/domonkos.tomcsanyi.net/index.html%3Fp=329.html

#### 4.3.3: iPad 1, iPad 2, iPhone 3GS, iPhone 4 GSM, iPod 3rd gen, iPod 4th gen

#### 4.3.2: iPad 1, iPhone 3GS, iPhone 4 GSM, iPod 3rd gen, iPod 4th gen

#### 4.3: iPad 1, iPhone 3GS, iPhone 4 GSM, iPod 3rd gen, iPod 4th gen

#### 4.2.8: iPhone 4 CDMA

#### 4.2.7: iPhone 4 CDMA

#### 4.2.6: iPhone 4 CDMA


## Credits
- Niklas B
- Tihmstar
- Luca Todesco
- Comex
- PanguTeam
- Ian Beer
- Jonathan Levin (For the jailbreak toolkit)
- Sem Voigtländer (just a techie)
