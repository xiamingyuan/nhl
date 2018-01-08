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
    controllers.controller('userListController', ['$scope','$rootScope', '$timeout', 'userlistService',function ($scope, $rootScope, $timeout,userlistService) {
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
                {name: 'loginName', displayName: '用户名',width:120, headerCellClass: 'cell-center',cellClass: 'cell-center',cellTemplate: '<div class=\'ui-grid-cell-contents\'><a href="#userlist/detail/:{{row.entity.id}}" ng-if="grid.appScope.userDetail"><span ng-bind="row.entity.loginName"></span></a><span ng-bind="row.entity.loginName" ng-if="!grid.appScope.userDetail"></span></div>'},
                {name: 'realName', displayName: '姓名',width:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'nickName', displayName: '昵称',minWidth:60, headerCellClass: 'cell-center',cellClass: 'cell-left'},
                {name: 'gender', displayName: '性别', width:50,cellFilter:'genderName', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'birthday', displayName: '出生日期',width:100, cellFilter: 'date:"yyyy-MM-dd"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'authenStatus', displayName: '资格认证',width:80,cellFilter: 'isauthen', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'registerTime', displayName: '注册时间', width: 140, cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'lastLoginTime', displayName: '上次登录时间', width: 140, cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'edit', displayName: '操作',enableSorting: false,width:130, enableColumnResizing:false, headerCellClass:'cell-center',cellClass: 'cell-left',
                    cellTemplate:
                    '<div division-line class="ui-grid-cell-contents  grid-oper-column">' +
                    '   <a href="#userlist/detail/:{{row.entity.id}}" ng-if="grid.appScope.userDetail">' +
                    '       <i class="icon-file-text-o"></i> 详情' +
                    '   </a>' +
                    '   <a style="cursor:pointer" ng-click="grid.appScope.doctorAudit(row.entity);" class="operate-a" ng-if="grid.appScope.doctorauditDeal&&row.entity.authenStatus!=2">' +
                    '      <i class="icon-check"></i> 认证通过' +
                    '   </a>' +
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
                    // $scope.gridOptions.search();
                });
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            userlistService.getuserlist($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $scope.userDetail = data.permission.userDetail;
                    $scope.doctorauditDeal = data.permission.doctorauditDeal;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        $scope.doctorAudit =function (id) {
            bootbox.confirm("确定认证通过？", function (result) {
                if(result){
                    userlistService.setDoctorAuditStatus(id).success(function (data) {
                        if(data.code==200){
                            $scope.gridOptions.search();
                        }else {
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        };

        $timeout(function () {
            $scope.gridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
    }]);
});