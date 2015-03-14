window.onload = function() {
    round = new Round();
    display = new Display(pausedScene);
};

///////-----------------------------------------------------------
//------ARROWS
document.addEventListener('keydown', function(event) {
    if (round.over == false && round.pause == false) {

        // Arrows 
        if (event.keyCode == 37 || event.keyCode == 65) {
            curTetro.move(-1, 0); // <- / A
        } else if (event.keyCode == 39 || event.keyCode == 68) {
            curTetro.move(1, 0); // -> / D
        } else if (event.keyCode == 38 || event.keyCode == 87) {
            turn(); // up / W
        } else if (event.keyCode == 40 || event.keyCode == 83) {
            curTetro.move(0, 1); // S
        } else if (event.keyCode == 32) {
            if (round.pause == false) {
                round.pause = true;
                fade();
            }
        } // **arrows
        else if (event.keyCode == 81) { //Drop down / Q
            drop();
        }

    } else {
        if (round.over == true) {
            if (event.keyCode == 32) {
                round = new Round();
                round.start();
                round.over = false;
                display.scene(mainScene);
                printInfo("#headerMid", "Try hard!");
                round.play();
            }
        } else if (round.pause == true && event.keyCode == 32) {
            round.pause = false;
            display.scene(mainScene);
        }
    }
    //alert(event.keyCode); // проверяем код кнопки
});
//--------------------------ARROWS
///////-----------------------------------------------------------


///////-----------------------------------------------------------
// -------------------------Menu Buttons
var help = document.getElementById('help');
var about = document.getElementById('about');

help.onclick = function() {
    display.scene(pausedScene);
    display.message('Arrows or AWSD to move. Q to drop figure. SPACE to pause.')
}
about.onclick = function() {
    display.scene(pausedScene);
    display.message('This is a round like tetris. No one is going to help you.')
}
// -------------------------Menu Buttons
///////-----------------------------------------------------------


var Display = function(firstScene) {
    // display appers when window loaded
    // first scene displaying
    this.scene(firstScene); 
    this.message("PRESS SPACE TO START");

};

Display.prototype.scene = function(a) {
    // to output the array
    printNextTetro();
    var output = document.querySelector("#scene");
    output.innerHTML = "";
    //console.log(output);
    for (i = 0; i < 20; i++) 
    {
        var line = document.createElement("div");
        var thisLine = output.appendChild(line);
        for (j = 0; j < 10; j++) 
        {
            var newDiv = document.createElement("div");
            newDiv.className = "pixel";
            if (a[i][j] !== 0) 
            {
                //newDiv.style.backgroundColor = colorList[a[i][j] - 1]; // DON'T WORK IN IE
                newDiv.style.background = colorList[a[i][j] - 1];
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

function printInfo(block, text) {
    var output = document.querySelector(block);
    output.innerHTML = text;
};


function printNextTetro() {
    var names = ["I", "T", "J", "L", "O", "Z", "S"];
    var inThisBar = "";
    if (step < 7) {
        inThisBar = names[tetroBar[step]];
    } else {
        inThisBar = names[nextTetroBar[tetroBar[0]]];
    }
    printInfo("#nextFigure", "Next figure: " + inThisBar);

    var speedToView = 1000 - round.speed;
    printInfo("#speed", "Speed: " + speedToView);
    printInfo("#scores", "Score: " + round.scores);
};



function fade() {
    if (round.over == false) {
        coloredArrayGenerate();
        display.scene(pausedScene);
        display.message("PAUSED PRESS SPACE TO CONTINUE");
        console.log("Paused");
    }
}
