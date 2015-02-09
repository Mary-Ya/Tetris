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
        }
        /*else if (event.keyCode == 81) {
            fade(); // Q
        } */
        else if (event.keyCode == 32) {
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
                printInfo("#headerMid", "Try hard!");
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
var help = document.getElementById('help');
var about = document.getElementById('about');
help.onclick = function() {
    printArray(pausedScene);
    message('Arrows or AWSD to move. Q to drop figure. SPACE to pause.')
}
about.onclick = function() {
    printArray(pausedScene);
    message('This is a game like tetris. No one is going to help you.')
}




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

function message(text) {
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

    var speedToView = 1000 - game.speed;
    printInfo("#speed", "Speed: " + speedToView);
    printInfo("#scores", "Score: " + game.scores);
};



function fade() {
    if (game.over == false) {
        coloredArrayGenerate();
        printArray(pausedScene);
        message("PAUSED PRESS SPACE TO CONTINUE");
        console.log("Paused");
    }
}
