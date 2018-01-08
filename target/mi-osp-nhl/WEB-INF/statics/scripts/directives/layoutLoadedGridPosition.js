/**
 * Created by localadmin on 16/9/23.
 */
define(['./module'], function (directives) {
    'use strict';

    directives.directive('layoutLoadedGridPosition', ['$window', '$timeout', function ($window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                offset: '@'
            },
            link: function (scope, element, attr) {
                //监听layout加载完毕事件
                scope.$on('ui.layout.loaded', function(evt, id) {
                    $(".grid-top-setting",$(element)).each(function (){
                        var top = $(this).prev().css("height");
                        $(this).css("top",top);
                    });
                    //表格列的动作开关（colActionSwitch）， 值为false时，该页面表格col列自适应宽度启用。  值为true时，该页面表格col列自适应宽度禁用。
                    window.colActionSwitch = false;
                });
            }
        };
    }]);
});