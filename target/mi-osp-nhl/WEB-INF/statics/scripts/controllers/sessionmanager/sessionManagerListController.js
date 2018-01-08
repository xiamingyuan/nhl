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
    controllers.controller('sessionManagerListController', ['$scope','$rootScope','$timeout','sessionmanagerService',function ($scope,$rootScope,$timeout,sessionmanagerService) {
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
                {name:'caption', displayName: '标题',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'content', displayName: '内容',minWidth:60, headerCellClass:'cell-center',cellClass: 'cell-left'},
                {name:'serviceCompany', displayName: '服务方',width:60, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'tags', displayName: '标记',width:60, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'remark', displayName: '备注',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'character_', displayName: '性质',width:60,cellFilter: 'serNewCharacter', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'type_', displayName: '类别',width:120,cellFilter: 'serNewType', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'edit', displayName: '操作',width:120,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '<a href="#sessionmanager/edit:{{row.entity.id}}" ng-if="grid.appScope.sessionEdit">' +
                    '   <i class="icon-edit"></i> 编辑' +
                    '</a>' +
                    '<a ng-click="grid.appScope.sessionMgerDelete(row.entity.id)" ng-if="grid.appScope.sessionDelete"> ' +
                    '   <i class="icon-trash-o"></i> 删除' +
                    '</a>' +
                    '</div>'
                }
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
                $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.gridOptions.sort('', '','');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction,sortColumns[0].displayName);
                        $rootScope.direction.getDirection(sortColumns[0].sort.direction);
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
            sessionmanagerService.getsessionmanagerlist($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $scope.sessionEdit = data.permission.sessionEdit;
                    $scope.sessionDelete = data.permission.sessionDelete;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };
        //删除列表
        $scope.sessionMgerDelete = function (id) {
            bootbox.confirm("确定删除该话术？", function (result) {
                if(result){
                    sessionmanagerService.deletesessioninfo({id:id}).success(function (data) {
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
       
        $timeout(function(){
            $scope.gridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
    }]);
});