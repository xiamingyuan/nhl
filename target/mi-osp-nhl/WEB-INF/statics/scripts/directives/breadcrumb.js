/**
 * Created by tangwenpei on 16/5/20.
 */
define(['./module'], function (directives) {
    'use strict';

    //面包屑
    directives.directive('breadcrumb', [function () {
        return {
            restrict: 'EA',
            replace: true,
            template: '<ul class="breadcrumb">' +
            '<li><i class="icon-home"></i> 当前位置：</li>' +
            '<li>{{_breadcrumb}}</li>' +
            '</ul>',
            link: function (scope, http, element) {
                scope._breadcrumb=element.title;
            }
        }
    }])
});
