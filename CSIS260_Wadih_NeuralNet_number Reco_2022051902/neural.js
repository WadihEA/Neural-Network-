
var myCanvas = document.getElementById("myGrid");
var ctx = myCanvas.getContext("2d");
var recWidth = 50;
var recHeight = 50;
var recPerRow = 300 / 50;
var recPerCol = 400 / 50;
var counter = 0;
console.log("The steps are: \n First we train the machine from each number 0 to 4 three time\n"+
" Each training consists of drawing the number by clicking on the squares and submitting the input by pressing enter\n" + 
" When training is over (after 15 times [5 number 3 times each]) input a number by drawing it then press enter and the machine will guess it \n"+
" Make sure to press each square only once since each press would increment the weight by one \n"+
" After training is over if you wish to see the weights for each number press W key")
function drawRect(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
}

function fillGridRect(ctx, x, y, width, height, color) {
    x = Math.floor(x / 50) * 50;
    y = Math.floor(y / 50) * 50;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    ctx.fill();
    ctx.stroke();
}

class point {
    //a point is a square in the canvas it hass 3 value 2 for coordinates and a boolean indicating if it was clicked or not
    constructor(x, y, clicked) {
        this.x = x;
        this.y = y;
        this.clicked = clicked;
    }
}

for (var i = 0; i < recPerRow; i++) {
    for (var j = 0; j < recPerCol; j++) {
        drawRect(ctx, i * recWidth, j * recHeight, recWidth, recHeight);
    }
}

var input = [];
for (var i = 0; i < recPerRow; i++) {
    input[i] = [];
    for (var j = 0; j < recPerCol; j++) {
        input[i][j] = 0;
    }
}//array t store user input

//arrays to store weight for number 0, 1, 2, 3 and 4
var weightForZero = [];
for (var i = 0; i < recPerRow; i++) {
    weightForZero[i] = [];
    for (var j = 0; j < recPerCol; j++) {
        weightForZero[i][j] = 0;
    }
}
var weightForOne = [];
for (var i = 0; i < recPerRow; i++) {
    weightForOne[i] = [];
    for (var j = 0; j < recPerCol; j++) {
        weightForOne[i][j] = 0;
    }
}
var weightForTwo = [];
for (var i = 0; i < recPerRow; i++) {
    weightForTwo[i] = [];
    for (var j = 0; j < recPerCol; j++) {
        weightForTwo[i][j] = 0;
    }
}
var weightForThree = [];
for (var i = 0; i < recPerRow; i++) {
    weightForThree[i] = [];
    for (var j = 0; j < recPerCol; j++) {
        weightForThree[i][j] = 0;
    }
}
var weightForFour = [];
for (var i = 0; i < recPerRow; i++) {
    weightForFour[i] = [];
    for (var j = 0; j < recPerCol; j++) {
        weightForFour[i][j] = 0;
    }
}

var arrOfPoints = [];
for (var i = 0; i < recPerRow; i++) {
    arrOfPoints[i] = [];
    for (var j = 0; j < recPerCol; j++) {
        arrOfPoints[i][j] = new point(i, j, false);
    }
}

console.log("You are training for number zero :");

myCanvas.addEventListener("click", canvasClickEvent, false);

function canvasClickEvent(e) {
    var x;
    var y;

    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x =
            e.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y =
            e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= myCanvas.offsetLeft;
    y -= myCanvas.offsetTop;

    fillGridRect(ctx, x, y, 50, 50, "#000000");
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);

    //increment the weight of the squares that were pressed and set boolean clicked to true
    if (counter < 3) {
        weightForZero[x][y]++;
        arrOfPoints[x][y].clicked = true;
    } 
    else if (counter < 6) {
        weightForOne[x][y]++;
        arrOfPoints[x][y].clicked = true;
    }
    else if(counter < 9){
        weightForTwo[x][y]++;
        arrOfPoints[x][y].clicked = true;

    } 
    else if(counter < 12){
        weightForThree[x][y]++;
        arrOfPoints[x][y].clicked = true;

    }
    else if(counter < 15){
        weightForFour[x][y]++;
        arrOfPoints[x][y].clicked = true;

    }
    else {
        input[x][y]++;
        arrOfPoints[x][y].clicked = true;
    }
}
var keysDown = {};

