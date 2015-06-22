window.onload = function() {
    game = new Game();
    display = new Display(game.pausedScene);
};

Display = function(firstScene) {
    // display appers when window loaded
    // first scene displaying
    this.scene(firstScene);
    this.message("PRESS SPACE TO START");
    this.colorList = settings.theme;
    /*0 - I - red
      1 - T - light blue
      2 - J - deep blue
      3 - L - green
      4 - O - yellow
      5 - Z - brown
      6 - S - purple
    ];*/
};

Display.prototype.info = function(block, text) {
    var output = document.querySelector(block);
    output.innerHTML = text;
};

Display.prototype.scene = function(sceneToView) {
    
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
                newDiv.style.background = this.colorList[sceneBlocks[i][j] - 1];
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
    inThisBar = names[game.tetroBar[game.step]];
    display.info("#nextFigure", "Next figure: " + inThisBar);
    var speedToView = 1000 - game.speed;
    display.info("#speed", "Speed: " + speedToView);
    display.info("#scores", "Score: " + game.scores);
};

Display.prototype.fade = function(scene) {
    if (game.over == false) {
        scene.colorRandomly();
        display.scene(scene);
        display.message("PAUSED PRESS SPACE TO CONTINUE");
        console.log("Paused");
    };
};
