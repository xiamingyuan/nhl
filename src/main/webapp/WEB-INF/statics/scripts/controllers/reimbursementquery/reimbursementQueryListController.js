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
    controllers.controller('reimbursementQueryListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','claimsService','insuranceproductService',function ($scope, $http, $rootScope,$timeout,strUtils,claimsService,insuranceproductService) {
        //获取保险公司列表
        $scope.getinsurancecompany=function(){
            insuranceproductService.GetInsuranceCompany().success(function(data){
                if(data.code==200){
                    $scope.InsuranceCompanylist = data.data;
                }else{
                    $scope.InsuranceCompanylist = [];
                }
            });
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
                {name: 'insuranceName', displayName: '保险公司',width:250, headerCellClass: 'cell-center'},
                {name: 'claimSubmitId', displayName: '受理号',minWidth:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'realName', displayName: '会员',minWidth:120, headerCellClass: 'cell-center'},
                {name: 'mobilePhone', displayName: '会员电话',width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'idNumber', displayName: '身份证号',cellFilter:'certificate',width: 180,headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'goodsName', displayName: '商品名称', width: 150, headerCellClass: 'cell-center'},
                {name: 'providerName', displayName: '供应商/药店', minWidth: 150, headerCellClass: 'cell-center'},
                {name: 'createdTime', displayName: '申请时间',  width: 140,cellFilter:'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'claimAmount', displayName: '报销金额', cellFilter:'getFloatDigit', width: 120, headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'auditStatus', displayName: '当前进度', width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'}
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
                    if(rowIsSelected){
                        $scope.ClaimsInfo = rowEntity;
                        claimsService.GetCliamSearchDetail({claimRequestID: rowEntity.id, submitID: rowEntity.claimSubmitId}).success(function (data, status) {
                            $scope.submitInfo = data.submitInfo[0];
                            $scope.submitInfo.AuditStatus = "已受理";
                            $scope.providerAuditResults = data.providerAuditResults;
                            $scope.lastAuditResults = data.lastAuditResults;
                            $scope.financeAuditResults = data.financeAuditResults;
                            $scope.claimAttachment = data.claimAttachment[0];
                        });
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
            claimsService.GetCliamSearchList($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.initItemInfo();
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $timeout(function () {
                        $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                    }, 100);
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                }
            });
        };

        $scope.initItemInfo = function () {
            $scope.submitInfo = {};
            $scope.submitInfo.AuditStatus = "";
            $scope.providerAuditResults = null;
            $scope.lastAuditResults = null;
            $scope.financeAuditResults = null;
            $scope.claimAttachment = null;
            $scope.ClaimsInfo = {};
            $scope.ClaimsInfo.CreatedTime = "";
        };

        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);

    }]);
});