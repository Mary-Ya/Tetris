window.onload = function() {
    game = new Game();
    display = new Display(game.pausedScene);
};

Display = function(firstScene) {
    // display appers when window loaded
    // first scene displaying
    this.scene(firstScene);
    this.message("PRESS SPACE TO START");
};

Display.prototype.info = function(block, text) {
    var output = document.querySelector(block);
    output.innerHTML = text;
};

/*Display.prototype.arrayOn = function(array, place) {
    var colorList = [
        ['#B70F0A'],
        ['#1882D9'],
        ['#2E1572'],
        ['#4C7A34'],
        ['#D96D0D'],
        ['#4D3541'],
        ['#631878'],
    ];
    var sceneBlocks = array;
    var output = document.querySelector(place);
    output.innerHTML = "";
    sceneBlocks.forEach(function(innerArray, index, array) {
        var line = document.createElement("div");
        var thisLine = output.appendChild(line);
        innerArray.forEach(function(cell, innerIndex, innerArray) {
            var newDiv = document.createElement("div");
            newDiv.className = "pixel";
            if (cell !== 0) {
                //newDiv.style.backgroundColor = colorList[a[i][j] - 1]; // DON'T WORK IN IE
                newDiv.style.background = colorList[cell - 1];
            };
            thisLine.appendChild(newDiv);
        });

    });
    for (i = 0; i < 20; i++) {
        var line = document.createElement("div");
        var thisLine = output.appendChild(line);
        for (j = 0; j < 10; j++) {
            var newDiv = document.createElement("div");
            newDiv.className = "pixel";
            if (sceneBlocks[i][j] !== 0) {
                //newDiv.style.backgroundColor = colorList[a[i][j] - 1]; // DON'T WORK IN IE
                newDiv.style.background = colorList[sceneBlocks[i][j] - 1];
            };
            thisLine.appendChild(newDiv);
        };
    };
};*/

Display.prototype.scene = function(sceneToView) {
    var colorList = [
        ['#B70F0A'],
        ['#1882D9'],
        ['#2E1572'],
        ['#4C7A34'],
        ['#D96D0D'],
        ['#4D3541'],
        ['#631878'],
    ];
    // to output the array
    //this.arrayOn(sceneToView,"#scene");
    var sceneBlocks = sceneToView.get();
    var output = document.querySelector("#scene");
    output.innerHTML = "";
    //console.log(output);
    for (i = 0; i < 20; i++) {
        var line = document.createElement("div");
        var thisLine = output.appendChild(line);
        for (j = 0; j < 10; j++) {
            var newDiv = document.createElement("div");
            newDiv.className = "pixel";
            if (sceneBlocks[i][j] !== 0) {
                //newDiv.style.backgroundColor = colorList[a[i][j] - 1]; // DON'T WORK IN IE
                newDiv.style.background = colorList[sceneBlocks[i][j] - 1];
            };
            thisLine.appendChild(newDiv);
        };
    };
};

Display.prototype.message = function(text) {
    var sceneDiv = document.querySelector("#scene");
    var messageDiv = document.createElement("div");
    messageDiv.className = "panel message";
    messageDiv.innerHTML = text;
    messageDiv.setAttribute('align', 'center');
    sceneDiv.appendChild(messageDiv);
};

Display.prototype.nextTetro = function() {
    var names = ["I", "T", "J", "L", "O", "Z", "S"];
    var inThisBar = "";
    /*if (game.step < 7) {
        inThisBar = names[game.tetroBar[game.step]];
    } else {
        inThisBar = names[game.nextTetroBar[game.tetroBar[0]]];
    };*/
    inThisBar = names[game.tetroBar[game.step]];
    display.info("#nextFigure", "Next figure: " + inThisBar);
    var speedToView = 1000 - game.speed;
    display.info("#speed", "Speed: " + speedToView);
    display.info("#scores", "Score: " + game.scores);
    //display.arrayOn(game.curTetro.fig, "#nextTetromino")
};

Display.prototype.fade = function(scene) {
    if (game.over == false) {
        scene.colorRandomly();
        display.scene(scene);
        display.message("PAUSED PRESS SPACE TO CONTINUE");
        console.log("Paused");
    };
};
