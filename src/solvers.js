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

window.countNRooksSolutions = function(n) {

  // recursive helper function
  var findSolutionCountForN = function(count) {
    if (count === 1) {
      return count;
    } else {
      return count * findSolutionCountForN(count-1);
    }
  };

  var solutionCount = findSolutionCountForN(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
/* window.findNQueensSolution = function(n) {
  var solution = [];

  var newBoard = new Board({n: n});

  var solvedBoard = _placeQueen(n, n, newBoard);

  for (var i = 0; i < n; n++) {
    solution.push(solvedBoard.get(i));
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// helper function for recursion
// inputs:
//   number of queens left to place,
//   latest version of board
var _placeQueen = function(size, queensLeft, board) {
// check for no queens left to place
  if (queensLeft === 0) {
    return board;
  }

  // place a queen at the first free space on the board
  for (var r = 0; r < size; r++) {
    for (var c = 0; c < size; c++) {

      // check for occupied space
      if (board.get(r)[c] === 0) {
        // place piece
        board.get(r)[c] = 1;
        // check for row conflicts, column conflicts,
        // major diagonal conflicts, and minor diagonal conflicts
        if ((!board.hasAnyRowConflicts()) && (!board.hasAnyColConflicts()) && (!board.hasAnyMajorDiagonalConflicts()) && (!board.hasAnyMinorDiagonalConflicts())) {
          // keep queen in place
          // if placed without conflict then decrement # of remaining rooks
          // to place and run function again on updated board
          return _placeQueen(size, queensLeft-1, board);
        } else {
          // remove queen from space and continue checking spaces
          board.get(r)[c] = 0;
        }
      }
    }
  }
};*/


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
