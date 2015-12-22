// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
           console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      // console.log('toggleing piece with params: ', arguments)
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // save ref to row and create a counter 
      var row = this.get(rowIndex);
      var count = 0;
      // loop through the row
      for (var i = 0; i < row.length; i++) {
        // get the sum of every square
        count += row[i];
      };
      // if the count is more than 1, there was more than one queen.
      // return the boolean 
      return count > 1; 
    },

    // test if any rows on this board contain conflicts.
    hasAnyRowConflicts: function() {
      // save the length of the board.
      var size = this.attributes.n;
      //loop through all the rows on the board.
      for (var i = 0; i < size; i++) {
        // check if the current row has a conflict.
        if ( this.hasRowConflictAt(i) )  {
          // if any row has a conflict return true immediatley 
          return true;
        }
      };
      // return false if the loop completes
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // save the size of the board and create a counter variable
      var count = 0;
      var size = this.attributes.n;
      
      // add up the values of each column by summing elements of each 
      // row that share an index.

      // loop through the rows on the board
      for (var i = 0; i < size; i++) {
        // add the value of the current square
          count += this.get(i)[colIndex];
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // save a reference to the size of the board
      var size = this.attributes.n;
      // loop through the first row/array
      for (var i = 0; i < size; i++){
          // check the corresponding coloumn
          if (this.hasColConflictAt(i) ) {
            // if there is a conflict, return immediatley
            return true;
          }
      };
      // If the loop completes return false
      return false; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // save a ref to the size of the board and create a counter variable
      var size = this.attributes.n;
      var count = 0;
      // iterate through the board
      for (var i = 0; i < size; i++) {
        // Check the current row.
        // Starting on the first square. On each iteration we increment the row and the index within the row. 
        if (this.get(i)[majorDiagonalColumnIndexAtFirstRow + i]) {
          // add the current square
           count += this.get(i)[majorDiagonalColumnIndexAtFirstRow + i];
        };
      };
      // return the boolean count is greater than 1;
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // save the size of the board
      var size = this.attributes.n;
      // loop through the board starting at negitive board length.
      // starting with negative board length ensures that we find every diagonal 
      for (var i = -size; i < size; i++){
        // if any index has a conflict. return immetiatley
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      // if there are no conflicts return false.
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // debugger;
      var size = this.attributes.n;
      var count = 0;
      // iterate through 
      for (var i = 0; i < size; i++) {
        // 
        if (this.get(i)[minorDiagonalColumnIndexAtFirstRow - i]) {
           count += this.get(i)[minorDiagonalColumnIndexAtFirstRow - i];
        };
      };
      return count > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
       var size = this.attributes.n;
      for (var j = 0; j <= (2 * size); j++){
        if (this.hasMinorDiagonalConflictAt(j)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
