/**
 * Created by tangwenpei on 16/5/20.
 */
define(['./module'], function (directives) {
    'use strict';


    //提示工具
    directives.directive('tooltip', function () {
        return {
            restrict: "A",
            link: function (scope, element, attr) {
                var tool = element.attr('ng-bind');
                scope.$watch(tool, function (a, b) {
                    if (a != undefined || a != b) {
                        $(element).tooltip();
                        $(element).attr('data-original-title', a)
                    }
                })
            }
        }

    })
});