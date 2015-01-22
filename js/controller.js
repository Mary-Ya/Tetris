var scores = 0;
var speed = 1000;
var gamover = false;
var pause = false;

function printArray(a) {
    printNextTetro();
    var output = document.querySelector("#scene");
    output.innerHTML = "";
    //console.log(output);
    for (i = 0; i < 20; i++) {
        var line = document.createElement("div");
        output.appendChild(line);
        for (j = 0; j < 10; j++) {
            var div = document.createElement("div");
            div.className = "pixel";
            if (a[i][j] == 0) {
            } else {
                div.style.backgroundColor = colorList[a[i][j]-1];
                div.style.backgroundColor = colorList[a[i][j]-1];
            };
            line.appendChild(div);
        }
    }
};

function message(text) {
    var sceneDiv = document.querySelector("#scene");
    var messageDiv = document.createElement("div");
    messageDiv.className  = "panel message";
    messageDiv.innerHTML = text;
    messageDiv.setAttribute('align', 'center')
    sceneDiv.appendChild(messageDiv);
};

function play() {
    gamover = false;
    merge();
    var mainScene = generateArray(20, 10);
    printArray(mainScene);

    var timer = setTimeout(function run() { 
        if (gamover == false) {
            move(0, 1);
            timer = setTimeout(run, speed);
        } else {
            clearTimeout(timer);
        }
    }, speed);
};

function move(ofsX, ofsY) {
    if (gamover !== true && pause !== true) {
    var nextX = curTetro.X + ofsX;
    var nextY = curTetro.Y + ofsY;

    clean();
    var cantMove = check(nextX, nextY, curTetro.fig);
    merge();
    if (cantMove == false){
        clean();
        curTetro.X = nextX; // меняем координаты
        curTetro.Y = nextY;
        merge();
    } else {                // 
        if (ofsY !== 0) {  // если движение по Y
            cutLines();
            curTetro = nextTetro();             //Проверяем сможет ли следующий тетро
            cantMove = check(3, 0, curTetro.fig);//свалиться сверху
            printArray(mainScene);
            if (cantMove !== false) {   
                gamover = true;
                console.log("GameOver");
                pauseGenerate();
                printArray(pausedScene);
                message("GAME OVER! PRESS ANY KAY FOR START");
            }; 
        }; 
    };
    };
};

function merge() {
    for (var i = 0; i < curTetro.fig.length; i++) 
        for (var j = 0; j < curTetro.fig[i].length; j++) {
            if (curTetro.fig[i][j] !==0 )
            mainScene[curTetro.Y + i][curTetro.X + j] += curTetro.fig[i][j];
        };
    printArray(mainScene);
};

function clean() {
    for (var i = 0; i < curTetro["fig"].length; i++) {
        for (var j = 0; j < curTetro["fig"][i].length; j++) {
            if (curTetro.fig[i][j] !== 0) {
                mainScene[curTetro.Y + i][curTetro.X + j] = 0;
            }
        }
    };
    printArray(mainScene);
};

function cutLines() {
    var plusSpeed = false;
    var reduceIt = true;
    var linesCount = 0;
    for (var i = 0; i < mainScene.length; i++) {
        //console.log("This line: " + a[i]);
        reduceIt = true;
        for (var j = 0; j < mainScene[i].length; j++) {
            if (mainScene[i][j] == 0) {
                reduceIt = false;
            } else {
                
            }
        }

        if (reduceIt == true) {
            plusSpeed = true;
            linesCount++
            console.log("This line " + i + " will be reduced");
            speed -= 20;

                if (linesCount > 3) {
                    scores += 1200;
                } else if (linesCount == 3) {
                    scores += 900;
                } else if (linesCount == 2) {
                    scores += 400;
                } else if (linesCount == 1) {
                    scores += 100;
                }

            var text = "YOUR SCORES: " + scores;
            printInfo('#scores', text)
            for (var j = i; j >= 0; j--) {
                mainScene[j] = mainScene[j - 1];
            }
            mainScene[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
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
        };
    merge();
    printArray(mainScene);
    };
};