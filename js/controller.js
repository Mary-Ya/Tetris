var Game = function() {
    //var mainScene = generateArray(20, 10);

};

Game.prototype = {
    scores: 0,
    speed: 1000,
    over: true,
    pause: false,


};

Game.prototype.start = function() {
    mainScene = generateArray(20, 10);
    tetroBar = [0, 1, 2, 3, 4, 5, 6];
    nextTetroBar = [0, 1, 2, 3, 4, 5, 6];
    pausedScene = generateArray(20, 10);
    step = 0;


    shuffle(tetroBar);
    shuffle(nextTetroBar);
    coloredArrayGenerate();
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

Game.prototype.play = function() {

    merge();
    printArray(mainScene);

    var timer = setTimeout(function run() {
        if (game.over == false) {
            move(0, 1);
            timer = setTimeout(run, game.speed);
        } else {
            clearTimeout(timer);
        }
    }, game.speed);
}

function move(ofsX, ofsY) {
    if (game.over !== true && game.pause !== true) {
        var nextX = curTetro.X + ofsX;
        var nextY = curTetro.Y + ofsY;

        clean();
        var cantMove = check(nextX, nextY, curTetro.fig);
        merge();
        if (cantMove == false) {
            clean();
            curTetro.X = nextX; // просто меняем координаты
            curTetro.Y = nextY;
            merge();
        } else { // 
            if (ofsY !== 0) { // если движение по Y
                cutLines();
                curTetro = nextTetro();
                //printNextTetro("Next figure: " + curTetro.fig);
                cantMove = check(3, 0, curTetro.fig);
                printArray(mainScene);
                if (cantMove !== false) {
                    game.over = true;
                    console.log("GameOver");
                    coloredArrayGenerate();
                    printArray(pausedScene);
                    message("GAME OVER! PRESS SPACE TO RESTART");
                    printInfo("#header", "Ready to play again?");
                };
            };
        };
    };
};

function merge() {
    for (var i = 0; i < curTetro.fig.length; i++)
        for (var j = 0; j < curTetro.fig[i].length; j++) {
            if (curTetro.fig[i][j] !== 0)
                mainScene[curTetro.Y + i][curTetro.X + j] += curTetro.fig[i][j];
        };
    printArray(mainScene);
};

function clean() {
    for (var i = 0; i < curTetro["fig"].length; i++) {
        for (var j = 0; j < curTetro["fig"][i].length; j++) {
            if (curTetro.fig[i][j] !== 0) {
                mainScene[curTetro.Y + i][curTetro.X + j] = 0;
            }
        }
    };
    printArray(mainScene);
};

function cutLines() {
    var plusSpeed = false;
    var reduceIt = true;
    var linesCount = 0;
    for (var i = 0; i < mainScene.length; i++) {
        //console.log("This line: " + a[i]);
        reduceIt = true;
        for (var j = 0; j < mainScene[i].length; j++) {
            if (mainScene[i][j] == 0) {
                reduceIt = false;
            } else {

            }
        }

        if (reduceIt == true) {
            plusSpeed = true;
            linesCount++
            console.log("This line " + i + " will be reduced");
            game.speed -= 20;

            if (linesCount > 3) {
                game.scores += 1200;
            } else if (linesCount == 3) {
                game.scores += 900;
            } else if (linesCount == 2) {
                game.scores += 400;
            } else if (linesCount == 1) {
                game.scores += 100;
            }

            var text = "Scores: " + game.scores;
            printInfo('#scores', text)
            for (var j = i; j >= 0; j--) {
                mainScene[j] = mainScene[j - 1];
            }
            mainScene[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }
};

function check(nextX, nextY, fig) {
    var X = 0;
    var Y = 0;
    var dontMove = false;
    for (var i = 0; i < fig.length; i++)
        for (var j = 0; j < fig[0].length; j++) {
            if (fig[i][j] !== 0) {
                Y = nextY + i;
                X = nextX + j;
                if (Y < 0 || Y > 19 || X < 0 || X > 10 || mainScene[Y][X] !== 0) {
                    dontMove = true;
                    break;
                };
            };
        };
    return dontMove;
};

function turn() {
    if (game.over !== true) {
        clean();
        var newWidth = curTetro.fig.length;
        var newLength = curTetro.fig[0].length;
        var b = new Array(newLength);
        for (var i = 0; i < newLength; i++) {
            b[i] = new Array(newWidth);
            for (var j = 0; j < newWidth; j++) {
                b[i][j] = 0;
            };
        };
        for (var i = 0; i < newLength; i++)
            for (var j = 0; j < newWidth; j++) {
                b[i][j] = curTetro.fig[newWidth - 1 - j][i];
            };
        var cantMove = check(curTetro.X, curTetro.Y, b)
        if (cantMove == false) {
            curTetro.fig = b;
        };
        merge();
        printArray(mainScene);
    };
};
