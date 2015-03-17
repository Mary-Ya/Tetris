function Round() {
    // new round started
    this.scores = 0;
    this.speed = 1000;
    this.over = true;
    this.pause = false;
};

/*Round.prototype = function() {
    this.start();
};*/

Round.prototype.start = function() {
    //generateArray(20, 10);
    tetroBar = [0, 1, 2, 3, 4, 5, 6];
    nextTetroBar = [0, 1, 2, 3, 4, 5, 6];
    pausedScene = generateArray(20, 10);
    step = 0;
    this.over = false;
    this.play();
    shuffle(tetroBar);
    shuffle(nextTetroBar);
    coloredArrayGenerate();
    //mainScene.makeNew(20, 10);
    
};

Round.prototype.play = function() {
    merge();
    display.scene(mainScene.blocks);
    var timer = setTimeout(function run() {
        if (round.over == false) {
            curTetro.move(0, 1);
            timer = setTimeout(run, round.speed);
        } else {
            clearTimeout(timer);
        };
    }, round.speed);
};



Tetromino.prototype.move = function(ofsX, ofsY) {
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
                //display.info("Next figure: " + curTetro.fig);
                cantMove = check(3, 0, curTetro.fig);
                display.scene(mainScene.blocks);
                if (cantMove !== false) {
                    round.over = true;
                    console.log("GameOver");
                    coloredArrayGenerate();
                    display.scene(pausedScene);
                    display.message("GAME OVER! PRESS SPACE TO RESTART");
                    display.info("#headerMid", "Ready to play again?");
                };
            };
        };
    };
};

function merge() {
    for (var i = 0; i < curTetro.fig.length; i++)
        for (var j = 0; j < curTetro.fig[i].length; j++) {
            if (curTetro.fig[i][j] !== 0)
                round.mainScene.blocks[curTetro.Y + i][curTetro.X + j] += curTetro.fig[i][j];
        };
    display.scene(mainScene.blocks);
};

function clean() {
    for (var i = 0; i < curTetro["fig"].length; i++) {
        for (var j = 0; j < curTetro["fig"][i].length; j++) {
            if (curTetro.fig[i][j] !== 0) {
                mainScene.blocks[curTetro.Y + i][curTetro.X + j] = 0;
            }
        }
    };
    display.scene(mainScene.blocks);
};

function cutLines() {
    var plusSpeed = false;
    var reduceIt = true;
    var linesCount = 0;
    for (var i = 0; i < mainScene.blocks.length; i++) {
        //console.log("This line: " + a[i]);
        reduceIt = true;
        for (var j = 0; j < mainScene.blocks[i].length; j++) {
            if (mainScene.blocks[i][j] == 0) {
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
            display.info('#scores', text)
            for (var j = i; j >= 0; j--) {
                mainScene.blocks[j] = mainScene.blocks[j - 1];
            }
            mainScene.blocks[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
                if (Y < 0 || Y > 19 || X < 0 || X > 10 || mainScene.blocks[Y][X] !== 0) {
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
        display.scene(mainScene.blocks);
    };
};

function drop() {
    var thisTetro = curTetro.fig;
    while (thisTetro == curTetro.fig) {
        curTetro.move(0, 1);
    }
};

function Scene (h, w) {
    this.blocks = this.makeNew(h, w);
};

Scene.prototype.makeNew = function(h, w) {
    this.blocks = new Array(h);
    for (var i = 0; i < h; i++) {
        this.blocks[i] = new Array(w);
        for (var j = 0; j < w; j++) {
            this.blocks[i][j] = 0;
        };
    };
};

Scene.prototype.set = function(val) {
    this.blocks = val;
    display.scene(val);
};


mainScene = new Scene(20,10);