let count = 0;

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const getAnswers = (answers) => {
    for(let index = 0; index < answers.length; index++){
        answers[index] = replaceAll(answers[index], "\n", "");
        letters = answers[index].split("");
        letters = letters.filter(onlyUnique);
        count += letters.length;
    }
    console.log(count)
}

const fs = require("fs");
let text = fs.readFileSync("./answers.txt", "utf-8");
let answers = text.split("\n\n");
getAnswers(answers);
