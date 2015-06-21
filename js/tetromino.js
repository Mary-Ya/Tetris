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
        } else { // если препятствия
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
            [1, 1, 1, 1]
        ], //I
        [
            [0, 2, 0],
            [2, 2, 2]
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
        this.fig = superList[round.tetroBar[round.step]];
        round.step++;
        console.log("next");
        if (round.step == 6) {
            round.step = 0;
            round.tetroBar = round.nextTetroBar;
            round.shuffle(round.nextTetroBar);
            console.log(round.tetroBar);
        };
    };
};

