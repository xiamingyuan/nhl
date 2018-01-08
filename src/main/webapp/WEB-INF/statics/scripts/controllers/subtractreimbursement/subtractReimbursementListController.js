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
    controllers.controller('subtractReimbursementListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','accountService',function ($scope, $http, $rootScope,$timeout,strUtils,accountService) {
        $scope.searchParams = {};
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
                {name: 'name', displayName: '合作机构',width: 250, headerCellClass: 'cell-center'},
                {name: 'minusAmount', displayName: '海虹立减金额', cellFilter:'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'}
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
                        $scope.SelectedItemInfo = rowEntity;
                        $scope.GetAuditResult();
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
            accountService.GetMinusBillPartner($scope.gridOptions.queryPrarms).success(function (data) {
                $scope.submitList = null;
                $scope.grid.data = data.data.datas;
                $scope.gridOptions.totalCount = data.data.totalCount;
                $timeout(function () {
                    $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                }, 100);
            });
        };

        $scope.GetAuditResult = function () {
            if ($scope.SelectedItemInfo == null) {
                $scope.submitList = null;
                return;
            }
            accountService.GetMinusBillDetail({ partnerID: $scope.SelectedItemInfo.id, billAlreadyStatus: $scope.searchParams.billAlreadyStatus, startTime: $scope.searchParams.sdate, endTime: $scope.searchParams.edate }).error(function (data) {
                bootbox.alert("服务器错误");
            }).success(function (data) {
                if(data.code==200){
                    $scope.submitList = data.data;
                }
            });
        };

        //生成账单
        $scope.CreatePartnerAccountBill = function () {
            var checkbox = $("#bill :checkbox");
            var ids = '';
            var billAmount = 0;
            checkbox.each(function (index) {
                var $th = $(this);
                if ($th.prop("checked")) {
                    ids += $th.attr("cid") + ",";
                    billAmount += Number(parseFloat($th.attr("arrivalamount")).toFixed(2));
                }
            });
            if (ids.length == 0) {
                bootbox.alert("请勾选需要操作的记录!");
                return;
            }else{
                ids.substring(0,ids.Length-1);
            }
            var strMessage = "本次生成账单金额：" + billAmount + "，是否确认生成账单?";
            bootbox.confirm(strMessage,function (result) {
                if (result) {
                    accountService.CreatePartnerAccountBill({ submitIDs: ids }).error(function (data) {
                        bootbox.alert("服务器错误");
                    }).success(function (data) {
                        console.log(data)
                        if(data.code==200){
                            bootbox.alert(data.msg);
                            $scope.gridOptions.search();
                        }else {
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        }

        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);

    }]);
});