/**
 * Created by yangdongbo on 15/6/14.
 */
define(['../module'], function (controllers) {
    'use strict';

    controllers.controller('homePageController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        window.localStorage.clear();
    }]);
});