var board, currentPlayer;

var resetBoard = function () {
  board = [
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    ['wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X '],
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', 'red', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X '],
    [' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ', 'red'],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ']
  ];

  currentPlayer = 'wht';
};

var validMove = false;
var deletePiece = false;
var boardChange = $(document).on('trig',function() { 
  console.log("sent the board array! (not really this is just a message)")
});
var sendBoard = $(document).trigger('trig');
var pieceTaken = $(document).on('takepiece',function(e,curPlayer,enemy,row,col) {
  console.log("current Player: " + curPlayer + ", enemy: " + enemy + ", row: " + row + ", col: " + col);   
});
var invalidError = $(document).on('error',function(e,errorMessage) { console.log("Error: " + errorMessage); });

var attemptMove = function(row1,col1,row2,col2) {
  if (board[row1][col1] == 'wht') {           //if white
    if (board[row2][col2] == " X ") {         // if white and 'X'
      if (row2-row1 == 1 && (col2-col1 == 1 || col2 - col1 == -1)) {    //if white, x, and valid space
        validMove = true;
        $(document).trigger('trig');
        console.log("wht moves to " + row2 + ", " + col2)   //log valid space movement
      } else if (board[row1+1][col1-1] == "red" || board[row1+1][col1+1] == "red") { //check if white jumps 'red'
        console.log("wht jumps red to move to " + row2 + ', ' + col2);  //valid
        validMove = true;
        deletePiece = true;
        $(document).trigger('trig');
      } else {
        $(document).trigger('error',"You can only move diagonally by 1 space.(wht side)");
        getMove();
      }
    } 
  } else if (board[row1][col1] == "red") {    //if 'red'
      if (board[row2][col2] == " X ") {         //if 'red' and 'x'
        if (row2-row1 == -1 && (col2-col1 == 1 || col2-col1 == -1))  {//if 'red','x', and valid space
          validMove = true;
          $(document).trigger('trig');
          console.log('red moves to ' + row2 + ', ' + col2); //log valid space movement
        } else if (board[row1-1][col1+1] == "wht" || board[row1-1][col1-1] == "wht") {  //check if red jumps 'white'
           validMove = true;
           deletePiece = true;
           $(document).trigger('trig');
           console.log("red jumps white to move to " + row2 + ', ' + col2);
        } else {
        $(document).trigger('error',"You can only move diagonally by 1 space.(red side)");
        getMove();
        }
     } else {                                
      $(document).trigger('error','uh oh, error.');
      getMove();
     }
  }
  
}; 
var makeMove = function(row1,col1,row2,col2) {
    attemptMove(row1,col1,row2,col2);
    if (validMove == true) {
      $(document).trigger('trig');
      return console.log("Player moves piece from (" + row1 + "," + col1 + ") to (" + row2 + "," + col2 + ")");   
    } else {
      $(document).trigger("error","I'm sorry, but that's not a valid move.");
    }
};

var removePiece = function(row,col,curPlayer,enemy) {
    if (deletePiece) {
      $(document).trigger('trig');
      board[row][col] = " X ";
      console.log("piece was removed from the game");
      deletePice = false;
      boardChange = true;
      $(document).trigger('takepiece',[curPlayer,enemy,row,col])
    } else {
      $(document).trigger('error','issue with removePiece');
    } 
};



/*
attemptMove(2,1,3,2); //true
attemptMove(2,3,4,5); //false
attemptMove(2,5,4,7); //false
attemptMove(5,0,4,1); //true
attemptMove(5,0,4,0); //false
attemptMove(5,0,3,2); //false
makeMove(5,0,4,1);
removePiece(3,6,"wht","red");
*/


































