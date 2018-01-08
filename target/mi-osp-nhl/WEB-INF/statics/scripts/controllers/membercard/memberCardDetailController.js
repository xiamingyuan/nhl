/**
 * Created by zd on 26/8/18.
 */
define(['../module'], function (controllers) {
    'use strict';
    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('memberCardDetailController', ['$scope', '$http', '$rootScope', '$timeout', '$routeParams','membercardService',function ($scope, $http, $rootScope, $timeout, $routeParams,membercardService) {
        window.localStorage.bol = 'true';//返回状态保持标示
        //表格渲染数据
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
                {name: 'loginName',displayName: '用户名',minWidth:100,headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'realName',displayName: '姓名',minWidth:100,headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'gender',displayName: '性别',width:50,cellFilter:'gender',headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'idNumber',displayName: '身份证号',cellFilter:'certificate',width: 180,headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'mobilePhone',displayName: '手机号码',minWidth:120,headerCellClass: 'cell-center',cellClass: 'cell-center'},
                //{name: 'email', displayName: '邮箱地址', headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'birthday',displayName: '出生日期',width: 140,cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'registerTime',displayName: '注册日期',width:140,cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass: 'cell-center',cellClass: 'cell-center'}
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
                    //$scope.gridOptions.search();
                });
            }
        };

        //搜索条件查询
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues({memberId:$routeParams.id.substring(1)});
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            membercardService.getcardinfodetail($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.data.result){
                    $scope.result = [];
                    $scope.result.push(data.data.result);
                    $scope.grid.data = $scope.result;
                    $scope.gridOptions.totalCount = $scope.result.length;
                }
            });
        };


        //详情页返回列表按钮
        $scope.back = function (){
            window.location.href = "#membercard";
        };


        //延时加载
        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});