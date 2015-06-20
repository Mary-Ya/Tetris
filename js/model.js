/*var request = new XMLHttpRequest();
request.open('GET', './config.json', true);

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        settings = JSON.parse(request.responseText);
        console.log(settings);
        tetroBar = settings.defoultTetroBar;
        nextTetroBar = settings.defoultTetroBar;
    } else {
        alert('We reached our target server, but it returned an error')
    }
};

request.onerror = function() {
    // There was a connection error of some sort
};

request.send();*/



var tetroBar = [0, 1, 2, 3, 4, 5, 6];
var nextTetroBar = [0, 1, 2, 3, 4, 5, 6];

//var step = 0;
shuffle(tetroBar);
shuffle(nextTetroBar);


var Tetromino = function() {
    this.newTetromino();
};

Tetromino.prototype.move = function(onScene, ofsX, ofsY) {
    if (round.over !== true && round.pause !== true) {
        var nextX = this.X + ofsX;
        var nextY = this.Y + ofsY;
        onScene.deleteTetro(this);
        var cantMove = onScene.check(nextX, nextY, this.fig);
        onScene.mergeWith(this);
        if (cantMove == false) {
            onScene.deleteTetro(this);
            this.X = nextX; // просто меняем координаты
            this.Y = nextY;
            onScene.mergeWith(this);
        } else { // 
            if (ofsY !== 0) { // если движение по Y
                onScene.cutLines();
                round.curTetro = new Tetromino();
                display.info("#nextFigure", "Next figure: " + round.curTetro.fig);
                cantMove = onScene.check(3, 0, this.fig);
                display.scene(onScene);
                if (cantMove !== false) {
                    round.over = true;
                    console.log("GameOver");
                    round.pausedScene.colorRandomly();
                    display.scene(round.pausedScene);
                    display.message("GAME OVER! PRESS SPACE TO RESTART");
                    display.info("#headerMid", "Ready to play again?");
                };
            };
        };
    };
};

Tetromino.prototype.dropOn = function(scene) {
    var curStep = round.step;
    while (curStep === round.step) {
        this.move(scene, 0, 1);
    };
};

Tetromino.prototype.turnOn = function() {
    if (round.over !== true) {
        round.mainScene.deleteTetro(this);
        var newWidth = this.fig.length;
        var newLength = this.fig[0].length;
        var b = new Array(newLength);
        for (var i = 0; i < newLength; i++) {
            b[i] = new Array(newWidth);
            for (var j = 0; j < newWidth; j++) {
                b[i][j] = 0;
            };
        };
        for (var i = 0; i < newLength; i++)
            for (var j = 0; j < newWidth; j++) {
                b[i][j] = this.fig[newWidth - 1 - j][i];
            };
        var cantMove = round.mainScene.check(this.X, this.Y, b)
        if (cantMove == false) {
            this.fig = b;
        };
        round.mainScene.mergeWith(this);
        display.scene(round.mainScene);
    };
};

Tetromino.prototype.newTetromino = function() {
    var superList = [
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ], //I
        [
            [0, 2, 0],
            [2, 2, 2],
            [0, 0, 0]
        ], //T
        [
            [3, 0, 0],
            [3, 3, 3]
        ], //J
        [
            [0, 0, 4],
            [4, 4, 4]
        ], //L
        [
            [5, 5],
            [5, 5]
        ], //O
        [
            [6, 6, 0],
            [0, 6, 6]
        ], //Z
        [
            [0, 7, 7],
            [7, 7, 0]
        ] //S
    ];
    this.fig = superList[0];
    this.X = 3;
    this.Y = 0;
    if (round.step < 7) {
        this.fig = superList[tetroBar[round.step]];
        round.step++;
        console.log("next");
        if (round.step == 6) {
            round.step = 0;
            tetroBar = nextTetroBar;
            shuffle(nextTetroBar);
            console.log(tetroBar);
        };
    };
};

var colorList = [
    ['#B70F0A'],
    ['#1882D9'],
    ['#2E1572'],
    ['#4C7A34'],
    ['#D96D0D'],
    ['#4D3541'],
    ['#631878'],
];



function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function Scene(h, w) {
    this.blocks = [];
    this.makeNew(h, w);
};

/*function generateArray(h, w) {
    var a = new Array(20);
    for (var i = 0; i < 20; i++) {
        a[i] = new Array(10);
        for (var j = 0; j < 10; j++) {
            a[i][j] = 0;
        }
    };
    return a;
};*/

Scene.prototype.makeNew = function(h, w) {
    this.blocks = new Array(h);
    for (var i = 0; i < h; i++) {
        this.blocks[i] = new Array(w);
        for (var j = 0; j < w; j++) {
            this.blocks[i][j] = 0;
        };
    };
    console.log(" makeNew call");
};

Scene.prototype.set = function(val) {
    this.blocks = val;
    display.scene(this);
    console.log("scene.set call");
};

Scene.prototype.get = function() {
    return this.blocks;
};


Scene.prototype.mergeWith = function(tetromino) {
    for (var i = 0; i < tetromino.fig.length; i++)
        for (var j = 0; j < tetromino.fig[i].length; j++) {
            if (tetromino.fig[i][j] !== 0) {
                var newScene = this.get();
                newScene[tetromino.Y + i][tetromino.X + j] += tetromino.fig[i][j];
                this.set(newScene);
            }
        };
};

Scene.prototype.deleteTetro = function(tetromino) {
    for (var i = 0; i < tetromino["fig"].length; i++) {
        for (var j = 0; j < tetromino["fig"][i].length; j++) {
            if (tetromino.fig[i][j] !== 0) {
                var newScene = this.get();
                newScene[tetromino.Y + i][tetromino.X + j] = 0;
                this.set(newScene);
            };
        };
    };
};

Scene.prototype.check = function(nextX, nextY, fig) {
    var X = 0;
    var Y = 0;
    var dontMove = false;
    for (var i = 0; i < fig.length; i++)
        for (var j = 0; j < fig[0].length; j++) {
            if (fig[i][j] !== 0) {
                Y = nextY + i;
                X = nextX + j;
                if (Y < 0 || Y > 19 || X < 0 || X > 10 || this.blocks[Y][X] !== 0) {
                    dontMove = true;
                    break;
                };
            };
        };
    return dontMove;
};

Scene.prototype.cutLines = function() {
    var plusSpeed = false;
    var reduceIt = true;
    var linesCount = 0;
    for (var i = 0; i < this.blocks.length; i++) {
        //console.log("This line: " + a[i]);
        reduceIt = true;
        for (var j = 0; j < this.blocks[i].length; j++) {
            if (this.blocks[i][j] == 0) {
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
            display.info('#scores', text);
            
            for (var j = i; j >= 0; j--) {
                this.blocks[j] = this.blocks[j - 1];
            }
            this.blocks[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }
};

Scene.prototype.colorRandomly = function() {
    var color = Math.floor(Math.random() * 7);
    var sceneBlocks = this.blocks;
    for (var i = 0; i < 20; i++)
        for (var j = 0; j < 10; j++) {
            sceneBlocks[i][j] = color;
        };
    this.blocks = sceneBlocks;
};