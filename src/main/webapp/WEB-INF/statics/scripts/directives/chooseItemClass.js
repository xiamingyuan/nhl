/**
 * Created by tangwenpei on 16/5/20.
 */
define(['./module'], function (directives) {
    'use strict';
    directives.directive('chooseItemClass', function () {
        return {
            restrict: 'A',
            //scope: false,
            link: function ($scope, $element) {
                $scope.repeatFinish = function () {
                    $element.children(":first").addClass("auditItemClick");
                }
            }
        }
    });
});