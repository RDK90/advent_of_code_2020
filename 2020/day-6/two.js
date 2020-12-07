let count = 0;

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const getAnswers = (answers) => {
    let people = 0;
    let countUnique = 0;
    for(let index = 0; index < answers.length; index++){
        people = (answers[index].match(/\n/g) || []).length + 1;
        answers[index] = replaceAll(answers[index], "\n", "");
        letters = answers[index].split("");
        let uniqueLetters = letters.filter(onlyUnique);
        for(let unique of uniqueLetters){
            for(let nonUnique of letters){
                if(unique == nonUnique){
                    countUnique++;
                }
            }
            if(countUnique == people){
                count++;
            }
            countUnique = 0;
        }
    }
    console.log(count)
}

const fs = require("fs");
let text = fs.readFileSync("./answers.txt", "utf-8");
let answers = text.split("\n\n");
getAnswers(answers);
