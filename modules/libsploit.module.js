var LIBSPLOIT = true;
include('liblogging');
include('libdetect');
include('libsploit.strategy');
var waitForImg = setInterval(function(){
	if(!console.image) return;
	if(!window.LIBSPLOIT.initialized) {
		console.image('https://media1.tenor.com/images/13af6f66adb46451f8d28bc93e689ac9/tenor.gif?itemid=8722287',0.5);
		window.LIBSPLOIT.initialized = true;
		console.log('%c'+'[LIBSPLOIT][Init]: Thanks for using the browser exploitation library.', 'background: black; color: lime;');
		clearInterval(waitForImg);
	}
}, 0.01);