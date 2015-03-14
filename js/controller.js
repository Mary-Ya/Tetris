var Round = function() {
    // new round started
    this.scores = 0;
    this.speed = 1000;
    this.over = true;
    this.pause = false;

};

Round.prototype = {

};

Round.prototype.start = function() {
    mainScene = generateArray(20, 10);
    tetroBar = [0, 1, 2, 3, 4, 5, 6];
    nextTetroBar = [0, 1, 2, 3, 4, 5, 6];
    pausedScene = generateArray(20, 10);
    step = 0;
    shuffle(tetroBar);
    shuffle(nextTetroBar);
    coloredArrayGenerate();
};

Round.prototype.play = function() {

    merge();
    display.scene(mainScene);

    var timer = setTimeout(function run() {
        if (round.over == false) {
            move(0, 1);
            timer = setTimeout(run, round.speed);
        } else {
            clearTimeout(timer);
        }
    }, round.speed);

}

/*Tetromino.prototype.move(direction) {
    switch (direction) {
        case value1:
            break;
        default:
            //Statements executed when none of the values match the value of the expression
            [
                break;
            ]
    }
};*/

function move(ofsX, ofsY) {
    if (round.over !== true && round.pause !== true) {
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
                curTetro = new Tetromino();
                //printNextTetro("Next figure: " + curTetro.fig);
                cantMove = check(3, 0, curTetro.fig);
                display.scene(mainScene);
                if (cantMove !== false) {
                    round.over = true;
                    console.log("GameOver");
                    coloredArrayGenerate();
                    display.scene(pausedScene);
                    display.message("GAME OVER! PRESS SPACE TO RESTART");
                    printInfo("#headerMid", "Ready to play again?");

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
    display.scene(mainScene);
};

function clean() {
    for (var i = 0; i < curTetro["fig"].length; i++) {
        for (var j = 0; j < curTetro["fig"][i].length; j++) {
            if (curTetro.fig[i][j] !== 0) {
                mainScene[curTetro.Y + i][curTetro.X + j] = 0;
            }
        }
    };
    display.scene(mainScene);
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
            round.speed -= 20;

            if (linesCount > 3) {
                round.scores += 1200;
            } else if (linesCount == 3) {
                round.scores += 900;
            } else if (linesCount == 2) {
                round.scores += 400;
            } else if (linesCount == 1) {
                round.scores += 100;
            }

            var text = "Scores: " + round.scores;
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
    if (round.over !== true) {
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
        display.scene(mainScene);
    };
};

function drop() {
    var thisTetro = curTetro.fig;
    while (thisTetro == curTetro.fig) {
        move(0, 1);
    }
};
