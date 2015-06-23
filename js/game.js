var Game = function() {

    // game created on window.onload

    this.scores = 0;
    this.speed = settings.normal;
    this.speedDifference = 100 - settings.normal/10;
    /*
    "normal": 800,
    "fast":500,
    "crazy":200
    */
    this.over = true;
    this.pause = false;
    this.tetroBar = settings.defoultTetroBar;
    this.nextTetroBar = settings.defoultTetroBar;
    this.mainScene = new Scene(settings.sceneHeight, settings.sceneWidth);
    this.pausedScene = new Scene(settings.sceneHeight, settings.sceneWidth);
};

Game.prototype.start = function() {

	// every next game starts after gameover
	// calls from controls.js

    this.mainScene.makeNew(settings.sceneHeight, settings.sceneWidth);
    this.pausedScene.makeNew(settings.sceneHeight, settings.sceneWidth);
    this.pausedScene.colorRandomly();
    this.shuffle(this.tetroBar);
    this.shuffle(this.nextTetroBar);
    this.step = 0;
    this.curTetro = new Tetromino();
    this.over = false;
    this.play();
    display.nextTetro();
};

Game.prototype.play = function() {

	// game starts from Game.prototype.start 
	// stops when game.over = true

    game.mainScene.mergeWith(this.curTetro);
    var timer = setTimeout(function run() {
        if (game.over == false) {
            game.curTetro.move(game.mainScene, 0, 1);
            timer = setTimeout(run, game.speed);
        } else {
            clearTimeout(timer);
        };
    }, this.speed);
};

Game.prototype.shuffle = function(o) {

	// shuffles a tetroBar and nextTetroBar

    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
