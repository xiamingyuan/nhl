/**
 * Created by yangdongbo on 16/3/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('messageListController', ['$scope', '$http', '$rootScope', '$timeout', 'messageService', 'strUtils', function ($scope, $http, $rootScope, $timeout, messageService, strUtils) {
        //列表
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
                {
                    name: 'title',
                    displayName: '消息标题',
                    minWidth:120,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-left',
                    cellTemplate: '<div class="ui-grid-cell-contents"><a href="#message/messagedetail/:{{row.entity.id}}" ng-if="grid.appScope.msgDetail">{{row.entity.title}}</a><span ng-if="!grid.appScope.msgDetail">{{row.entity.title}}</span></div>'
                },
                {name: 'isAllUser', displayName: '接收人', width: 80, cellFilter: 'isAllUser', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'creatorName', displayName: '发布人', width: 80, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'publishTime', displayName: '发送时间', width: 160, cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'createTime', displayName: '发布时间', width: 160, cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'status', displayName: '发送状态', width: 80, cellFilter: 'sendStatus', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {
                    name: 'pubNum',
                    displayName: '发送人数',
                    width: 80,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center',
                    cellTemplate: '<div auto_center class="ui-grid-cell-contents">' +
                    '<span style="color: #97CF87">{{row.entity.sucPubNum}}</span>' +
                    '<span>/</span>' +
                    '<span style="color: red" ng-if="row.entity.status==1 || row.entity.status==2 ">{{row.entity.failPubNum}}</span>' +
                    '<span style="color: red" ng-if="row.entity.status==0 || row.entity.status==3 ">0</span>' +
                    '<span>/{{row.entity.pubNum}}</span>' +
                    '</span>' +
                    '</div>'
                },
                {name: 'read', displayName: '阅读数', width: 60, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {
                    name: '_oper',
                    displayName: '操作',
                    width: 120,
                    enableSorting: false,
                    enableColumnResizing: false,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center',
                    cellTemplate: '<div division-line ng-if="row.entity.status == 0" class="ui-grid-cell-contents  grid-oper-column">' +
                    '   <a style="cursor:pointer" ng-click="grid.appScope.cancel(row.entity);" class="operate-a" ng-if="grid.appScope.msgCancel">' +
                    '      <i class="icon-ban"></i> 取消' +
                    '   </a>' +
                    '   <a href="#message/edit/:{{row.entity.id}}/:{{row.entity.pubNum}}" class="operate-a" ng-if="grid.appScope.msgEdit">' +
                    '       <i class="icon-edit"></i> 编辑' +
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
                        $scope.gridOptions.sort('', '', '');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction, sortColumns[0].displayName);
                        // $rootScope.direction.getDirection(sortColumns[0].sort.direction);
                    }
                    // $scope.gridOptions.search();
                });
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function () {
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function () {
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            messageService.query($scope.gridOptions.queryPrarms).success(function (data) {
                if (data.code == 200) {
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $scope.msgDetail = data.permission.msgDetail;
                    $scope.msgEdit = data.permission.msgEdit;
                    $scope.msgCancel = data.permission.msgCancel;
                } else {
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };


        //查询消息发送类型
        messageService.getMsgType().success(function (data) {
            $scope.msgType = data.messageType;
        });

        //取消发布
        $scope.cancel = function (val) {
            bootbox.setLocale("zh_CN");
            bootbox.confirm("确定取消发布此条消息？", function (result) {
                if (result) {
                    messageService.cancel({planId: val.id}).success(function (data) {
                        $scope.gridOptions.search();
                        var message = data.msg;
                        bootbox.alert(message);
                    });
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