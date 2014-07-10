var mainScene = generateArray(20, 10);
var tetroBar = [0,1,2,3,4,5,6];
var nextTetroBar = [0,1,2,3,4,5,6];
var pausedScene = generateArray(20, 10);
var step = 0;

shuffle(tetroBar);
shuffle(nextTetroBar);
pauseGenerate();

function pauseGenerate() {
	
	var color = Math.floor(Math.random()*7);
            for (var i = 0; i < 20; i++) 
            	for (var j = 0; j < 10; j++) {
                	pausedScene[i][j] = color;
    			};
}

var curTetro = nextTetro();

var colorList = [
        ['#B70F0A'],
        ['#1882D9'],
        ['#2E1572'],
        ['#4C7A34'],
        ['#D96D0D'],
        ['#4D3541'],
        ['#631878'],
    ];

function generateArray(h, w) {
    var a = new Array(20);
    for (var i = 0; i < 20; i++) {
        a[i] = new Array(10);
        for (var j = 0; j < 10; j++) {
            a[i][j] = 0;
        }
    };
    return a;
};

function shuffle(o){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
    };

function nextTetro() {
    var superList = [
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ], //I
        [
            [0, 2, 0],
            [2, 2, 2],
            [0, 0, 0]
        ], //T
        [
            [3, 0, 0],
            [3, 3, 3]
        ], //J
        [
            [0, 0, 4],
            [4, 4, 4]
        ], //L
        [
            [5, 5],
            [5, 5]
        ], //O
        [
            [6, 6, 0],
            [0, 6, 6]
        ], //Z
        [
            [0, 7, 7],
            [7, 7, 0]
        ] //S
        ];
        
    var result = {
        fig:superList[0],
        X: 3,
        Y: 0
    };
    
    if (step < 7 ) {
        result.fig = superList[tetroBar[step]];
        step ++;
        console.log("next");
        if (step == 6) {
            step = 0;
            tetroBar = nextTetroBar;
            shuffle(nextTetroBar);
            console.log(tetroBar);
        }
    }
    return result;
}