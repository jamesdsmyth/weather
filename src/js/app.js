var app = angular.module('weather', ['ngRoute'])

app.controller('mainController', ['$scope', 'weatherFactory', function($scope, weatherFactory) {
    $scope.weather = null;
    weatherFactory.json().success(function(response) {
        $scope.weather = response;
    });
}]);

// Factory returns the JSON file of the city.
app.factory('weatherFactory', ['$http', function($http) {
    var weatherJson = {};
    weatherJson.json = function () {
        return $http.get('http://api.openweathermap.org/data/2.5/forecast?id=2643743&APPID=d59ec95d5562a7eced9ca8454c2115e2');
    }
    return weatherJson;
}]);

// Custom filter. Kelvin is returned so it needs to be converted to celcius. 'input' is angular standard.
app.filter('celciusFilter', function() {
    return function (input) {
        return input = Math.round(input - 273.15);
    }
});

// Custom filter. Gets the correct title for the image and is passed back.
app.filter('weatherFilter', function() {
    return function (input) {
        var weather = null;

        switch(input) {
            case 'Clear':
                weather = 'sun';
                break;
            case 'Clouds':
                weather = 'clouds';
                break;
            case 'Rain':
                weather = 'rain';
                break;
        }
        return input = weather;
    }
});

// create a directive for the weather li. This will allow me to do the clothes.
//
app.directive('weatherInterval', function(){
    return {
        template: "<div class='james'>aass</div>"
    }
});
