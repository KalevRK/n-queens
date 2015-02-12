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

window.findNRooksSolution = function(n) {
var solution = [];


  // create empty board of size n
  var newBoard = new Board({n: n});

  // initiate recursive helper function call on new board
  var solvedBoard = _placeRook(n, n, newBoard);

  for (var i = 0; i < n; i++) {
    solution.push(solvedBoard.get(i));
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// helper function for recursion
// inputs:
//   number of rooks left to place,
//   latest version of board
var _placeRook = function(size, rooksLeft, board) {
  // check for no rooks left to place
  if (rooksLeft === 0) {
    return board;
  }

  // place a rook at the first free space on the board
  for (var r = 0; r < size; r++) {
    for (var c = 0; c < size; c++) {

      // check for occupied space
      if (board.get(r)[c] === 0) {
        // place piece
        board.get(r)[c] = 1;
        // check for row conflicts and column conflicts
        if ((!board.hasAnyRowConflicts()) && (!board.hasAnyColConflicts())) {
          // keep rook in place
          // if placed without conflict then decrement # of remaining rooks
          // to place and run function again on updated board
          return _placeRook(size, rooksLeft-1, board);
        } else {
          // remove rook from space and continue checking spaces
          board.get(r)[c] = 0;
        }
      }
    }
  }
}


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// use the _placeRook() function to find each individual solution
// if we place the first rook in a different location each time then it should
// find all of the valid solutions and we just keep count
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
