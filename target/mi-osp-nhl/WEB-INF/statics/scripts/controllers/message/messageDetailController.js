/**
 * Created by xietianyou on 2016/4/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('messageDetailController', ['$scope', '$http', '$rootScope', 'messageService', '$routeParams', '$timeout', '$location', 'strUtils', function ($scope, $http, $rootScope, messageService, $routeParams, $timeout, $location, strUtils) {
        window.localStorage.bol = 'true';//返回状态保持标示
        window.colActionSwitch = false; //表格列的动作开关（colActionSwitch）， 值为false时，该页面表格col列自适应宽度启用。  值为true时，该页面表格col列自适应宽度禁用。

        //发送列表grid
        $scope.grid = {
            enableSorting: true,
            useExternalSorting: true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'userName', displayName: '用户名', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'name', displayName: '姓名', width: 100, headerCellClass: 'cell-center',cellClass:'cell-center'},
                {name: 'isSucSend', displayName: '是否送达', cellFilter: 'isSend', width: 80, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'sendTime', displayName: '实际发送时间', width: 140, cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'read', displayName: '阅读', width: 60, cellFilter: 'read', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'readTime', displayName: '阅读时间', width: 140, cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'registerTime', displayName: '注册时间', width: 140, cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.pagerOptions.sort('', '');
                    } else {
                        $scope.pagerOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                });
            }
        };
        $scope.pagerOptions = $rootScope.getGridOptions();
        $scope.pagerOptions.setQueryPrarms = function () {
            $scope.searchParams = {};
            $scope.searchParams.planId = $routeParams.id.substring(1);
            $scope.pagerOptions.setQueryValues($scope.searchParams);
        };
        $scope.pagerOptions.getData = function () {
            $scope.pageSize = $scope.pagerOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.pagerOptions.queryPrarms.pageIndex;     //用于序号显示
            messageService.queryById($scope.pagerOptions.queryPrarms).success(function (data) {
                //返回列表数据
                $scope.grid.data = data.data.qsMud.datas;
                //获取消息发布数据
                $scope.mspPlan = data.data.messagePlan;
                $scope.msgcontent = $scope.mspPlan.content;

                $timeout(function () {
                    var top = $(".search-table").css("height");
                    $(".grid-top-setting").css("top",top);
                }, 0, false);

                //如果状态是取消，显示相关的取消人、取消日期等信息
                if ($scope.mspPlan.status == '3') {
                    $scope.isCancel = true;
                }
                //返回的数据总条数
                $scope.pagerOptions.totalCount = data.data.qsMud.totalCount;
            });
        };
        $timeout(function () {
            $scope.pagerOptions.search();
        }, 0, false);

        //获取消息内容
        $('#descIframe').attr("src", "message/msgcontent?planId=" + $routeParams.id.substring(1));


        $scope.comeback = function () {
            window.location.href = "#message";
        };
    }]);
});