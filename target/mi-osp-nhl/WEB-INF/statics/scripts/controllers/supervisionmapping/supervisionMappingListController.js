/**
 * Created by zd on 2016/8/30.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('supervisionMappingListController', ['$scope', '$rootScope', '$timeout', 'supervisionmappingService', function ($scope, $rootScope, $timeout, supervisionmappingService) {
        $scope.searchParams = {};
        $scope.queryParams = {};
        $scope.queryParams.isFirstLoading = true;
        $scope.supervisionGrid = {
            paginationPageSizes: [2, 50, 75],
            paginationPageSize: 2,
            enableSorting: true,
            useExternalSorting: true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'regulatecodePrefix', displayName: '监管码前缀', width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'createtime', displayName: '扫码时间', width: 160, cellFilter: 'date:"yyyy-MM-dd HH:mm:ss"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'drugName', displayName: '商品名称', minWidth: 80, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'specification', displayName: '规格', width: 120, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'manufactEnterprise', displayName: '生产厂家', minWidth: 80, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {
                    name: 'edit',
                    displayName: '操作',
                    width: 100,
                    enableSorting: false,
                    enableColumnResizing: false,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center',
                    cellTemplate: '<div class="ui-grid-cell-contents grid-oper-column"  ng-if="row.entity.drugName==\'\'||row.entity.drugName==null">' +
                    '<a href="#supervisionModal" data-toggle="modal" ng-click="grid.appScope.matchBtnClick(row.entity.code)" ng-if="grid.appScope.codeMatching">' +
                    '   <i class="icon-external-link"></i> 匹配' +
                    '</a>' +
                    '</div>'
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.supervisionGridApi = gridApi;
                $scope.supervisionGridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.supervisionPageSize*(grid.appScope.supervisionPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.supervisionGridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    $scope.queryParams.isFirstLoading = false;
                    if (sortColumns.length == 0) {
                        $scope.supervisionGridOptions.sort('', '');
                    } else {
                        $scope.supervisionGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    // $scope.supervisionGridOptions.search();
                });
            }
        };

        $scope.supervisionGridOptions = $rootScope.getGridOptions();
        $scope.supervisionGridOptions.setQueryPrarms = function () {
            $scope.supervisionGridOptions.setQueryValues($scope.queryParams);      //查询条件搜索 类型转换方法
        };
        $scope.supervisionGridOptions.getData = function () {
            $scope.supervisionPageSize = $scope.supervisionGridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.supervisionPageIndex = $scope.supervisionGridOptions.queryPrarms.pageIndex;   //用于序号显示
            supervisionmappingService.getsupervisionlist($scope.supervisionGridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.supervisionGrid.data = data.data.datas;
                    $scope.supervisionGridOptions.totalCount = data.data.totalCount;
                    $scope.codeMatching = data.permission.codeMatching;
                }else{
                    $scope.supervisionGrid.data = [];
                    $scope.supervisionGridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        //商品信息列表
        $scope.commodityGrid = {
            paginationPageSizes: [2, 50, 75],
            paginationPageSize: 2,
            enableSorting: true,
            useExternalSorting: true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'selectAll', displayName: '选择', width: 60, enableSorting: false,enableColumnResizing:false, headerCellClass: 'cell-center', cellClass: 'cell-center', cellTemplate: '<input type="radio" name="sele" ng-checked="row.isSelected" ng-model="row.entity.selected">'},
                {name: 'manufactEnterprise', displayName: '生产厂家',minWidth: 80, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'name', displayName: '通用名',minWidth: 60, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'popularizeName', displayName: '商品名',minWidth: 60, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'specification', displayName: '规格',minWidth: 60, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'dosage', displayName: '剂型',minWidth: 60, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'unit', displayName: '单位',width:40, headerCellClass: 'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.commodityGridApi = gridApi;
                $scope.commodityGridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.commodityPageSize*(grid.appScope.commodityPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.commodityGridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.commodityGridOptions.sort('', '');
                    } else {
                        $scope.commodityGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    // $scope.commodityGridOptions.search();
                });
                $scope.commodityGridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.checkedId=row.entity.id;
                });
            }
        };
        $scope.commodityGridOptions = $rootScope.getGridOptions();
        $scope.commodityGridOptions.setQueryPrarms = function () {
            $scope.commodityGridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.commodityGridOptions.getData = function () {
            $scope.commodityPageSize = $scope.commodityGridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.commodityPageIndex = $scope.commodityGridOptions.queryPrarms.pageIndex;   //用于序号显示
            supervisionmappingService.searchdruglist($scope.commodityGridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    for (var i = 0; i < data.data.datas.length; i++) {
                        if (data.data.datas[i].id == $scope.checkedId) {
                            data.data.datas[i].selected = true;
                        }else {
                            data.data.datas[i].selected = false;
                        }
                    }
                    $scope.commodityGrid.data = data.data.datas;
                    $scope.commodityGridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.commodityGrid.data = [];
                    $scope.commodityGridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        $scope.matchBtnClick = function (code) {
            $scope.regulatecodePrefix = code;
            $scope.commodityGridOptions.search();
            supervisionmappingService.getdrugdetailinfo({regulateCode: code}).success(function (data) {
                // console.log(data);
            });
        };

        //关闭弹层
        $scope.cancel = function () {
            $("#supervisionModal").modal("hide");
        };

        $scope.saveMatch = function () {
            if ($scope.checkedId) {
                bootbox.confirm("确定执行此操作？", function (result) {
                    if (result) {
                        supervisionmappingService.updateregulatecodeprefix({ id: $scope.checkedId, regulatecodePrefix: $scope.regulatecodePrefix}).success(function (data) {
                            // if (data.code != 200) {
                            //     bootbox.alert(data.msg);
                            // } else {
                            //     bootbox.alert(data.msg);
                            //     $scope.cancel();
                            //     $scope.queryParams.isFirstLoading = false;
                            //     $scope.supervisionGridOptions.search();
                            // }
                            bootbox.alert(data.msg);
                            if (data.code == 200) {
                                $scope.cancel();
                                $scope.queryParams.isFirstLoading = false;
                                $scope.supervisionGridOptions.search();
                            }
                        });
                    }
                });
            }else{
                bootbox.alert("请选择商品后点击保存！");
            }
        };

        $timeout(function () {
            $scope.supervisionGridOptions.search();
        }, 0, false);
    }]);
});