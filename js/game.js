var Game = function() {
    // new game started
    this.scores = 0;
    this.speed = 1000;
    this.over = true;
    this.pause = false;
    this.tetroBar = settings.defoultTetroBar;
    this.nextTetroBar = settings.defoultTetroBar;
    this.mainScene = new Scene(settings.sceneHeight, settings.sceneWidth);
    this.pausedScene = new Scene(settings.sceneHeight, settings.sceneWidth);
};

Game.prototype.start = function() {
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
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
