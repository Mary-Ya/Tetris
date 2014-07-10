
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

function printArray(a) {
    printNextTetro();
    var output = document.querySelector("#scene");
    output.innerHTML = "";
    //console.log(output);
    for (i = 0; i < 20; i++) {
        var line = document.createElement("div");
        output.appendChild(line);
        for (j = 0; j < 10; j++) {
            var div = document.createElement("div");
            div.className = "pixel";
            if (a[i][j] == 0) {
            } else {
                div.style.backgroundColor = colorList[a[i][j]-1];
                div.style.backgroundColor = colorList[a[i][j]-1];
            };
            line.appendChild(div);
        }
    }
};

function fade() {
    printArray(pausedScene);
    var sceneDiv = document.querySelector("#scene");
    var pausedDiv = document.createElement("div");
    pausedDiv.className  = "panel paused";
    pausedDiv.innerHTML = "PAUSED";
    pausedDiv.setAttribute('align', 'center')
    sceneDiv.appendChild(pausedDiv);

}