(function() {
    var help = document.getElementById('help');
    var about = document.getElementById('about');

    help.onclick = function() {
        if (round.pause == false) 
            {round.pause = true}
        //else {round.pause = false};
        display.scene(round.pausedScene);
        display.message('Arrows or AWSD to move. Q to drop figure. SPACE to pause.')
    }
    about.onclick = function() {
        if (round.pause == false) 
            {round.pause = true}
        //else {round.pause = false};
        display.scene(round.pausedScene);
        display.message('This is a round like tetris. No one is going to help you.')
    }
}());
