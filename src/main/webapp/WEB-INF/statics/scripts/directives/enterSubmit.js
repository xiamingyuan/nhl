/**
 * Created by localadmin on 2016/6/17.
 */
/**
 * Created by yincece on 2016/6/2.
 */
define(['./module'], function (directives) {
    'use strict';

    directives.directive('enterSubmit', ['$window', '$timeout', function($window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                offset:'@'
            },
            link: function (scope, element, attr) {
                function enterToGo() {
                   $("input[type='text'],input[type='password'],input[type='number']",$(element)).keydown(function (event){
                       var keyCode = event.keyCode || event.which;//兼容性问题,event.which兼容firefox
                       if(keyCode==13)
                       {
                           $(".enter-default",$(element)).eq(0).click();
                           return false;//取消submit按钮的默认事件
                       }
                   });
                };
                enterToGo();
            }
        };
    }]);
});
