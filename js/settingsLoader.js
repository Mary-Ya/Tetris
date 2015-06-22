var request = new XMLHttpRequest();
request.open('GET', './config.json', false);

var settings = {};

request.onload = function() {
    if (request.status >= 200 && request.status < 300) {
        settings = JSON.parse(request.responseText);
        console.log(settings);
    } else {
        console.log('We reached our target server, but it returned an error');
    }
};

request.send();

request.onerror = function() {
    // There was a connection error of some sort
};



/*request.onreadystatechange = function() {
     initialize();
}

var initialize = function () {
	if (request.readyState === 4) {
        game = new Game();
    	display = new Display(game.pausedScene);
    } else {
    	initialize();
    }
}*/