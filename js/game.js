var Game = function() {
    // new game started
    this.scores = 0;
    this.speed = 1000;
    this.over = true;
    this.pause = false;
    this.tetroBar = [0, 1, 2, 3, 4, 5, 6];
    this.nextTetroBar = [0, 1, 2, 3, 4, 5, 6];
    this.mainScene = new Scene(20, 10);
    this.pausedScene = new Scene(20, 10);
};

Game.prototype.start = function() {
    this.mainScene.makeNew(20, 10);
    this.pausedScene.makeNew(20, 10);
    this.pausedScene.colorRandomly();
    game.shuffle(this.tetroBar);
    game.shuffle(this.nextTetroBar);
    this.curTetro = new Tetromino();
    this.step = 0;
    this.over = false;
    this.play();
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
