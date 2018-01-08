/**
 * Created by xmy on 2016/8/30.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('supplierPipelineListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','druglistService','financeService',function ($scope, $http, $rootScope,$timeout,strUtils,druglistService,financeService) {
        $scope.idList=[];//记录选择的供应商流水单列表的ID

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
                {
                    name: 'selectAll',
                    displayName: '　',
                    width: 40,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center',
                    cellTemplate: '<label style="height: 100%"><input type="checkbox" name="sele" data-set="{{row.entity.id}}" ng-model="row.entity.selected" ng-click="grid.appScope.recordClick(row.entity.id,row.entity.selected);"/></label>'
                },
                {name: 'goodsName', displayName: '商品名称',minWidth: 200, headerCellClass: 'cell-center'},
                {name: 'barCode', displayName: '条码',width: 180, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'regulateCode', displayName: '电子监管码',width:180, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'specification', displayName: '规格',width: 140,headerCellClass: 'cell-center'},
                {name: 'providerName', displayName: '供应商',minWidth: 140,headerCellClass: 'cell-center'},
                {name: 'providerAuditOperTime', displayName: '审核时间',width: 140, cellFilter: 'date:"yyyy-MM-dd"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'purchaseCityName', displayName: '购买地区',width:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'ticketNumber', displayName: '票据号码',width: 140, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'claimAmount', displayName: '报销金额',width: 100, cellFilter: 'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'createdTime', displayName: '申请时间',width: 140, cellFilter: 'date:"yyyy-MM-dd"', headerCellClass: 'cell-center', cellClass: 'cell-center'}
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
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.setExportParams();//为导出表格设置参数
            $scope.gridOptions.setQueryValues($scope.searchParams,{providerID:$("#proInforId").val()});      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            $scope.gridOptions.queryPrarms.providerAudit = "1";
            financeService.GetProviderSerialBill($scope.gridOptions.queryPrarms).success(function (data, status) {
                $scope.grid.data = data.data.datas;
                $scope.gridOptions.totalCount = data.data.totalCount;
            });
        };

        $scope.searchParams = {};
        //供应商grid
        $scope.progrid = {
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {
                    name: 'select',
                    displayName: '选择',
                    width: 60,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center',
                    enableSorting: false,
                    cellTemplate: '<label style="height: 100%"><input type="radio" ng-checked="row.isSelected" name="sele"/></label>'
                },
                {name: 'name', displayName: '名称', headerCellClass: 'cell-center'},
                {name: 'address', displayName: '地址', headerCellClass: 'cell-center'},
                {name: 'phone', displayName: '电话', headerCellClass: 'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.proPageSize*(grid.appScope.proPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.proGridOptions.sort('', '');
                    } else {
                        $scope.proGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.proDetail = rowEntity;
                    }
                });
            }
        };
        $scope.proGridOptions = $rootScope.getGridOptions();
        $scope.proGridOptions.setQueryPrarms = function(){
            $scope.proGridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.proGridOptions.getData = function(){
            $scope.proPageSize = $scope.proGridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.proPageIndex = $scope.proGridOptions.queryPrarms.pageIndex;   //用于序号显示
            druglistService.GetProviders($scope.proGridOptions.queryPrarms).success(function (data) {
                $scope.progrid.data = data.data.datas;
                $scope.proGridOptions.totalCount = data.data.totalCount;
            });
        };

        //保存选择的供应商
        $scope.getPro = function () {
            $scope.proInfor = $scope.proDetail;
            $("#proInforId").val($scope.proInfor.orgID);
        };

        //设置参数
        $scope.setExportParams=function(){
            $("input[name='providerID']").val("");
            $("input[name='providerAudit']").val(1);
            $("input[name='time']").val("");
        };

        //导出
        $scope.exportAll = function () {
            if ($scope.grid.data.length!=0) {
                bootbox.confirm("确定导出当前列表记录？", function (result) {
                    if (result) {
                        $("#export").click();
                    }
                });
            } else {
                bootbox.alert("当前列表暂无数据无法导出！");
            }
        };

        //导出选中的
        $scope.exprotSelected = function () {
            if ($scope.idList.length!=0) {
                var ids = '';
                if ($scope.idList.length == 1)
                    ids = $scope.idList[0];
                else
                    ids = $scope.idList.join(",");
                $("input[name='ids']").val(ids);
                bootbox.confirm("确定导出当前选中列表？", function (result) {
                    if (result) {
                        $("#exprotSelected").click();
                    }
                });
            } else {
                bootbox.alert("当前暂无选中列表，数据无法导出！");
            }
        };

        //每次点击记录一次
        $scope.recordClick = function (id, isSelected) {
            if (isSelected) {  //选中
                var isExists = false;
                for (var i = 0; i < $scope.idList.length; i++) {
                    if ($scope.idList[i] == id) {
                        isExists = true;
                    }
                }
                if (!isExists) {
                    $scope.idList.push(id);
                }
            } else {//取消
                for (var i = 0; i < $scope.idList.length; i++) {
                    if ($scope.idList[i] == id) {
                        $scope.idList.splice(i, 1);
                    }
                }
            }
        };

        $timeout(function () {
            $scope.gridOptions.search();
            $scope.proGridOptions.search();
        }, 0, false);
    }]);
});