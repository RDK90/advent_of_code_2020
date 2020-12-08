const bagResult = (bags, key = 'shiny gold') => {
    let tmpBag = [];
    let resultBag = {};

    for(let bag of bags){
        bag = bag.split("contain");
        const mainBag = bag[0].replace(" bags ", "");
        const regex = /\s+(?<amount>\d+)\s+(?<bag>\w+\s+\w+)\s+bag/;
        resultBag[mainBag] = {
            innerTypes: {}
        };
        if(bag[1] != " no other bags."){
            if(bag[1].includes(",")){
                tmpBag = bag[1].split(",");
                for(let tmp of tmpBag){
                    [, amount, insideBag] = regex.exec(tmp);
                    resultBag[mainBag].innerTypes[insideBag] = parseInt(amount.trim());
                }
            }
            else{
                [, amount, insideBag] = regex.exec(bag[1]);
                resultBag[mainBag].innerTypes[insideBag] = parseInt(amount.trim());
            }
        }
    }
    //console.log(JSON.stringify(resultBag));
    let validBags = new Set();
    function findPaths(child, topLevelParent) {
        const children = Object.keys(resultBag[child].innerTypes);
    
        if (children.includes(key)) {
          validBags.add(topLevelParent);
          return;
        }
    
        if (children.length === 0) return;
    
        for (let i = 0; i < children.length; i++) {
          findPaths(children[i], topLevelParent);
        }
      } 
    
      const topLevelBags = Object.keys(resultBag);
    
      for (let i = 0; i < topLevelBags.length; i++) {
        findPaths(topLevelBags[i], topLevelBags[i]);
      }
    
      return validBags.size
}

const fs = require("fs");
let text = fs.readFileSync("./bags.txt", "utf-8");
let bags = text.split("\n");
console.log(bagResult(bags));