var app = angular.module('app', ['ng-fastclick']);

app.controller('home-ctrl', ['$scope','$timeout', function($scope, $timeout){
	//Alphabet array
	$scope.grid = [];
	$scope.timer = 60;
	$scope.enteredWord = "";
	$scope.foundWords = [];
	$scope.score = 0;
	$scope.gameOver = false;
	var gridDict = {};
	var stopped;

	$scope.validate = function(){
		if($scope.gameOver){
			return false;
		}
		var url = "http://en.wiktionary.org/w/api.php?action=query&titles=" + $scope.enteredWord + "&format=json&callback=?";
		var newDict = gridToDict($scope.grid);
		//Check if the word can be constructed from the available letters
		if(canBeAWord($scope.enteredWord, newDict)){
			$.getJSON(url, function(data) {
				for(prop in data.query.pages){
					if(prop === "-1"){
						//TODO: Figure something better than a console.log
						console.log("NOPE, API SAID NO");
						newDict = gridDict;
					} else {
						console.log("YEP, IT CHECKS OUT ON THE API");
						$scope.foundWords.push($scope.enteredWord);
						countScore($scope.enteredWord);
						$scope.clear();
						newDict = gridDict;
					}
				};
			});
		}
	};

	function canBeAWord(word, dict){
		word = word.toUpperCase();
		var letters = word.split('');
		var bool = true;
		letters.forEach(function(letter){
			if(dict[letter] !== "undefined" && dict[letter] > 0){
				dict[letter]--
			} else {
				bool = false;
			}
		});
		console.log("YOUR WORD IS A WORD", bool);
		return bool;
	}

	function countScore(word){
		$scope.score += word.length;
	}

	$scope.countdown = function() {
    stopped = $timeout(function() {
    	if($scope.timer == 0){
    		$scope.gameOver = true;
    	} else{
    		$scope.timer--;
    		$scope.countdown();
    	}

    }, 1000);
  };

	$scope.stop = function(){
  	$timeout.cancel(stopped);
  	$scope.timer = 60;
  	$scope.grid = [];
  	$scope.clear();
  };

  $scope.start = function(){
  	$scope.countdown();
  	$scope.renderGrid(5);
  };

	const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'
, 'V', 'W', 'X', 'Y', 'Z'];

	//Random letter selector
	function randomLetter(){
		return ALPHABET[(Math.floor(Math.random() * 25))]
	}

	//Cell constructor
	function Cell(){
		this.letter = randomLetter();
		this.highlighted = false;
	}

	//Row constructor
	function Row(length){
		var row = [];

		//iterate for length adding cells to the row
		for(var i=1;i <= length; i++){
			row.push(new Cell());
		}
		return row;
	}

	//Grid constructor
	function Grid(size){
		var grid = [];

		for(var i=1; i<= size;i++){
			grid.push(new Row(size));
		}
		gridDict = gridToDict(grid);
		return grid;
	}

	//Grid to dictionary function
	function gridToDict(grid){
		var dict = {};

		grid.forEach(function(row){
			row.forEach(function(cell){
				//Check if there is a key for that letter already
				if(dict[cell.letter] > 0){
					//If there is, then increment the integer value
					dict[cell.letter]++;
				} else {
					//If there isn't, we create that key, and set its value to 1
					dict[cell.letter] = 1;
				}
			});
		});
		return dict;
	}

	$scope.renderGrid = function(dimension){
		$scope.grid = new Grid(dimension);
	};

	$scope.highlight = function(cell){
		if(!cell.highlighted){
			cell.highlighted = true;
			$scope.enteredWord += cell.letter;
		}
	};

	$scope.clearHighlight = function(cell) {
		if(cell.highlighted) {
			cell.highlighted = false;
		};
	};

// Clears word in entered word field and clears highlighting
	$scope.clear = function() {
		console.log("I was called!")
		$scope.enteredWord = "";
		$scope.grid.forEach(function(row){
			row.forEach(function(cel){
				$scope.clearHighlight(cel);
			});
		});
	};

}]);
