var numToChar = ["a", "b", "c", "d", "e", "f", "g", "h"];
var charToNum = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
}

var displayBoard = function () {
  var column = [0, 1, 2, 3, 4, 5, 6, 7];
  console.log("  | " + column.join("   "));
  console.log("-----------------------------------");
  for (var i = 0; i < board.length; i++) {
    console.log(numToChar[i] + " |" + board[i].join(" "));
  }
};


var getMove = function() {
  var res = prompt("Please Enter the Start and End coordinates in this format: (row1 col1 row2 col2) if the coordinates are not entered correctly you will be prompted to try again. If you wish to quit the game type anything that begins with 'q'.");
  if (res.split("")[0].toLowerCase() == "q") {
    return {quit: true};
  } else {
      var ans = res.split(" ");
      var coordinates = ans.filter(function(x) {
        var result = parseInt(x);
        if(typeof result === 'number') {
          return result;
        }
      });
      if (coordinates.length != 4) {
        alert("I'm sorry but you entered the coordinates incorrectly. try again.");
        getMove();
      } else {
        var resArray = [];
        coordinates.forEach(function(x) {
          resArray.push(parseInt(x));
        });
        attemptMove(resArray[0],resArray[1],resArray[2],resArray[3]);
      }  
  }
};  

var play = function() {
  resetBoard();
  displayBoard();
  getMove();

};

play();
















