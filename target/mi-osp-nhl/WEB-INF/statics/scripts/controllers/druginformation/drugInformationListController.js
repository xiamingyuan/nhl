/**
 * Created by zd on 16/3/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('drugInformationListController', ['$scope', '$rootScope','$timeout','drupinfoService',function ($scope, $rootScope,$timeout,drupinfoService) {
        $scope.drugGrid = {
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
                {name:'name', displayName: '药品分类',minWidth:80, headerCellClass:'cell-center',enableColumnResizing:false}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.drugGridApi = gridApi;
                $scope.drugGridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.drugGridOptions.sort('', '');
                    } else {
                        $scope.drugGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    // $scope.drugGridOptions.search();
                });
                //点击表格，触发选中效果
                $scope.drugGridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.entity = row.entity//用于点击查询全部按钮时药品分类取消高亮
                    $scope.categaryid = row.entity.id;
                    $scope.queryGridOptions.queryPrarms.pageIndex=1;
                    $scope.getDrupInfo();
                });
            }
        };
        $scope.drugGridOptions = $rootScope.getGridOptions();
        $scope.drugGridOptions.setQueryPrarms = function(){
            $scope.drugGridOptions.setQueryValues();
        };
        $scope.drugGridOptions.getData = function(){
            drupinfoService.getdrugclassificationlist($scope.drugGridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.drugGrid.data = data.data.datas;
                    $scope.drugGridOptions.totalCount = data.data.totalCount;
                    //默认第一条被选中，高亮显示
                    $timeout(function () {
                        $scope.drugGridApi.selection.selectRow($scope.drugGrid.data[0]);
                    }, 100);
                }else{
                    $scope.drugGrid.data = [];
                    $scope.drugGridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }

            });
        };

        //查询列表
        $scope.queryGrid = {
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
                {name:'id', displayName: '编号',width:160,headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'name', displayName: '通用名',minWidth:60,headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'dosageforms', displayName: '剂型',width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'similarName', displayName: '药品别名',width:100, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'drugGroupName', displayName: '所属分类',minWidth:120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'tags', displayName: '标签',width:120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'abbSpell', displayName: '快捷名称',width:120,  headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'edit', displayName: '操作',enableSorting: false,width:120, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '<a ng-click="grid.appScope.setDrugInfo(row.entity)" href="#drugInfoModal" data-toggle="modal" ng-if="grid.appScope.drugEdit">' +
                    '   <i class="icon-edit"></i> 编辑' +
                    '</a>' +
                    '<a ng-click="grid.appScope.deleteDrugInfo(row.entity.id)" ng-if="grid.appScope.drugDelete">' +
                    '   <i class="icon-trash-o"></i> 删除' +
                    '</a>' +
                    '</div>'
                }
            ],
            onRegisterApi: function( gridApi ) {
                $scope.queryGridApi = gridApi;
                $scope.queryGridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
                $scope.queryGridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.queryGridOptions.sort('', '');
                    } else {
                        $scope.queryGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    // $scope.queryGridOptions.search();
                });
            }
        };
        $scope.queryGridOptions = $rootScope.getGridOptions();
        $scope.queryGridOptions.setQueryPrarms = function(){
            $scope.queryGridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.queryGridOptions.getData = function(){
            $scope.pageSize = $scope.queryGridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.queryGridOptions.queryPrarms.pageIndex;   //用于序号显示
            drupinfoService.getdruginfolist($scope.queryGridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.queryGrid.data = data.data.datas;
                    $scope.queryGridOptions.totalCount = data.data.totalCount;
                    $scope.drugEdit = data.permission.drugEdit;
                    $scope.drugDelete = data.permission.drugDelete;
                }else{
                    $scope.queryGrid.data = [];
                    $scope.queryGridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };
        
        //点击查询全部操作
        $scope.getAllDatas = function (){
            $scope.drugGridApi.selection.clearSelectedRows();//清除选中行
            $scope.categaryid="";
            $scope.getDrupInfo();
        };
        //获取数据
        $scope.getDrupInfo = function (){
            $scope.searchParams={genericName:$("input[name='genericName']").val(),categaryid:$scope.categaryid};
            //此处不能写$scope.queryGridOptions.search()原因是修改完信息后获取到了第一页数据
            $scope.queryGridOptions.setQueryPrarms();
            $scope.queryGridOptions.getData();
        };
        //设置更新数据
        $scope.setDrugInfo = function (data){
            // $scope.list = data;//直接赋值的话在修改信息时表格中对应数据也是变化的,即使不点击保存表格数据也就修改,故要一一赋值
            $scope.list = {abbSpell:data.abbSpell,dosageforms:data.dosageforms,drugGroupName:data.drugGroupName,fullSpell:data.fullSpell,id:data.id,name:data.name,similarName:data.similarName,tags:data.tags};
        };
        $scope.save = function(){
            drupinfoService.updatedruginfo($scope.list).success(function (result) {
                if(result){
                    $scope.cancel();$scope.serverErrorInfo="";
                    $scope.getDrupInfo();
                }else{
                    $scope.serverErrorInfo="更新失败！";
                }
            });
        };
        //删除列表
        $scope.deleteDrugInfo= function (id) {
            bootbox.confirm("确定删除该数据？", function (result) {
                if(result){
                    drupinfoService.deletedruginfo({id:id}).success(function (result) {
                        if(result){
                            $scope.getDrupInfo();
                        }else{
                            bootbox.alert("删除失败！");
                        }
                    });
                }
            });
        };

        //关闭模态窗口
        $scope.cancel = function (){
            $("#drugInfoModal").modal("hide");
        };


        $timeout(function(){
            $scope.drugGridOptions.search();
        }, 0, false);
    }]);
});