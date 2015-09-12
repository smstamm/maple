var app = angular.module('app', []);

app.controller('home-ctrl', ['$scope', function($scope){
	$scope.teamMembers = [
		{
			name: "Bobby",
			hometown: "South Jordan",
			avatar: "https://avatars1.githubusercontent.com/u/13859571?v=3&s=400"
		},
		{
			name: "Steph",
			hometown: "Sugarhouse",
			avatar: "https://avatars1.githubusercontent.com/u/12092523?v=3&s=400"
		},
		{
			name: "Kate",
			hometown: "Lehi",
			avatar: "https://avatars0.githubusercontent.com/u/10120733?v=3&s=400"
		},
		{
			name: "Andre",
			hometown: "Sandy",
			avatar: "https://avatars2.githubusercontent.com/u/4837992?v=3&s=400"
		},
		{
			name: "Dan",
			hometown: "Salt Lake City",
			avatar: "https://avatars1.githubusercontent.com/u/3272723?v=3&s=400"
		}
	]


}]);