addEventListener(
    "keydown",
    function (e) {
        keysDown[e.keyCode] = true;
        if (e.keyCode == 13) {
            //decrement the weight of the sqaure that were not pressed           
            if (counter < 3) {
                console.log("Training " + (counter+1).toString() );
                for (var i = 0; i < recPerRow; i++) {
                    for (var j = 0; j < recPerCol; j++) {
                        if (arrOfPoints[i][j].clicked == false) {
                            weightForZero[i][j]--;
                        }
                    }
                }
                if(counter == 2){
                    console.log("You are training for number one :");  
                }
            } 
            else if (counter < 6) {               
                console.log("Training " + (counter - 2).toString() );
                for (var i = 0; i < recPerRow; i++) {
                    for (var j = 0; j < recPerCol; j++) {
                        if (arrOfPoints[i][j].clicked == false) {
                            weightForOne[i][j]--;
                        }
                    }
                }
                if(counter == 5){
                    console.log("You are training for number two :");  
                }
            } 
            else if (counter < 9) {               
                console.log("Training " + (counter - 5).toString() );
                for (var i = 0; i < recPerRow; i++) {
                    for (var j = 0; j < recPerCol; j++) {
                        if (arrOfPoints[i][j].clicked == false) {
                            weightForTwo[i][j]--;
                        }
                    }
                }
                if(counter == 8){
                    console.log("You are training for number three :");  
                }
            }
            else if (counter < 12) {               
                console.log("Training " + (counter - 8).toString() );
                for (var i = 0; i < recPerRow; i++) {
                    for (var j = 0; j < recPerCol; j++) {
                        if (arrOfPoints[i][j].clicked == false) {
                            weightForThree[i][j]--;
                        }
                    }
                }
                if(counter == 11){
                    console.log("You are training for number four :");  
                }
            }
            else if (counter < 15) {               
                console.log("Training " + (counter - 11).toString() );
                for (var i = 0; i < recPerRow; i++) {
                    for (var j = 0; j < recPerCol; j++) {
                        if (arrOfPoints[i][j].clicked == false) {
                            weightForFour[i][j]--;
                        }
                    }
                }
                if(counter == 14){
                    console.log("All trainings are over; input a number to be guessed");  
                }
            }
            else {
                var res0 = calcScor(weightForZero, input);
                var res1 = calcScor(weightForOne, input);
                var res2 = calcScor(weightForTwo, input);
                var res3 = calcScor(weightForThree, input);
                var res4 = calcScor(weightForFour, input); //calculate quotient of each number
                var max = Math.max(res0, res1, res2, res3, res4);  //get the max quotient

                //display the quotients
                console.log("Quotient for 0 is " + res0);
                console.log("Quotient for 1 is " + res1);
                console.log("Quotient for 2 is " + res2);
                console.log("Quotient for 3 is " + res3);
                console.log("Quotient for 4 is " + res4);

                //display the guess
                if(max == res0){
                    console.log("You wrote 0");
                }
                else if (max == res1){
                    console.log("You wrote 1");
                }
                else if (max == res2){
                    console.log("You wrote 2");
                }
                else if (max == res3){
                    console.log("You wrote 3");
                }
                else if (max == res4){
                    console.log("You wrote 4");
                }
            }
            for (var i = 0; i < recPerRow; i++) {
                for (var j = 0; j < recPerCol; j++) {
                    fillGridRect(ctx, i * 50, j * 50, 50, 50, "#FFFFFF");//color the squares white
                    arrOfPoints[i][j].clicked == false; //set clicked boolean to false
                    input[i][j] = 0 // reset input array
                } // reset the values for next input or training
            }
            
            counter++;
        }
        //press W key to see the weight array of each number
        if (e.keyCode == 87){
            console.log("weight of 0 : ")
            console.log(weightForZero)

            console.log("weight of 1 : ")
            console.log(weightForOne)

            console.log("weight of 2 : ")
            console.log(weightForTwo)

            console.log("weight of 3 : ")
            console.log(weightForThree)

            console.log("weight of 4 : ")
            console.log(weightForFour)

        }
    },
    false
);
function calcScor(weight, inp) {
    var numerator = 0;
    var denominator = 0;
    var score;
    for (var i = 0; i < recPerRow; i++) {
        for (var j = 0; j < recPerCol; j++) {
            numerator += weight[i][j] * inp[i][j]; //multiply input by weight
            if (weight[i][j] > 0) {
                denominator += weight[i][j];//get the sum of positive weights
            }
        }
    }
    score = numerator / denominator; //get the quotient
    return score;
}
