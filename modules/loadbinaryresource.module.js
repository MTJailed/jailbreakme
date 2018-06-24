module('verbosity');
function load_binary_resource(url) {
    var req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.overrideMimeType('text\/plain; charset=x-user-defined');
    req.send(null);
    if (req.status != 200) {
        print("Failed to download required resource.");
        stop=1;
    }
    return req.responseText;
}