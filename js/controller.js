//var goNext = false;
var scores = 0;
var speed = 1000;

function play() {
    //a = generateArray(20, 10);
    merge();
    printArray(mainScene);
    // здесь должен быть код, роняющий фигурки
   var timer = setTimeout(function run() { 
    
    if (gamover == false) {
        move(0, 1);
    timer = setTimeout(run, speed);
    } else {
        clearTimeout(timer);
    }
  }, speed);


}

function move(ofsX, ofsY) {
    if (gamover !== true) {
    var nextX = curTetro.X + ofsX;
    var nextY = curTetro.Y + ofsY;
    clean();
    var cantMove = check(nextX, nextY, curTetro.fig);
    
    if (cantMove == false){
        curTetro.X = nextX; // просто меняем координаты
        curTetro.Y = nextY;
        merge();
    } else {                // 
        if (ofsY !== 0) {  // если движение по Y
            //goNext = true;
            merge();    
            cutLines();     
            curTetro = nextTetro();
            printNextTetro(curTetro.fig);
            cantMove = check(3, 0, curTetro.fig);
            if (cantMove !== false) {
                merge();
                gamover = true;
                //printInfo("GAME OVER!!");
                for (var i = 0; i < 20; i++) 
                    for (var j = 0; j < 10; j++) {
                        mainScene[i][j] = 6;
                    };
            }; 
            
        }; 
    };
    printArray(mainScene);
    };
};

function merge() {
        for (var i = 0; i < curTetro.fig.length; i++) {
        for (var j = 0; j < curTetro.fig[i].length; j++) {
            if (curTetro.fig[i][j] !==0 )
            mainScene[curTetro.Y + i][curTetro.X + j] += curTetro.fig[i][j];
        };
    };
    printArray(mainScene);
};

function clean() {
    for (var i = 0; i < curTetro["fig"].length; i++) {
        for (var j = 0; j < curTetro["fig"][i].length; j++) {
            if (curTetro.fig[i][j] !== 0) {
                mainScene[curTetro.Y + i][curTetro.X + j] = 0;
            };
        };
    };
    printArray(mainScene);
};

function cutLines() {
    var reduceIt = true;
    var linesCount = 0;
    for (var i = 0; i < mainScene.length; i++) {
        //console.log("This line: " + a[i]);
        reduceIt = true;
        for (var j = 0; j < mainScene[i].length; j++) {
            if (mainScene[i][j] == 0) {
                reduceIt = false;
            } else {
                linesCount++
            }
        }
        if (reduceIt == true) {
            console.log("This line " + i + " will be reduced");
            scores += 100;

            var text = "YOUR SCORES: " + scores;

            printInfo('#scores', text)
            for (var j = i; j >= 0; j--) {
                mainScene[j] = mainScene[j - 1];
            }
            mainScene[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }
    if (reduceIt == true) { 
        speed -=20;
        var a = 1000 - speed
        printInfo("#speed", "Speed: " + a);
    }

    if (linesCount > 3) {
        scores += 1200;
    } else if (linesCount == 3) {
        scores += 900;
    } else if (linesCount == 2) {
        scores += 400;
    } else if (linesCount == 1) {
        scores += 100;
    }

};

function check(nextX, nextY, fig) {
    var X = 0;
    var Y = 0;
    var dontMove = false;
        for (var i = 0; i < fig.length; i++)
            for (var j = 0; j < fig[0].length; j++) {
                if (fig[i][j] !== 0) {
                    Y = nextY+i;
                    X = nextX+j;
                    if (Y < 0 || Y > 19 || X < 0 || X > 10 || mainScene[Y][X] !== 0) {
                        dontMove = true;
                        break;
                    };
                };
            };
    return dontMove;
};

function turn() {
    if (gamover !== true) {
    clean();
    var newWidth = curTetro.fig.length;
    var newLength = curTetro.fig[0].length;
    var b = new Array(newLength);
    for (var i = 0; i < newLength; i++) {
        b[i] = new Array(newWidth);
        for (var j = 0; j < newWidth; j++) {
            b[i][j] = 0;
        };
    };
    for (var i = 0; i < newLength; i++)
        for (var j = 0; j < newWidth; j++) {
            b[i][j] = curTetro.fig[newWidth - 1 - j][i];
        };
    
    var cantMove = check(curTetro.X, curTetro.Y, b)
        if (cantMove == false) {
                curTetro.fig = b;
        } else {
            console.log("ПРЕГРАДА");
        };
    merge();
    printArray(mainScene);
    };
};