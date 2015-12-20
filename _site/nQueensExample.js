// nQueens

// 
// make a bucket
// create an array with a Q at the first position followed by n-1 * undefined.



// compare to previous rows is a function that takes in the bucket
// iterate through the the rows in the bucket
// pass each row and the distance it is from the next row into the helper func
  





//
// helper func returns a safe index to put our queen.

// takes in an array and the distance between the row and our new row. 
function checkRow (arr, dist) {
// make a new row
	var newArr = [];
	newArr.length = 8;
// iterate through the new array.

// save references to left, up and right at (i - distance), (i) and (i + distance).
// if left, up and right are all undefined return i.
// outside of the loop return false since we havent found a suitable position for our queen.
	
}

checkRow();



function queenPuzzle(rows, columns) {
	// if there are no rows
    if (rows <= 0) {
    	// return an array with a nested sub-array
        return [[]];
    } else {
    		// return the recursive addQueen invocation with rows - 1.
        return addQueen(rows - 1, columns);
    }
}
 
function addQueen(newRow, columns, prevSolution) {
	// create an empty array to store newSolutions.
    var newSolutions = [];
    // create a var and set it equal to 
    var prev = queenPuzzle(newRow, columns);
    for (var i = 0; i < prev.length; i++) {
        var solution = prev[i];
        for (var newColumn = 0; newColumn < columns; newColumn++) {
            if (!hasConflict(newRow, newColumn, solution))
                newSolutions.push(solution.concat([newColumn]))
        }
    }
    return newSolutions;
}
 
function hasConflict(newRow, newColumn, solution) {
    for (var i = 0; i < newRow; i++) {
        if (solution[i]     == newColumn          ||
            solution[i] + i == newColumn + newRow || 
            solution[i] - i == newColumn - newRow) {
                return true;
        }
    }
    return false;
}
 
console.log(queenPuzzle(8,8));
 

