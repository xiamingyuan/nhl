/**
 * Created by tangwenpei on 16/5/20.
 */
define(['./module'], function (directives) {
    'use strict';
    //loading
    directives.directive('loading', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: false,
            link: function (scope, element, attr) {
                $(element).append("<div id='loadding'><div class='loading'><img src='image/loading.gif' style='width:450px;height:300px;' /></div></div>");

                //'<div id="loadding">' +
                //'   <div class="loading">' +
                //'       <img src="image/loading.gif" style="width: 35px">' +
                //'   </div>' +
                //'</div>'
            }
        }
    }])
});
