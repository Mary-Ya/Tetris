
window.onload = function () {
    play();
};

///////-----------------------------------------------------------
//------ARROWS
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        move(-1, 0);
    } else if (event.keyCode == 39) {
        move(1, 0);
    } else if (event.keyCode == 38) {
        turn();
    } else if (event.keyCode == 40) {
        move(0, 1);
    } else if (event.keyCode == 81) {
        fade();
    } else if (event.keyCode == 32) {
        if (pause == false) {
            pause = true;
            fade();
        } else {
            pause = false;
            printArray(mainScene);
        }
    };
    //alert(event); // проверяем код кнопки
});

//--------------------------ARROWS

function printInfo(block, text) {
    var output = document.querySelector(block);
    output.innerHTML = text;
};

function printNextTetro() {
    var names = ["I","T","J","L","O","Z","S"];
    var inThisBar = "";
    if (step < 7) {
    inThisBar = names[tetroBar[step]];
    } else {
        inThisBar = names[nextTetroBar[tetroBar[0]]];
    }
    printInfo("#nextFigure", "Next figure: " + inThisBar);

    var speedToView = 1000 - speed;
    printInfo("#speed", "Speed: " + speedToView);
};



function fade() {
    if (gamover == false) {
    pauseGenerate();
    printArray(pausedScene);
    message("PAUSED");
    console.log("Paused");
    }
}

function message(text) {
    var sceneDiv = document.querySelector("#scene");
    var messageDiv = document.createElement("div");
    messageDiv.className  = "panel message";
    messageDiv.innerHTML = text;
    messageDiv.setAttribute('align', 'center')
    sceneDiv.appendChild(messageDiv);
}