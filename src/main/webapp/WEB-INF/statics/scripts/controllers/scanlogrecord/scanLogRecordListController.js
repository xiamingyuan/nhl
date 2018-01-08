/**
 * Created by zd on 16/3/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('scanLogRecordListController', ['$scope', '$rootScope', '$timeout', 'strUtils','scanlogrecordService', function ($scope, $rootScope, $timeout,strUtils, scanlogrecordService) {
        $scope.grid = {
            paginationPageSizes: [2, 50, 75],
            paginationPageSize: 2,
            enableSorting: true,
            useExternalSorting: true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'UserName', displayName: '用户名',width:120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'CreateTime', displayName: '创建时间', width:160, cellFilter: 'date:"yyyy-MM-dd HH:mm:ss"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'EventName', displayName: '事件名称',width:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'DevVersion', displayName: '设备版本号',width:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'AppVersion', displayName: 'APP版本号',width:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'DevType', displayName: '设备类型',minWidth:80, headerCellClass: 'cell-center', cellClass: 'cell-left'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.gridOptions.sort('', '');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    // $scope.gridOptions.search();
                });

                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        if(rowEntity.JsonDurgInfo.indexOf("<?xml")>=0){
                            $scope.JsonDurgInfos=strUtils.formatXml(rowEntity.JsonDurgInfo);//格式化xml
                        }else {
                            $scope.JsonDurgInfos = rowEntity.JsonDurgInfo;
                        }
                    }
                });
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function () {
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function () {
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            scanlogrecordService.query($scope.gridOptions.queryPrarms).success(function (data) {
                $scope.JsonDurgInfos="";//清空事件内容
                if(data.code==200){
                    $scope.grid.data = data.data.list;
                    $scope.gridOptions.totalCount = data.data.count;
                    $timeout(function () {
                        if(data.data.count>0){
                            $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                        }
                    }, 100);
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };
        
        
        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});