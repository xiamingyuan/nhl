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
    controllers.controller('insurancePolicyListController', ['$scope', '$http', '$rootScope', '$timeout','insuranceproductService', 'strUtils', function ($scope, $http, $rootScope, $timeout,insuranceproductService, strUtils) {
        //获取保险公司列表
        $scope.getinsurancecompany=function(){
            insuranceproductService.GetInsuranceCompany().success(function(data){
                $scope.InsuranceCompanylist = data.data;
            })
        };
        $scope.getinsurancecompany();

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
                {name: 'corp', displayName: '保险公司',minWidth: 200, headerCellClass: 'cell-center'},
                {name: 'accountName', displayName: '保险人',width: 100, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'gender', displayName: '性别',width:50,cellFilter:'gender', headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'mobilePhone', displayName: '会员电话', width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'idNo', displayName: '身份证号', cellFilter:'certificate',width: 180, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'insuranceName', displayName: '保险产品名称', minWidth: 150, headerCellClass: 'cell-center'},
                {name: 'salesAmount', displayName: '保险金额', cellFilter:'getFloatDigit', width: 150, headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'startDate', displayName: '保单起始日期', width: 200, headerCellClass: 'cell-center', cellClass: 'cell-center', cellTemplate:'<div class="ui-grid-cell-contents"><span ng-bind="row.entity.startDate|date:\'yyyy-MM-dd\'"></span> 至 <span ng-bind="row.entity.endDate|date:\'yyyy-MM-dd\'"></span></div>'},
                {name: 'isEffective', displayName: '保单状态', width: 80, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 80, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-if="row.entity.isEffective==\'无效\'&&grid.appScope.permission.insuranceEnable" ng-click="grid.appScope.getId(row.entity.id,row.entity.isEffective)">' +
                    '       <i class="icon-check"></i> 有效' +
                    '   </a>' +
                    '   <a ng-if="row.entity.isEffective==\'有效\'&&grid.appScope.permission.insuranceEnable" ng-click="grid.appScope.getId(row.entity.id,row.entity.isEffective)">' +
                    '       <i class="icon-remove"></i> 无效' +
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
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.detail = rowEntity;
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
            insuranceproductService.GetPolicyList($scope.gridOptions.queryPrarms).success(function (data) {
                $scope.detail = '';//重置详情内容
                if(data.code==200){
                    $scope.permission = data.permission;
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
                $timeout(function () {
                    $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                }, 100);
            });
        };

        bootbox.setLocale("zh_CN");

        $scope.getId = function (id,isEffective) {
            $scope.submitId = id;
            $scope.isEffective = isEffective;
            if($scope.isEffective=='无效'){
                $scope.reason='';
                $('#enableModal').modal('show');
            }else{
                $scope.disreason='';
                $scope.disable.disreason.$setUntouched();
                $scope.disable.$setPristine();
                $('#disableModal').modal('show');
            }
        };

        //改为有效
        $scope.begin = function () {
            insuranceproductService.EnablePolicy({id: $scope.submitId, reason: $scope.reason}).success(function (data) {
                $scope.cancel();
                if (data.code != 200) {
                    bootbox.alert(data.msg);
                }else {
                    bootbox.alert("改为有效成功");
                    $scope.gridOptions.search();
                }
            });
        };

        //改为无效
        $scope.stop = function (isValid) {
            if(isValid){
                insuranceproductService.DisablePolicy({id: $scope.submitId, reason: $scope.disreason}).success(function (data) {
                    $scope.cancel();
                    if (data.code != 200) {
                        bootbox.alert(data.msg);
                    }else {
                        bootbox.alert("改为无效成功");
                        $scope.gridOptions.search();
                    }
                });
            }
        };

        $scope.cancel = function () {
            if($scope.isEffective=='无效'){
                $('#enableModal').modal('hide');
            }else{
                $('#disableModal').modal('hide');
            }
        };

        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});