document.addEventListener('keydown', function(event) {
    if (game.over == false && game.pause == false) {
        switch (event.keyCode) {
            case 37: // <- / Left arrow
            case 65: // <- / A
                game.curTetro.move(game.mainScene, -1, 0);
                break;
            case 39: // -> / Right arrow
            case 68: // -> / D
                game.curTetro.move(game.mainScene, 1, 0);
                break;
            case 38: // ^ / Up arrow 
            case 87: // ^ / W
                game.curTetro.turnOn();
                break;
            case 40: // v / Down arrow
            case 83: // v / S
                game.curTetro.move(game.mainScene, 0, 1);
                break;
            case 32: //Spacebar 
                if (game.pause == false) {
                    game.pause = true;
                    display.fade(game.pausedScene);
                }
                break;
            case 81: // Q
                game.curTetro.dropOn(game.mainScene);
                break;
            default:
                console.log("No actions on button " + event.keyCode)
                break;
        };
    } else {
        if (game.over == true) {
            // if previous game overed
            if (event.keyCode == 32) {
                //starting new game
                game = new Game();
                game.start();
                // output array and information
                display.scene(game.mainScene);
                display.info("#headerMid", "Try hard!");
            }
        } else if (game.pause == true && event.keyCode == 32) {
            game.pause = false;
            display.scene(game.mainScene);
        };
    };
    //alert(event.keyCode); // check pressed button keyCode
});
