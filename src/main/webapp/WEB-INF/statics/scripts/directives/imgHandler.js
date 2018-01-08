/**
 * Created by tangwenpei on 16/5/20.
 */
define(['./module'], function (directives) {
    'use strict';


    directives.directive("imgHandler", function () {
        return {
            restrict: "A",
            scope: {
                it: '='
            },
            link: function (scope, element) {
                var handlerBox = element.prev(".imgHandlerBox");
                var btnsGroup = handlerBox.children().eq(0);
                //垂直翻转
                btnsGroup.find(".Vertical").click(function () { it.vertical(); });
                //水平翻转
                btnsGroup.find(".Horizontal").click(function () { it.horizontal(); });
                //左旋转
                btnsGroup.find(".Left").click(function () { it.left(); });
                //右旋转
                btnsGroup.find(".Right").click(function () { it.right(); });
                //重置
                btnsGroup.find(".Reset").click(function () { it.reset(); });
                
                element.hover(function () {
                    handlerBox.stop().animate({
                        "top": 10,
                        "opacity": 1
                    }, 200, function () {

                    })
                }, function () {
                    handlerBox.stop().animate({
                        "top": 10,
                        "opacity": 1
                    }, 200)
                });
                var options = {
                    onPreLoad: function () { element[0].style.backgroundImage = " url('image/loading.gif')"; },
                    onLoad: function () { element[0].style.backgroundImage = ""; },
                    onError: function (err) { element[0].style.backgroundImage = ""; }
                    //zoom:0.015
                },
                it = new ImageTrans(element[0], options);
                //scope.imgHandler = it;
                scope.it = it;
                //it.load(src);
            }
        }
    });
});