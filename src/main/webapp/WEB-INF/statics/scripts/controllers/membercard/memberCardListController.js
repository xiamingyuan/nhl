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
    controllers.controller('memberCardListController', ['$scope', '$rootScope', '$timeout','membercardService',function ($scope, $rootScope, $timeout, membercardService) {
        //表格渲染的数据
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
               {name: 'id', displayName: '卡号',minWidth:120,headerCellClass: 'cell-center',cellClass: 'cell-center',cellTemplate: '<div class=\'ui-grid-cell-contents\'><a href="#membercard/detail/:{{row.entity.memberID}}" ng-if="grid.appScope.membercardDetail">{{row.entity.id}}</a><span ng-if="!grid.appScope.membercardDetail">{{row.entity.id}}</span></div>'},
               {name: 'cardName', displayName: '卡类型',minWidth:100,headerCellClass: 'cell-center',cellClass: 'cell-center'},
               {name: 'status',displayName: '状态',width: 100,headerCellClass: 'cell-center',cellClass: 'cell-center',cellFilter:'StateOfHealthCardNew'},
               {name: 'memberName',displayName: '持卡人',minWidth:120,headerCellClass: 'cell-center',cellClass: 'cell-center'},
               {name: 'memberRealName',displayName: '持卡人姓名',minWidth:100,headerCellClass: 'cell-center',cellClass: 'cell-center'},
               {name: 'handler',displayName: '操作',width: 100,enableColumnResizing: false,enableSorting: false,headerCellClass: 'cell-center',cellClass: 'cell-center',
                   cellTemplate: '<div class="ui-grid-cell-contents  grid-oper-column">' +
                   '   <a href="#membercard/detail/:{{row.entity.memberID}}" ng-if="grid.appScope.membercardDetail">' +
                   '       <i class="icon-file-text-o"></i> 详情' +
                   '   </a>' +
                   '</div>'
               }
           ],
           onRegisterApi: function (gridApi) {
               $scope.gridApi = gridApi;
               $scope.gridApi.core.addRowHeaderColumn({name: 'rowHeader',displayName: '　',width: '30',cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
               $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
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
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            membercardService.query($scope.gridOptions.queryPrarms).success(function (data, status) {
                if(data.code == 200){
                    $scope.gridOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.grid.data = data.data.datas;     //返回的要渲染的数据
                    //操作权限
                    $scope.membercardDetail = data.permission.membercardDetail;
                }else {
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };


        //延时加载
        $timeout(function () {
            $scope.gridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);

    }]);
});