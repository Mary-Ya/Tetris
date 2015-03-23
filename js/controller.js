var Round = function() {
    // new round started
    this.scores = 0;
    this.speed = 1000;
    this.over = true;
    this.pause = false;
    
    this.mainScene = new Scene(20, 10);
    this.pausedScene = new Scene(20, 10);
    
};

/*Round.prototype = function() {
    this.start();
};*/

Round.prototype.start = function() {
    //generateArray(20, 10);
    this.pausedScene.makeNew(20, 10);

    //this.pausedScene.colorRandomly();
    tetroBar = [0, 1, 2, 3, 4, 5, 6];
    nextTetroBar = [0, 1, 2, 3, 4, 5, 6];
    this.curTetro = new Tetromino();
    this.step = 0;
    this.over = false;
    this.play();
    shuffle(tetroBar);
    shuffle(nextTetroBar);
    this.pausedScene.colorRandomly();
    this.mainScene.makeNew(20, 10);
    
};

Round.prototype.play = function() {
    round.mainScene.mergeWith(this.curTetro);
    var timer = setTimeout(function run() {
        if (round.over == false) {
            round.curTetro.move(round.mainScene, 0, 1);
            timer = setTimeout(run, round.speed);
        } else {
            clearTimeout(timer);
        };
    }, this.speed);
};






