var request = new XMLHttpRequest();
request.open('GET', './config.json', true);

var settings = {};

request.onload = function() {
    if (request.status >= 200 && request.status < 300) {
        settings = JSON.parse(request.responseText);
        console.log(settings);
    } else {
        console.log('We reached our target server, but it returned an error');
    }
};



request.onerror = function() {
    // There was a connection error of some sort
};

//request.send();

