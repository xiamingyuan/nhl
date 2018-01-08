/**
 * Created by localadmin on 16/6/12.
 */
define(['./module'], function (directives) {
    'use strict';

    directives.directive('divisionLine', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                scope.$watch('row.entity', function (a, b) {
                    if (a != undefined) {
                        $(element).children("span").remove();
                        var obj = $(element).children("a");
                        if (obj.length > 1) {
                            obj.each(function (i, item) {
                                if (i > 0) {
                                    $(item).before("<span> | </span>");
                                }
                            });
                        }
                    }
                });
            }
        };
    }])
});
