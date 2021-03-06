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
 window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [[1]];
  } else if (n === 2) {
    return [[,],[,]];
  } else if (n === 3) {
    return [[,,],[,,],[,,]];
  }

  var solution = [];

  var solvedBoard;

  for (var c = 0; c < n; c++) {
    solvedBoard = _placeQueen(n, n, new Board({n: n}), 0, c);
    if(solvedBoard !== undefined) {
      for (var i = 0; i < n; i++) {
        solution.push(solvedBoard.get(i));
      }

      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      return solution;
    }
  }

  return null;
};

// helper function for recursion
// inputs:
//   number of queens left to place,
//   latest version of board
var _placeQueen = function(size, queensLeft, board, startRow, startCol) {
  // check for no queens left to place
  if (queensLeft === 0) {
    return board;
  }

  if (queensLeft === size) {
    board.get(startRow)[startCol] = 1;
    return _placeQueen(size, queensLeft-1, board, startRow, startCol);
  } else {
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
            return _placeQueen(size, queensLeft-1, board, startRow, startCol);
          } else {
            // remove queen from space and continue checking spaces
            board.get(r)[c] = 0;
          }
        }
      }
    }
  }
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // check for cases of n = 0, n = 1, n = 2, n = 3
  if (n === 0) {
    return 1;
  } else if (n === 1) {
    return 1;
  } else if ((n === 2) || (n === 3)) {
    return 0;
  }

  var solutionCount = 0;

  var copyBoard = function(boardToCopy) {
    var n = boardToCopy.attributes.n;
    var boardCopy = new Board({n: n});
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        if (boardToCopy.get(row)[col] === 1) {
          boardCopy.togglePiece(row, col);
        }
      }
    }
    return boardCopy;
  }

  // recursive helper function
  // for each valid solution found increment solutionCount
  // place a queen at specific location
  // check for open space && no conflicts
  // if so then place next queen on next row at all possible positions
  var countNQueensHelper = function(size, queensLeft, board, r, c) {
    // place queen
    board.togglePiece(r, c);
    // check validity
    if (!board.hasAnyQueenConflictsOn(r,c)) {
        // check for solution
        if (queensLeft === 1) {
          solutionCount++;
        } else {
          // call countNQueensHelper on all positions in next row
          for (var col = 0; col < n; col++) {
            countNQueensHelper(size, queensLeft-1, board, r+1, col);
          }
        }
    }
    // remove queen
    board.togglePiece(r, c);
  };

  for (var i = 0; i < n; i++) {
    countNQueensHelper(n, n, new Board({n: n}), 0, i);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
