window.onload = function() {
    round = new Round();
    display = new Display(round.pausedScene);
};

///////-----------------------------------------------------------
//------ARROWS
document.addEventListener('keydown', function(event) {
    if (round.over == false && round.pause == false) {
        switch (event.keyCode) {
            case 37: // <- / Left arrow
            case 65: // <- / A
                round.curTetro.move(round.mainScene, -1, 0);
                break;
            case 39: // -> / Right arrow
            case 68: // -> / D
                round.curTetro.move(round.mainScene, 1, 0);
                break;
            case 38: // ^ / Up arrow 
            case 87: // ^ / W
                round.curTetro.turnOn();
                break;
            case 40: // v / Down arrow
            case 83: // v / S
                round.curTetro.move(round.mainScene, 0, 1);
                break;
            case 32: //Spacebar 
                if (round.pause == false) {
                    round.pause = true;
                    display.fade(round.pausedScene);
                }
                break;
            case 81: // Q
                round.curTetro.dropOn(round.mainScene);
                break;
            default:
                console.log("No actions on button " + event.keyCode)
                break;
        };
    } else {
        if (round.over == true) {
            // if previous round overed
            if (event.keyCode == 32) {
                //starting new round
                round = new Round();
                round.start();
                // output array and information
                display.scene(round.mainScene);
                display.info("#headerMid", "Try hard!");
            }
        } else if (round.pause == true && event.keyCode == 32) {
            round.pause = false;
            display.scene(round.mainScene);
        };
    };
    //alert(event.keyCode); // check pressed button keyCode
});
//--------------------------ARROWS
///////-----------------------------------------------------------


///////-----------------------------------------------------------
// -------------------------Menu Buttons
var help = document.getElementById('help');
var about = document.getElementById('about');

help.onclick = function() {
    display.scene(round.pausedScene);
    display.message('Arrows or AWSD to move. Q to drop figure. SPACE to pause.')
}
about.onclick = function() {
    display.scene(round.pausedScene);
    display.message('This is a round like tetris. No one is going to help you.')
}
// -------------------------Menu Buttons
///////-----------------------------------------------------------


Display = function(firstScene) {
    // display appers when window loaded
    // first scene displaying
    this.scene(firstScene);
    this.message("PRESS SPACE TO START");

};

Display.prototype.scene = function(sceneToView) {
    // to output the array
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

Display.prototype.info = function (block, text) {
    var output = document.querySelector(block);
    output.innerHTML = text;
};


Display.prototype.nextTetro = function () {
    var names = ["I", "T", "J", "L", "O", "Z", "S"];
    var inThisBar = "";
    if (round.step < 7) {
        inThisBar = names[tetroBar[round.step]];
    } else {
        inThisBar = names[nextTetroBar[tetroBar[0]]];
    }
    display.info("#nextFigure", "Next figure: " + inThisBar);
    var speedToView = 1000 - round.speed;
    display.info("#speed", "Speed: " + speedToView);
    display.info("#scores", "Score: " + round.scores);
};

Display.prototype.fade = function(scene) {

    if (round.over == false) {
        scene.colorRandomly();
        display.scene(scene);
        display.message("PAUSED PRESS SPACE TO CONTINUE");
        console.log("Paused");
    };
};
