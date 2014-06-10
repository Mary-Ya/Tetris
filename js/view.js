var gamover = false;

window.onload = function () {
    //printInfo('Game Loaded');
    //console.log('Game is on');
   /* while (gamover = false) {
        gamover = true;
    };*/
    play();
    //console.log('Game over');
};

///////-----------------------------------------------------------
//------ARROWS
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        //printInfo('Left was pressed. go' + curTetro.X);
        move(-1, 0);
    } else if (event.keyCode == 39) {
        //printInfo('Right was pressed. go' + curTetro.X);
        move(1, 0);
    } else if (event.keyCode == 38) {
        //printInfo('Up was pressed');
        turn();
    } else if (event.keyCode == 40) {
        //printInfo('Down was pressed. go' + curTetro.Y);
        move(0, 1);
    }
});
//--------------------------ARROWS

function printInfo(block, text) {
    var output = document.querySelector(block);
    output.innerHTML = text;
};

function printNextTetro(number) {
    var names = [I,T,J,L,O,Z,S];
    var inThisBar = [];
    for (var i = 0; i < 7; i++) {
        inThisBar[i] = names[number[i]];
    };
    printInfo("#nextFigure", inThisBar);
};

function printArray(a) {
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
            }
            line.appendChild(div);
        }
    }
}