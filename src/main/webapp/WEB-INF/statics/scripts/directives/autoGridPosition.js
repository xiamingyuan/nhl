/**
 * Created by yincece on 2016/6/2.
 */
define(['./module'], function (directives) {
    'use strict';

    directives.directive('autoGridPosition', ['$window', '$timeout', function($window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                offset:'@'
            },
            link: function (scope, element, attr) {
                function onGridPosition() {
                    var top = $(element).prev().css("height");
                    $(element).css("top",top);
                    
                };
                $(window).resize(function() {
                    $timeout(function(){
                        onGridPosition();
                    }, 200);
                });
                onGridPosition();
            }
        };
    }]);
});
