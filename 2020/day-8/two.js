function getInstructionNumber(instructions){
    let accumulator = 0;
    let lineNumbers = 0;
    let ranInstructions = [];
    while(lineNumbers < instructions.length){
        if(ranInstructions.includes(lineNumbers)){
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
let text = fs.readFileSync("./instructions.txt", "utf-8");
let instructions = text.split("\n");

for (let i = 0; i < instructions.length; i++) {
    const [, originalOperation, direction, units] = /(acc|jmp|nop)\s(\+|-)(\d*)/.exec(instructions[i]);

    if (originalOperation === 'acc') continue;

    if (['nop', 'jmp'].includes(originalOperation)) {
      let modifiedInstructions = [...instructions];
      modifiedInstructions.splice(i, 1, `${originalOperation === 'nop' ? 'jmp' : 'nop'} ${direction}${units}`);

      getInstructionNumber(modifiedInstructions);
    }
  }

