var Tetromino = function() {

	// call from Tetromino.prototype.move
	// and Game.prototype.start

    this.newTetromino();
};

Tetromino.prototype.newTetromino = function() {

	//calls from constructor

    superList = settings.figures;

    /*0 - I - red
      1 - T - light blue
      2 - J - deep blue
      3 - L - green
      4 - O - yellow
      5 - Z - brown
      6 - S - purple
	*/

    this.fig = [];
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
        }
    };

    display.nextTetro();
};

Tetromino.prototype.move = function(onScene, ofsX, ofsY) {

	// move tetromino on scene to

    if (game.over !== true && game.pause !== true) {
    // if game in current
        var nextX = this.X + ofsX;
        var nextY = this.Y + ofsY;
        onScene.deleteTetro(this);
        // delete this tetromino to use check
        var cantMove = onScene.check(nextX, nextY, this.fig);
        // check if we can put it on the next coordinates
        onScene.mergeWith(this);
        // put it back to avoid disappearance
        if (cantMove == false) { 
        	// if it's OK 
            onScene.deleteTetro(this);
            this.X = nextX;
            this.Y = nextY;
            onScene.mergeWith(this);
            // put it on the next coordinates
        } else { 
        // if cant move
            if (ofsY !== 0) { 
            // moves on Y
                onScene.cutLines();
                // reduse the lines and create new tetromino
                game.curTetro = new Tetromino();
                //display.info("#nextFigure", "Next figure: " + game.curTetro.fig);
                cantMove = onScene.check(3, 0, this.fig);
                game.curTetro.X = 3; 
                game.curTetro.Y = 0;
                onScene.mergeWith(game.curTetro);
                display.scene(onScene);
                if (cantMove !== false) {
                	// if no place to add new tetromino - game over
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

	// to drop the figure down

    var curStep = game.step;
    while (curStep === game.step) {
        this.move(scene, 0, 1);
    };
};

Tetromino.prototype.turnOn = function() {

	// to turn the figure

   if (game.over !== true && game.pause !== true) {
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

        var cantMove = game.mainScene.check(this.X, this.Y, b);
        if (cantMove == false) {
            this.fig = b;
        };

        game.mainScene.mergeWith(this);
        display.scene(game.mainScene);
        
    };
};
