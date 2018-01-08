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
    controllers.controller('withdrawconFirmationListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','financeService',function ($scope, $http, $rootScope,$timeout,strUtils,financeService) {
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
                {name: 'serialNumber', displayName: '提现申请号',width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'realName', displayName: '会员',minWidth:100, headerCellClass: 'cell-center'},
                {name: 'iDNumber', displayName: '身份证号',cellFilter:'certificate',width: 180, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'mobilePhone', displayName: '电话',width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'balance', displayName: '申请金额',width: 100, cellFilter: 'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'bankName', displayName: '银行名称', width: 140, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'payBankCode', displayName: '银行代码', width: 140, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'receiverAccountNO', displayName: '银行账号',width: 180,cellFilter: 'BankAccountFourGroup', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'time', displayName: '申请时间', width: 140, cellFilter: 'date:"yyyy-MM-dd"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'p1ExtractAccountBillStatus', displayName: '状态', width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 170, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-if="grid.appScope.permission.withdrawalconfirmDeal" ng-click="grid.appScope.ExtractOprate(1)">' +
                    '       <i class="icon-credit-card"></i> 同意提现' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.withdrawalconfirmDeal" ng-click="grid.appScope.ExtractOprate(2)">' +
                    '       <i class="icon-credit-card"></i> 拒绝提现' +
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
        //提现确认查询
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            financeService.GetP1ExtractList($scope.gridOptions.queryPrarms).success(function (data, status) {
                if(data.code==200){
                    $scope.permission = data.permission;
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $timeout(function () {
                        $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                    }, 100);
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        //提现操作
        $scope.ExtractOprate = function (extractType) {
            if (extractType == "0") {
                bootbox.alert("暂不支持！");
                return;
            }
            else if (extractType == "2") {
                $scope.reason="";
                $scope.pay.reason.$setUntouched();
                $scope.pay.$setPristine();
                $('#reasonModal').modal('show');
            }
            else {
                $scope.payOprate(extractType);
            }
        };

        $scope.payOprate = function (type) {
            var obj = {
                billID: $scope.detail.iD,
                reason: $scope.reason == undefined ? "" : $scope.reason,
                auditType: type
            };
            financeService.PayP1ExtractAccountBill(obj).error(function (data) {
                bootbox.alert("服务器错误！");
            }).success(function (data) {
                if(obj.auditType==2){
                    $('#reasonModal').modal('hide');
                }
                if (data.code==200) {
                    bootbox.alert( data.msg);
                    $scope.gridOptions.search();
                } else {
                    bootbox.alert("数据非法！");
                }
            });
        };

        $scope.surePay = function (valid,type) {
            if(valid){
                $scope.payOprate(type);
            }
        };

        $scope.cancelPay = function () {
            $scope.reason="";
            $scope.pay.reason.$setUntouched();
            $scope.pay.$setPristine();
            $('#reasonModal').modal('hide');
        };

        //提现审核
        $scope.AllPassas = function (auditType) {
            bootbox.confirm('确定全部通过审核？', function (result) {
                if (result) {
                    var obj = {};
                    //obj.applicant = $scope.searchParams.applicant == undefined || $scope.searchParams.applicant == null ? "" : $scope.searchParams.applicant;
                    //obj.IDNO = $scope.searchParams.IDNO == undefined || $scope.searchParams.IDNO == null ? "" : $scope.searchParams.IDNO;
                    //obj.bankName = $scope.searchParams.bankName == undefined ? '' : $scope.searchParams.bankName;
                    //obj.bankCode = $scope.searchParams.bankCode == undefined ? "" : $scope.searchParams.bankCode;
                    //obj.status = $scope.searchParams.status == undefined || $scope.searchParams.status == null || $scope.searchParams.status == "" ? "-1" : $scope.searchParams.status;
                    if($scope.searchParams==undefined){
                        $scope.searchParams.status = "-1";
                    }else{
                        $scope.searchParams.status = $scope.searchParams.status == undefined || $scope.searchParams.status == null || $scope.searchParams.status == "" ? "-1" : $scope.searchParams.status;
                    }
                    financeService.P1ExtractAuditAllPass($scope.searchParams).error(function (data) {
                        bootbox.alert("服务器错误！");
                    }).success(function (data) {
                        if (data.code==200) {
                            bootbox.alert(data.msg);
                            $scope.gridOptions.search();
                        }
                    });
                }
            });
        };

        $scope.export = function () {
            bootbox.confirm('确定导出全部清单？', function (result) {
                if (result) {
                    $("#exportAll").click();
                }
            });
        };

        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});