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
    controllers.controller('supplierManageListController', ['$scope', '$http', '$rootScope','$timeout','suppliermanageService',function ($scope, $http, $rootScope,$timeout,suppliermanageService) {
        //表格渲染数据
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
                {name:'name', displayName: '供应商名称',minWidth:150, headerCellClass:'cell-center',cellTemplate: '<div class=\'ui-grid-cell-contents\'><a href="#suppliermanage/edit/:{{row.entity.orgID}}" ng-if="grid.appScope.supplierEdit">{{row.entity.name}}</a><span ng-if="!grid.appScope.supplierEdit">{{row.entity.name}}</span></div>'},
                {name:'abbIsSyncToDrug', displayName: '简称',minWidth:100, headerCellClass:'cell-center'},
                {name:'address', displayName: '地址',minWidth:100, headerCellClass:'cell-center'},
                {name:'contactPerson', displayName: '联系人',width: 100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'phone', displayName: '电话',width: 120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'cisContactPerson', displayName: '对接人',width: 100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'cisContactPersonPhone', displayName: '对接人电话',width: 120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'type_', displayName: '类型',headerCellClass:'cell-center',width: 100, cellClass: 'cell-center',cellFilter: 'supplierManagementType'},
                {name:'onLineDate', displayName: '合同起始日期',headerCellClass:'cell-center',width: 120, cellClass: 'cell-center',cellFilter: 'date:"yyyy-MM-dd"'},
                {name:'offLineDate', displayName: '合同终止日期',headerCellClass:'cell-center',width: 120, cellClass: 'cell-center',cellFilter: 'date:"yyyy-MM-dd"'},
                {name:'contractStatus', displayName: '合同状态',headerCellClass:'cell-center',width: 80, cellClass: 'cell-center',cellFilter:'contractStatus'},
                {name:'p1DrugCount', displayName: '已上线产品数',headerCellClass:'cell-center',width: 90, cellClass: 'cell-center'},
                {name:'pharmacyCount', displayName: '门店数',headerCellClass:'cell-center',width: 80, cellClass: 'cell-center'},
                {name:'advancesAmount', displayName: '垫付金额',cellFilter:'getFloatDigit',width: 100,headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'advancesedAmount', displayName: '已垫付金额',cellFilter:'getFloatDigit',headerCellClass:'cell-center',width: 100, cellClass: 'cell-center'},
                {name: 'handler', displayName: '操作', width:80,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div class="ui-grid-cell-contents grid-oper-column">' +
                    '<a href="#suppliermanage/edit/:{{row.entity.orgID}}" ng-if="grid.appScope.supplierEdit">' +
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
                        $scope.gridOptions.sort('', '','');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction,sortColumns[0].displayName);
                        $rootScope.direction.getDirection(sortColumns[0].sort.direction);
                    }
                    //$scope.gridOptions.search();
                });
            }
        };

        //搜索条件查询
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.queryList,{supplierType:$scope.supplierType.selectType});      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            //引用hospitalServices中定义的http请求方式， 传入查询条件即可
            suppliermanageService.query($scope.gridOptions.queryPrarms,"get").success(function (data, status) {
                if(data.code == 200){
                    $scope.gridOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.grid.data = data.data.datas;     //返回的要渲染的数据
                    //操作权限
                    $scope.supplierEdit = data.permission.supplierEdit;
                }else {
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };


        //供应商类型
        $scope.supplierType = {
            initType: [
                { state: 0, name: "全部" },
                { state: 1, name: "生产企业" },
                { state: 2, name: "流通企业" },
                { state: 3, name: "终端企业" },
                { state: 4, name: "电商" },
                { state: 5, name: "未设定" }
            ],
            haveOptions: [],
            selectType:[]
        };


        //延时加载
        $timeout(function(){
            window.colActionSwitch = false;
            $scope.gridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
    }]);
});