window.onload = function() {
    game = new Game();
    printArray(mainScene);
    message("PRESS SPACE TO START");
};

///////-----------------------------------------------------------
//------ARROWS
document.addEventListener('keydown', function(event) {
    if (game.over == false && game.pause == false) {

        // Arrows 
        if (event.keyCode == 37 || event.keyCode == 65) {
            move(-1, 0); // <- / A
        } else if (event.keyCode == 39 || event.keyCode == 68) {
            move(1, 0); // -> / D
        } else if (event.keyCode == 38 || event.keyCode == 87) {
            turn(); // up / W
        } else if (event.keyCode == 40 || event.keyCode == 83) {
            move(0, 1); // S
        } /*else if (event.keyCode == 81) {
            fade(); // Q
        } */else if (event.keyCode == 32) {
            if (game.pause == false) {
                game.pause = true;
                fade();
            }
        } // **arrows
        else if (event.keyCode == 81) { //Drop down / Q
            drop();
        }

    } else {
        if (game.over == true) {
            if (event.keyCode == 32) {
                game = new Game();
                game.start();
                printArray(mainScene);
                printInfo("#header", "Try hard!");
                game.over = false;
                game.play();
            }
        } else if (game.pause == true && event.keyCode == 32) {
            game.pause = false;
            printArray(mainScene);
        }
    }
    //alert(event.keyCode); // проверяем код кнопки
});

//--------------------------ARROWS

function printArray(a) {
    printNextTetro();
    var output = document.querySelector("#scene");
    output.innerHTML = "";
    //console.log(output);
    for (i = 0; i < 20; i++) {
        var line = document.createElement("div");
        var thisLine = output.appendChild(line);
        for (j = 0; j < 10; j++) {
            var newDiv = document.createElement("div");
            newDiv.className = "pixel";
            if (a[i][j] !== 0) {
                //newDiv.style.backgroundColor = colorList[a[i][j] - 1]; // DON'T WORK IN IE
                newDiv.style.background = colorList[a[i][j] - 1];
            };
            thisLine.appendChild(newDiv);
        };
    };
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

    var speedToView = 1000 - game.speed;
    printInfo("#speed", "Speed: " + speedToView);
    printInfo("#scores", "Scores: " + game.scores);
};



function fade() {
    if (game.over == false) {
        coloredArrayGenerate();
        printArray(pausedScene);
        message("PAUSED PRESS SPACE TO CONTINUE");
        console.log("Paused");
    }
}
