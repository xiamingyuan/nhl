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
    controllers.controller('minusBillConfirmationListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','druglistService','financeService',function ($scope, $http, $rootScope,$timeout,strUtils,druglistService,financeService) {
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
                    cellTemplate: '<label style="height: 100%"><input type="checkbox" name="sele" data-id="{{row.entity.id}}" ng-model="row.entity.selected" ng-click="grid.appScope.recordClick(row.entity.id,row.entity.selected);"/></label>'
                },
                {name: 'providerName', displayName: '供应商',minWidth: 200, headerCellClass: 'cell-center'},
                {name: 'id', displayName: '账单号',width: 160, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'startDate', displayName: '账单期间', width: 200, headerCellClass: 'cell-center', cellClass: 'cell-center', cellTemplate:'<div class="ui-grid-cell-contents"><span ng-bind="row.entity.startDate|date:\'yyyy-MM-dd\'"></span> 至 <span ng-bind="row.entity.endDate|date:\'yyyy-MM-dd\'"></span></div>'},
                {name: 'totalAmount', displayName: '账单金额',width: 100,cellFilter: 'getFloatDigit',headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'status', displayName: '账单状态',width: 100, cellFilter: 'AccountBillStatus:row.entity.businessConfirmStatus:row.entity.providerConfirmStatus',headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'createTime', displayName: '创建时间',width: 160, cellFilter: 'date:"yyyy-MM-dd HH:mm:ss"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width:80,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<a href="#timeModal" data-toggle="modal" ng-show="row.entity.businessConfirmStatus==\'0\' && row.entity.status==\'0\'&&grid.appScope.permission.financebillDeal" ng-click="grid.appScope.InitAccountingTime($event,row.entity)">' +
                    '       <i class="icon-check-square-o"></i> 确认' +
                    '</a>' +
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
                        $scope.billDetail = rowEntity;
                        $scope.billgridOptions.search();
                    }
                });
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams,{providerID:$("#proInforId").val()});      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            financeService.GetBusinessBill($scope.gridOptions.queryPrarms).success(function (data) {
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
                gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.proPageSize*(grid.appScope.proPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.proGridOptions.sort('', '');
                    } else {
                        $scope.proGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                });
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
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

        //账单明细grid
        $scope.billgrid = {
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'claimSubmitId', displayName: '受理号', headerCellClass: 'cell-center'},
                {name: 'providerName', displayName: '供应商/药店', headerCellClass: 'cell-center'},
                {name: 'goodsName', displayName: '商品名称', headerCellClass: 'cell-center',},
                {name: 'specification', displayName: '规格', headerCellClass: 'cell-center'},
                {name: 'claimAmount', displayName: '报销金额',cellFilter: 'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'rebateUnitAmount', displayName: '结算金额',cellFilter: 'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'}
            ],
            onRegisterApi: function (gridApi) {
                gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.billpageSize*(grid.appScope.billpageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.billgridOptions.sort('', '');
                    } else {
                        $scope.billgridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                });
            }
        };
        $scope.billgridOptions = $rootScope.getGridOptions();
        $scope.billgridOptions.setQueryPrarms = function(){
            $scope.billgridOptions.setQueryValues({id:$scope.billDetail.id});      //查询条件搜索 类型转换方法
        };
        $scope.billgridOptions.getData = function(){
            $scope.billpageSize = $scope.billgridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.billpageIndex = $scope.billgridOptions.queryPrarms.pageIndex;     //用于序号显示
            financeService.GetAccountBillByRequestID($scope.billgridOptions.queryPrarms).success(function (data, status) {
                $scope.billgrid.data = data.data.datas;
                $scope.billgridOptions.totalCount = data.data.totalCount;
            });
        };

        $scope.idList=[];
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

        //导出账单
        $scope.exportBill = function () {
            bootbox.confirm('确定导出账单？', function (result) {
                if (result) {
                    var ids = "";
                    if ($scope.idList.length!=0&&$scope.idList.length == 1)
                        ids = $scope.idList[0];
                    else
                        ids = $scope.idList.join(",");
                    $("input[name='ids']").val(ids);
                    if($scope.proInfor)
                        $("input[name='providerID']").val($scope.proInfor.orgID);
                    else
                        $("input[name='providerID']").val("");
                    $("#ids").val(ids);
                    $("#exportBill").click();
                }
            });
        };

        //导出账单明细
        $scope.exportBillDetail = function () {
            if ($scope.billDetail == undefined || $scope.billDetail == null) {
                bootbox.alert("请选择账单！");
                return false;
            }
            bootbox.confirm('确定导出账单明细？', function (result) {
                if (result) {
                    $("[name='billID']").val($scope.billDetail.id);
                    $("[name='providerName']").val($scope.billDetail.providerName);
                    $("#exportBillDetail").click();
                }
            });
        };

        //重置到账日期
        var hidFinanceBillID = "";
        $scope.InitAccountingTime = function (e, item) {
            $scope.accountTime = "";
            hidFinanceBillID = item.id;
        };

        $scope.billAudit = function () {
            var financeBillID = hidFinanceBillID;
            var accTime = $scope.accountTime;
            if (financeBillID == "" || financeBillID == undefined || financeBillID == null) {
                bootbox.alert('数据有误！');
                return;
            }
            if (accTime == undefined || accTime == null || accTime == "") {
                bootbox.alert('请选择到账日期！');
                return;
            }
            if (!ComparativeTimeSize(accTime)) {
                bootbox.alert('到账日期不能大于当前日期！');
                return;
            }
            financeService.FinanceInAccount({ id: financeBillID, accountTime: accTime }).success(function (data, status) {
                if(data.code==200){
                    bootbox.alert(data.msg);
                    $scope.gridOptions.search();
                }else{
                    bootbox.alert(data.msg);
                }
            });
        };

        function ComparativeTimeSize(time) {
            var selTime = new Date(time.replace("-", "/"));
            var currentTime = new Date();
            if (selTime > currentTime) {
                return false;
            }
            return true;
        }

        $timeout(function () {
            $scope.gridOptions.search();
            $scope.proGridOptions.search();
        }, 0, false);
    }]);
});