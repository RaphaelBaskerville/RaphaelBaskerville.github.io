/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findAllBoards = function (n) {
  var board = new Board({n:n});
  var allBoards= [];
  function recFun (row) {
  if (row === n) {
    console.log(JSON.stringify(board.rows()))
    var boardRows = []
    for (var i = 0; i < board.rows().length; i++) {
      console.log(board.rows()[i].slice())
      boardRows.push(board.rows()[i].slice())
    };

    allBoards.push(new Board(boardRows));
    return
  } 
  for (var i = 0; i < n; i++) {
    board.togglePiece(row,i);
    recFun(row + 1);
    board.togglePiece(row,i);
  };
 };
 recFun(0);
 return allBoards;
}

window.findNRooksSolution = function(n) {
 var allBoards = findAllBoards(n);
 
 for (var i = 0; i < allBoards.length; i++) {
   if(!allBoards[i].hasAnyRooksConflicts()) {
    console.log(allBoards[i].hasAnyRooksConflicts());
    console.log(allBoards[i].rows())
    return allBoards[i].rows();
   }
 };
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var allBoards = findAllBoards(n);
  for (var i = 0; i < allBoards.length; i++) {
    if(!allBoards[i].hasAnyRooksConflicts()) {
      solutionCount++;
      console.log('found a new solution')
    }
  };
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var allBoards = findAllBoards(n);
 var solutionCount= 0;
 for (var i = 0; i < allBoards.length; i++) {
   if(!allBoards[i].hasAnyQueensConflicts()) {
    console.log(allBoards[i].hasAnyQueensConflicts());
    console.log(allBoards[i].rows())
    return allBoards[i].rows();
   }
 };
 var failBoard = new Board({n:n});

 return failBoard.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
