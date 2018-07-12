//'condition': ['R', 'C', 'L', 'H']
var pizza = {'condition': [3, 5, 1, 6],
                    'ingredients': [[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]]
                };
    
var numRow = pizza.condition[0];
var numCol = pizza.condition[1];
var minIngredient = pizza.condition[2];
var maxCell = pizza.condition[3];
var ingredients = pizza.ingredients;

var mushroom = 0; //current number of mushroom taken in a slice cut
var tomato = 0; //current number of tomato taken in a slice cut

var curSlice = [];
var curIngredient;

var sliceDelimiter = [];

var lastCutPos = new Array(numRow);  //the last position of cut (i.e column) of a particular row. the number of row set to array length

var i = 0;  //take record of current row index
var j = 0;  //take record of current column index

function cutSlice(){

    var start = []; //r1, c1
    var end = [];  //r2, c2
    
    
    for(k=0; k < 2; k++){
            
        //check if minimum ingredient for both have been reached or not
        if(checkIfMinIngredientReached(minIngredient, mushroom, tomato) == false){
            if(j < numCol){
                if(k > 0){
                    i = start[0];
                }
                for(l=0; l < 3; l++){

                    //check if the current
                    if(k == 0 && l == 0){
                        start[0] = i;
                        start[1] = j;
                        console.log("start: \n" + start );
                    }

                    if(i < numRow){

                        //cut the cell of current ingredient
                        curIngredient = ingredients[i].slice(j, j + 1);
                        console.log("current ingredient: \n" + curIngredient );
                        //push the cut cell into the current slice array
                        curSlice.push(curIngredient[0]);

                        //update last cut postion (which is the column) of a row
                        lastCutPos[i] = j;

                        //increment the row index for next row iteration
                        i++;

                        //increment number of mushroom or tomato depending on which is contained in the cell
                        if(curIngredient[0] == 0){
                            mushroom++;
                        }else if(curIngredient[0] == 1){
                            tomato++;
                        }
                    }                
                }
                console.log("mushroom: " + mushroom + "\n tomato: " + tomato );
                end[0] = i-1;
                end[1] = j;
                //increment column index for next column iteration
                j++;
            }else{
                if(i >= numRow){
                    console.log("slice delimiters: /n" + sliceDelimiter );
                }
            }
            
                            
        }else{
            
            sliceDelimiter.push(start.concat(end));

            if(j < numCol){
                i = start[0];
            }else{
                if(i >= numRow ){
                    console.log("slice delimiters: /n" + sliceDelimiter );
                }else{
                    j = 0;
                }
            }

            cutSlice();
        } 
    }
    
}


function checkMaxCellReached(maxCell, numCell){
    var confirm = false;
    if(numCell === maxCell){
        confirm = true;
    }

    return confirm;
}


function getPossibleRows(n) {
	if (n < 1)
		throw "Argument error";
	var small = [];
	var large = [];
	var end = Math.floor(Math.sqrt(n));
	for (var i = 1; i <= end; i++) {
		if (n % i == 0) {
			small.push(i);
			if (i * i != n)  // Don't include a square root twice
				large.push(n / i);
		}
	}
	large.reverse();
	return small.concat(large);
}

function checkIfMinIngredientReached(ingMin, mushCur, tomCur){
    var confirm = false;
    if(mushCur >= ingMin && tomCur >= ingMin){
        confirm = true;
    }

    return confirm;
}

function countIngredient(pizzaSlice){

    var mushNum = 0;
    var tomNum = 0;
    for(i = 0; i < pizzaSlice.length; i++){
        if(pizzaSlice[i] == 0){
            mushNum++;
        }else if(pizzaSlice[i] == 1){
            tomNum++;
        }
    }

    return [mushNum, tomNum];
}