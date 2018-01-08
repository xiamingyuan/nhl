/**
 * Created by xmy on 2016/8/29.
 */
define(['../module'], function (controllers) {
    'use strict';
    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('onlineListController', ['$scope','$rootScope', '$timeout', 'onlineService',function ($scope, $rootScope, $timeout,onlineService) {
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
                {name: 'loginName', displayName: '用户名',width:120, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'ipAddress', displayName: '登录IP',width:130, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'deviceName', displayName: '设备类型',minWidth:80, headerCellClass: 'cell-center',cellClass: 'cell-left'},
                {name: 'deviceId', displayName: '设备ID',minWidth:80, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'os', displayName: 'OS',width:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'appVersion', displayName: 'APP版本',width:80, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'loginTime', displayName: '登录时间',width:160, cellFilter: 'date:"yyyy-MM-dd HH:mm:ss"',headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'onlineTime', displayName: '登录时长',width:150, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'edit', displayName: '操作',enableSorting: false,width:120, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div division-line class="ui-grid-cell-contents grid-oper-column" ng-if="grid.appScope.userRemove">' +
                    '   <a ng-click="grid.appScope.kickOnlineUser(row.entity.sessionId)">' +
                    '      <i class="icon-sign-out"></i> 强制下线' +
                    '   </a>' +
                    '</div>'
                }
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
                    // $scope.gridOptions.search();
                });
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            onlineService.getonlinelist($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $scope.userRemove = data.permission.userRemove;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        $scope.kickOnlineUser = function (sessionId){
            bootbox.confirm("确定要此用户强制下线？", function (result) {
                if (result) {
                    onlineService.kickonlineuser({sessionId:sessionId}).success(function (data) {
                        if(data.code==200){
                            if($scope.gridOptions.totalCount==($scope.pageIndex-1)*$scope.pageSize+1){
                                window.localStorage.page--;
                                window.localStorage.page=window.localStorage.page==0?1:window.localStorage.page
                            }
                            $scope.gridOptions.getData();
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        };
        
        
        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});