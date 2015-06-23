function Scene(h, w) {

	// create mainScene and pausedScene
	// in Game constructor

    this.blocks = [];
    this.makeNew(h, w);
};

Scene.prototype.makeNew = function(h, w) {

	// creates an empty array

    this.blocks = new Array(h);
    for (var i = 0; i < h; i++) {
        this.blocks[i] = new Array(w);
        for (var j = 0; j < w; j++) {
            this.blocks[i][j] = 0;
        }
    }
    //    console.log("makeNew called");
};

Scene.prototype.set = function(val) {

	// set a new value to scene

	// should add validation for val here

    this.blocks = val;
    display.scene(this);
    //    console.log("scene.set called");
};

Scene.prototype.get = function() {
    return this.blocks;
};


Scene.prototype.mergeWith = function(tetromino) {

	//merge scene with current tetromino
	// call from Tetromino.prototype.move
	// and Game.prototype.play

    var currentScene = this;
    tetromino.fig.forEach(function(line, indexY, figure) {
        line.forEach(function(cell, indexX, line) {
            if (cell !== 0) {
                var newScene = this.get();
                newScene[tetromino.Y + indexY][tetromino.X + indexX] += cell;
                this.set(newScene);
            }
        }, this);
    }, this);

    /*for (var i = 0; i < tetromino.fig.length; i++)
        for (var j = 0; j < tetromino.fig[i].length; j++) {
            if (tetromino.fig[i][j] !== 0) {
                var newScene = this.get();
                newScene[tetromino.Y + i][tetromino.X + j] += tetromino.fig[i][j];
                this.set(newScene);
            }
        };*/
};

Scene.prototype.deleteTetro = function(tetromino) {

	// delet tetromino from scene array

    tetromino.fig.forEach(function(line, indexY, figure) {
        line.forEach(function(cell, indexX, line) {
            if (cell !== 0) {
                var newScene = this.get();
                newScene[tetromino.Y + indexY][tetromino.X + indexX] = 0;
                this.set(newScene);
            }
        }, this)
    }, this);

    /*for (var i = 0; i < tetromino.fig.length; i++) {
        for (var j = 0; j < tetromino.fig[i].length; j++) {
            if (tetromino.fig[i][j] !== 0) {
                var newScene = this.get();
                newScene[tetromino.Y + i][tetromino.X + j] = 0;
                this.set(newScene);
            }
        }
    }*/
};

Scene.prototype.check = function(nextX, nextY, fig) {

	// check if the tetrominon can be moved to the  next coordinates
	// call from Tetromino.prototype.move

    var X = 0;
    var Y = 0;
    var dontMove = false;
    for (var i = 0; i < fig.length; i++)
        for (var j = 0; j < fig[0].length; j++) {
            if (fig[i][j] !== 0) {
                Y = nextY + i;
                X = nextX + j;
                if (Y < 0 || Y > (settings.sceneHeight - 1) ||
                    X < 0 || X > (settings.sceneWidth - 1) ||
                    this.blocks[Y][X] !== 0) {
                    dontMove = true;
                    break;
                }
            }
        }
    return dontMove;
};

Scene.prototype.cutLines = function() {

	/* function to:
	 - reduce the lines after the figure is dropped
	 and if there is a line to reduce
	 - submit scores
	 - increase the speed
	 - display state info
	*/

	// maybe this function should be splited

    var plusSpeed = false;
    var reduceIt = true;
    var linesCount = 0;
    for (var i = 0; i < this.blocks.length; i++) {
        //console.log("This line: " + a[i]);
        reduceIt = true;
        for (var j = 0; j < this.blocks[i].length; j++) {
            if (this.blocks[i][j] === 0) {
                reduceIt = false;
            } else {

            }
        }

        if (reduceIt === true) {
            plusSpeed = true;
            linesCount++;
            console.log("This line " + i + " will be reduced");
            game.speed -= game.speedDifference;

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
            display.info('#scores', text);
            var speedToView = 1000 - game.speed;
            display.info("#speed", "Speed: " + speedToView);
            for (var j = i; j >= 0; j--) {
                this.blocks[j] = this.blocks[j - 1];
            }
            this.blocks[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }
};

Scene.prototype.colorRandomly = function() {

	// fuel scene with rundome color

    var color = Math.floor(Math.random() * 7);
    var sceneBlocks = this.blocks.map(function(lines) {
        return lines.map(
            function(value) {
                return value = color;
            })
    });
    
    /*    for (var i = 0; i < 20; i++)
        for (var j = 0; j < 10; j++) {
            sceneBlocks[i][j] = color;
        };*/

    this.blocks = sceneBlocks;
};
