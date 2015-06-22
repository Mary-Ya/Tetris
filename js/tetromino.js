var Tetromino = function() {
    this.newTetromino();
};

Tetromino.prototype.move = function(onScene, ofsX, ofsY) {
    if (game.over !== true && game.pause !== true) {
        var nextX = this.X + ofsX;
        var nextY = this.Y + ofsY;
        onScene.deleteTetro(this);
        var cantMove = onScene.check(nextX, nextY, this.fig);
        onScene.mergeWith(this);
        if (cantMove == false) { 
            onScene.deleteTetro(this);
            this.X = nextX;
            this.Y = nextY;
            onScene.mergeWith(this);
        } else { // если препятствия
            if (ofsY !== 0) { // если движение по Y
                onScene.cutLines();
                game.curTetro = new Tetromino();
                //display.info("#nextFigure", "Next figure: " + game.curTetro.fig);
                cantMove = onScene.check(3, 0, this.fig);
                game.curTetro.X = 3; 
                game.curTetro.Y = 0;
                onScene.mergeWith(game.curTetro);
                display.scene(onScene);
                if (cantMove !== false) {
                    game.over = true;
                    console.log("GameOver");
                    game.pausedScene.colorRandomly();
                    display.scene(game.pausedScene);
                    display.message("GAME OVER! PRESS SPACE TO RESTART");
                    display.info("#headerMid", "Ready to play again?");
                };
            };
        };
    };
};

Tetromino.prototype.dropOn = function(scene) {
    var curStep = game.step;
    while (curStep === game.step) {
        this.move(scene, 0, 1);
    };
};

Tetromino.prototype.turnOn = function() {
    if (game.over !== true) {
        game.mainScene.deleteTetro(this);
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
        var cantMove = game.mainScene.check(this.X, this.Y, b)
        if (cantMove == false) {
            this.fig = b;
        };
        game.mainScene.mergeWith(this);
        display.scene(game.mainScene);
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
    if (game.step < 7) {
        this.fig = superList[game.tetroBar[game.step]];
        game.step++;
        console.log("next");
        
        if (game.step == 6) {
            game.step = 0;
            game.tetroBar = game.nextTetroBar;
            game.shuffle(game.nextTetroBar);
            
            console.log(game.tetroBar);
        };
    };
    display.nextTetro();
};

