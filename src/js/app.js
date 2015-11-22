var app = angular.module('weather', ['ngRoute'])

app.controller('mainController', ['$scope', 'weatherFactory', 'locationFactory', function ($scope, weatherFactory, locationFactory) {
    $scope.weather = null;
    $scope.locations = locationFactory.list;

    $scope.setCity = function () {
        weatherFactory.json($scope.citySelect).success(function(response) {
            $scope.weather = response;
        });
        console.log($scope.citySelect);
    }
}]);

// Factory returns the JSON file of the weather
app.factory('weatherFactory', ['$http', function ($http) {
    var weather = {};
    weather.urlStart = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    weather.urlEnd =  ',us&mode=json&appid=2de143494c0b295cca9337e1e96b00e0';
    weather.json = function (city) {
        var cityModified = city.replace(/ /g,'');
        return $http.get(weather.urlStart + cityModified + weather.urlEnd);
    }
    return weather;
}]);

// Factory returns the cities
app.factory('locationFactory', ['$http', function ($http) {
    var location = {};
    location.list = [];

    location.json = $http.get('../json/cities.json').success(function(response){
        location.list.push(response);
        // debugger;
    }).error(function(){
        console.log('error');
    });

    return location;
}]);

// Custom filter. Kelvin is returned so it needs to be converted to celcius. 'input' is angular standard.
app.filter('celciusFilter', function () {
    return function (input) {
        return input = Math.round(input - 273.15);
    }
});

// Custom filter. Gets the correct title for the image and is passed back.
app.filter('weatherFilter', function () {
    return function (input) {
        var weather = null;

        switch (input) {
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
        restrict: 'E',
        require: 'mainController',
        template: "<div class='james'>{{ interval.dt * 1000 }}</div>"
    }
});
