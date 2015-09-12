var app = angular.module('app', []);

app.controller('home-ctrl', ['$scope', function($scope){
	$scope.teamMembers = [
		{
			name: "Bobby"
		},
		{
			name: "Steph"
		},
		{
			name: "Kate"
		},
		{
			name: "Andre"
		},
		{
			name: "Dan"
		}
	]
}]);
