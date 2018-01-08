/**
 * Created by localadmin on 2016/6/17.
 */
/**
 * Created by yincece on 2016/6/2.
 */
define(['./module'], function (directives) {
    'use strict';

    directives.directive('datepickerBottom', ['$window', '$timeout', function($window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                offset:'@'
            },
            link: function (scope, element, attr) {
                $(element).datetimepicker({
                    language:"zh-CN",
                    format: 'yyyy-mm-dd',
                    Boolean: true,
                    todayBtn: true,
                    autoclose: true,
                    minView:2
                });
            }
        };
    }]);

    directives.directive('datepickerTop', ['$window', '$timeout', function($window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                offset:'@'
            },
            link: function (scope, element, attr) {
                $(element).datetimepicker({
                    language: "zh-CN",
                    format: "yyyy-mm-dd",
                    Boolean: true,
                    todayBtn: true,
                    autoclose: true,
                    minView: 2,
                    pickerPosition: 'top-right'
                });
            }
        };
    }]);

    directives.directive('datepickerMonthBottom', ['$window', '$timeout', function($window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                offset:'@'
            },
            link: function (scope, element, attr) {
                $(element).datetimepicker({
                    language: "zh-CN",
                    format: "yyyy-mm",
                    Boolean: true,
                    todayBtn: true,
                    autoclose: true,
                    startView:3,
                    minView:3
                });
            }
        };
    }]);

    directives.directive('datepickerYmdhiBottom', ['$window', '$timeout', function($window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                offset:'@'
            },
            link: function (scope, element, attr) {
                $(element).datetimepicker({
                    language: "zh-CN",
                    format: "yyyy-mm-dd hh:ii",
                    Boolean: true,
                    todayBtn: false,
                    autoclose: true,
                    minuteStep: 1,
                    minView: 0
                });
            }
        };
    }]);
});
