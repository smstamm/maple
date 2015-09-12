var app = angular.module('app', []);

app.controller('home-ctrl', ['$scope','$timeout', function($scope, $timeout){
	//Alphabet array
	$scope.grid = [];
	$scope.timer = 60;
	$scope.enteredWord = "";
	var stopped;

	$scope.submit = function(){

	}

	function validate(){
		var url = "http://en.wiktionary.org/w/api.php?action=query&titles=" + $scope.enteredWord + "&format=json&callback=?";

		$.getJSON(url, function(data) {
			for(prop in data.query.pages){
				if(prop === "-1"){
					console.log("NOPE")
				} else {
					console.log("ITS A WORD")
				}
			};
		});
	}

	$scope.countdown = function() {
    stopped = $timeout(function() {
    	$scope.timer--;
    	$scope.countdown();
    }, 1000);
  };

	$scope.stop = function(){
  	$timeout.cancel(stopped);
  	$scope.timer = 60;
  	$scope.grid = [];
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

		return grid;
	}

	$scope.renderGrid = function(dimension){
		$scope.grid = new Grid(dimension);
	};

	$scope.highlight = function(cell){
		if(!cell.highlighted){
			cell.highlighted = true;
			$scope.enteredWord += cell.letter;
		}
	}
}]);
