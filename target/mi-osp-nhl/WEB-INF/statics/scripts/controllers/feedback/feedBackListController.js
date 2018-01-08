/**
 * Created by zd on 16/8/30.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('feedBackListController', ['$scope', '$rootScope','$timeout','feedbackService',function ($scope, $rootScope,$timeout,feedbackService) {
        //表格渲染的数据
        $scope.grid = {
            paginationPageSizes: [2, 50, 75],
            paginationPageSize: 2,
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name:'content', displayName: '内容', minWidth:200,headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'loginName', displayName: '用户名', width:120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'realName', displayName: '姓名', width:100, headerCellClass:'cell-center',cellClass: 'cell-center'},
                {name:'createTime', displayName: '提交时间',width:140,cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
                $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.gridOptions.sort('', '');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    //$scope.gridOptions.search();
                });
            }
        };

        //搜索条件查询
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            feedbackService.query($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code == 200){
                    $scope.gridOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.grid.data = data.data.datas;     //返回的要渲染的数据
                }else {
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };


        //延时加载
        $timeout(function(){
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});