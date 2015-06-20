document.addEventListener('keydown', function(event) {
    if (round.over == false && round.pause == false) {
        switch (event.keyCode) {
            case 37: // <- / Left arrow
            case 65: // <- / A
                round.curTetro.move(round.mainScene, -1, 0);
                break;
            case 39: // -> / Right arrow
            case 68: // -> / D
                round.curTetro.move(round.mainScene, 1, 0);
                break;
            case 38: // ^ / Up arrow 
            case 87: // ^ / W
                round.curTetro.turnOn();
                break;
            case 40: // v / Down arrow
            case 83: // v / S
                round.curTetro.move(round.mainScene, 0, 1);
                break;
            case 32: //Spacebar 
                if (round.pause == false) {
                    round.pause = true;
                    display.fade(round.pausedScene);
                }
                break;
            case 81: // Q
                round.curTetro.dropOn(round.mainScene);
                break;
            default:
                console.log("No actions on button " + event.keyCode)
                break;
        };
    } else {
        if (round.over == true) {
            // if previous round overed
            if (event.keyCode == 32) {
                //starting new round
                round = new Round();
                round.start();
                // output array and information
                display.scene(round.mainScene);
                display.info("#headerMid", "Try hard!");
            }
        } else if (round.pause == true && event.keyCode == 32) {
            round.pause = false;
            display.scene(round.mainScene);
        };
    };
    //alert(event.keyCode); // check pressed button keyCode
});
