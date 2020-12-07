function bSelection(max, min){
    return Math.ceil((((max - min)) / 2) + min);
}

function fSelection(max, min){
    return Math.floor((((max - min)) / 2) + min);
}

function seatID(row, col){
    return (row * 8) + col;
}

let numberArray = [];
const boardingCardList = (boardingCards) => {   
    for(let cards = 0; cards < boardingCards.length; cards++){
        let maxIndex = 127;
        let minIndex = 0;
        let rowNumbers = boardingCards[cards].slice(0,7);
        for(let rows = 0; rows < rowNumbers.length; rows++){
            if(rowNumbers[rows] == "B"){
                minIndex = bSelection(maxIndex, minIndex);
            }
            else if(rowNumbers[rows] == "F"){
                maxIndex = fSelection(maxIndex, minIndex);
            }
        }
        let row = 0;
        if(rowNumbers[rowNumbers.length-1] == "B"){
            row = maxIndex;
        }
        else{
            row = minIndex;
        }
        let columnNumbers = boardingCards[cards].slice(7,10);
        let minCol = 0;
        let maxCol = 7;
        for(let column = 0; column < columnNumbers.length; column++){
            if(columnNumbers[column] == "R"){
                minCol = bSelection(maxCol, minCol);
            }
            else if(columnNumbers[column] == "L"){
                maxCol = fSelection(maxCol, minCol);
            }
        }
        let seat = 0;
        if(columnNumbers[columnNumbers.length-1] == "R"){
            seat = maxCol;
        }
        else{
            seat = minCol;
        }
        //console.log(row + "-" + seat);
        numberArray.push(seatID(row, seat));
    }
    let max = numberArray.reduce(function(a, b) {
        return Math.max(a, b);
    });
    //console.log(max)
    //console.log();
}



const fs = require("fs");
let text = fs.readFileSync("./boardingCards.txt", "utf-8");
let boardingCards = text.split("\n");
boardingCardList(boardingCards);
sortedArray = numberArray.sort((a, b) => a - b);
for (let x = 0; x < numberArray.length; x++){
    if(sortedArray[x+1] === sortedArray[x] + 2){
        console.log(sortedArray[x] + 1);
    }
}