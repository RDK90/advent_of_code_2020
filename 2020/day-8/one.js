function getInstructionNumber(instructions){
    let accumulator = 0;
    let lineNumbers = 0;
    let ranInstructions = [];
    while(lineNumbers <= instructions.length){
        if(ranInstructions.includes(lineNumbers)){
            console.log(ranInstructions[ranInstructions.length - 2]);
            return accumulator;
        }
        else{
            ranInstructions.push(lineNumbers);
        }
        let instruction = instructions[lineNumbers].split(" ");
        if(instruction[0] == "acc"){
            accumulator += parseInt(instruction[1]);
            lineNumbers += 1;
        }
        else if(instruction[0] == "jmp"){
            lineNumbers += parseInt(instruction[1]);
        }
        else{
            lineNumbers += 1;
        }
    }
    console.log("Finished! " + accumulator);
}

const fs = require("fs");
const { parse } = require("path");
let text = fs.readFileSync("./instructions.txt", "utf-8");
let instructions = text.split("\n");
console.log(getInstructionNumber(instructions));