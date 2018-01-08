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
    controllers.controller('appealManageListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','accountService',function ($scope, $http, $rootScope,$timeout,strUtils,accountService) {
        $scope.grid = {
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'name', displayName: '药品名称',width: 240, headerCellClass: 'cell-center',
                    cellTemplate: '<div class=\'ui-grid-cell-contents\'><a ng-if="grid.appScope.permission.complaintmngDetail" href="#appealmanage/detail/:{{row.entity.regulationCode}}"><span ng-bind="row.entity.name"></span></a><span ng-if="!grid.appScope.permission.complaintmngDetail" ng-bind="row.entity.name"></span></div>'
                },
                {name: 'regulationCode', displayName: '监管码',minWidth: 120, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'specification', displayName: '规格',minWidth: 120, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'dosage', displayName: '剂型',minWidth: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'manufactEnterprise', displayName: '生产厂家', width: 240, headerCellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 80, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-if="grid.appScope.permission.complaintmngDetail" href="#appealmanage/detail/:{{row.entity.regulationCode}}">' +
                    '       <i class="icon-file-text-o"></i> 详情' +
                    '   </a>' +
                    '</div>'
                }
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
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction,sortColumns[0].displayName);
                        $rootScope.direction.getDirection(sortColumns[0].sort.direction);
                    }
                });
            }
        };

        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            accountService.GetComplaintDrugsList($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.permission = data.permission;
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        $timeout(function () {
            $scope.gridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
    }]);
});