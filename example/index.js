/**
 * Created by Northwalker on 15/08/26.
 */

(function () {
  'use strict';

  // var myApp = angular.module('myApp',[]);
  var myApp = angular.module('myApp', ['angular-star-rating']);

  myApp.controller('myCtrl', function ($scope) {
    $scope.isReadonly = false; // default test value
    $scope.changeOnHover = false; // default test value
    $scope.maxValue = 10; // default test value
    $scope.ratingValue = 5; // default test value
  });

})();
