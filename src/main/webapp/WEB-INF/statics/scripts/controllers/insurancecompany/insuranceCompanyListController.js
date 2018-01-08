/**
 * Created by zd on 2016/8/29.
 */
define(['../module'], function (controllers) {
    'use strict';
    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('insuranceCompanyListController', ['$scope', '$rootScope', '$timeout','insurancecompanyService', function ($scope, $rootScope, $timeout,insurancecompanyService) {
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
                {name:'name', displayName: '保险公司名称',minWidth:120, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'abbreviation', displayName: '简称',minWidth:60, headerCellClass:'cell-center',cellClass: 'cell-left'},
                {name:'address', displayName: '地址',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'contactPerson', displayName: '联系人',width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'tel', displayName: '电话',width:150, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'edit', displayName: '操作', width:100,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div class="ui-grid-cell-contents grid-oper-column">' +
                    '<a ng-click="grid.appScope.editInfo(row.entity.orgID)" class="operate-a" ng-if="grid.appScope.insuranceEdit">' +
                    '   <i class="icon-edit"></i> 编辑' +
                    '</a>' +
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
            $scope.pageSize =$scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex =$scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            insurancecompanyService.getinsurancecompanylist($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $scope.insuranceEdit = data.permission.insuranceEdit;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        
        //编辑数据
        $scope.editInfo = function (id){
            //获取数据
            insurancecompanyService.getcompanyinfobyid({id: id}).success(function (data) {
                if(data.data){
                    $("#editCompanyModal").modal();
                    $scope.list = data.data;
                }
                else{
                    bootbox.alert("获取数据异常,请重新获取！");
                }
            });
        };
        //保存数据
        $scope.save = function (){
            insurancecompanyService.saveinfo($scope.list).success(function (data) {
                if (data.code != 200) {
                    $scope.serverErrorInfo = data.msg;
                }
                else {
                    $scope.cancel();$scope.serverErrorInfo="";
                    $scope.gridOptions.getData();
                }
            });
        };
        //隐藏弹出层
        $scope.cancel = function (){
            $("#editCompanyModal").modal("hide");
        };
        
        //延迟查询数据
        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);

    }]);
});