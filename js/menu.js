(function() {
    var help = document.getElementById('help');
    var about = document.getElementById('about');

    help.onclick = function() {
        if (game.pause == false) 
            {game.pause = true}
        //else {game.pause = false};
        display.scene(game.pausedScene);
        display.message('Arrows or AWSD to move. Q to drop figure. SPACE to pause.')
    }
    about.onclick = function() {
        if (game.pause == false) 
            {game.pause = true}
        //else {game.pause = false};
        display.scene(game.pausedScene);
        display.message('This is a tetris game originally designed and programmed by Alexey Pajitnov in 1984')
    }
}());
