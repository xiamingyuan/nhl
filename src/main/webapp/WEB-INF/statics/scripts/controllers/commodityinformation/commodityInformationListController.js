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
    controllers.controller('commodityInformationListController', ['$scope', '$rootScope','$timeout','commodityinformationService',function ($scope,$rootScope,$timeout,commodityinformationService) {
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
                {name:'productID', displayName: '产品ID',width:220, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'manufactEnterprise', displayName: '生产厂家',minWidth:80, headerCellClass:'cell-center',cellClass: 'cell-left'},
                {name:'name', displayName: '通用名', width:120, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'popularizeName', displayName: '商品名', width:110,headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'barcode', displayName: '条码',width:120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'regulatecodePrefix', displayName: '监管码前缀', width:80,headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'specification', displayName: '规格', width:150,headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'dosage', displayName: '剂型', width:100,headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'unit', displayName: '单位', width:40,headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'singleMaxClaim', displayName: '月限量',width:50,cellFilter: 'validValue', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'Edit', displayName: '操作',width:120,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '<a href="#commodityinformation/edit:{{row.entity.id}}" ng-if="grid.appScope.goodsEdit">' +
                    '   <i class="icon-edit"></i> 编辑' +
                    '</a>' +
                    '<a ng-click="grid.appScope.comInfoDelete(row.entity.id)" ng-if="grid.appScope.goodsDelete"> ' +
                    '   <i class="icon-trash-o"></i> 删除' +
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
                    // $scope.gridOptions.search();
                });
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.setExportParams();
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize =$scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex =$scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            commodityinformationService.getcommodityinformationlist($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $scope.goodsEdit = data.permission.goodsEdit;
                    $scope.goodsDelete = data.permission.goodsDelete;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        $scope.infoFailGrid = {
            paginationPageSizes: [2, 50, 75],
            paginationPageSize: 2,
            enableSorting: false,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name:'productID', displayName: '产品ID', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'name', displayName: '通用名',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'popularizeName', displayName: '商品名',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'manufactEnterprise', displayName: '生产厂家', headerCellClass:'cell-center',cellClass: 'cell-center'},
                {name:'barcode', displayName: '条码',width:120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'regulatecodePrefix', displayName: '监管码前缀', width:80,headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'specification', displayName: '规格',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'dosage', displayName: '剂型',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'unit', displayName: '单位',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'singleMaxClaim', displayName: '月限量',cellFilter: 'validValue', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'failReason', displayName: '失败原因',width:120, headerCellClass:'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.failGridApi = gridApi;
                $scope.failGridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
            }
        };

        $scope.typeFailGrid = {
            paginationPageSizes: [2, 50, 75],
            paginationPageSize: 2,
            enableSorting: false,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name:'productID', displayName: '产品ID',width:220, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'typeOne', displayName: '分类1', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'typeTwo', displayName: '分类2', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'typeThree', displayName: '分类3', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'failReason', displayName: '失败原因',width:120, headerCellClass:'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.typeFailGridApi = gridApi;
                $scope.typeFailGridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
            }
        };

        //设置导出参数
        $scope.setExportParams=function(){
            $("input[name='formManufactEnterprise']").val($("input[name='formManufactEnterprise']").val());
            $("input[name='formPopularizeName']").val($("input[name='popularizeName']").val());
            $("input[name='formDrugName']").val($("input[name='drugName']").val());
            $("input[name='formProductID']").val($("input[name='productID']").val());
            $("input[name='formBarCode']").val($("input[name='barCode']").val());
            $("input[name='formRegulatecode']").val($("input[name='regulatecode']").val());
        };
        //模板下载
        $scope.exportTemplet = function (){
            $("#exportTemplet").click();
        };
        //导出按钮点击
        $scope.exportData = function (){
            if ($scope.grid.data.length!=0) {
                bootbox.confirm("确定导出当前列表记录？", function (result) {
                    if (result) {
                        $("#exportData").click();
                    }
                });
            } else {
                bootbox.alert("当前列表暂无数据无法导出！");
            }
        };
        //选择按钮点击
        $scope.selectFile = function (){
            $("#infoFile").click();
        };
        //信息导入按钮点击
        $scope.importCommodity = function (){
            var fileName = $("#infoPath").val();
            if(fileName && fileName.lastIndexOf('.')!=-1){
                var validFileType = /\.xls|\.xlsx/;
                var type =fileName.substring(fileName.lastIndexOf('.'));
                if(validFileType.test(type)){
                    bootbox.confirm("确定导入？", function (result) {
                        if (result) {
                            $("#loading").show();
                            $("input[name='importType']").val("info");
                            $("#importCommodity").click();
                        }
                    });
                }else{
                    bootbox.alert("请选择有效文件！");
                }
            }else{
                bootbox.alert("请选择有效文件！");
            }
        };
        //信息导入成功
        $scope.importSuccess = function (totalCount,errorCount,successCount,type){
            if(totalCount==0){
                bootbox.alert("模板中无数据！");
            }else if(errorCount==0){
                bootbox.alert("数据已全部成功导入");
                $scope.gridOptions.getData();
            } else{
               $(".modal-data-count").text("导入数据总共"+totalCount+"条，成功上传"+successCount+"条数据，失败"+errorCount+"条数据");
                commodityinformationService.getimportfaillist().success(function (data){
                    if(type=="info"){
                        $("#importInfoFailA").click();
                        // $("#importInfoFailModal").modal();
                        $scope.infoFailGrid.data = data.data;
                    }
                    else{
                        $("#importTypeFailA").click();
                        // $("#importTypeFailModal").modal();
                        $scope.typeFailGrid.data = data.data;
                    }
                    if(totalCount==errorCount){
                        $scope.gridOptions.getData();
                    }
                });
            }
        };
        //导入出错
        $scope.importFail = function (errorMsg){
            //
            bootbox.alert("导入失败,请检查上传的文件！");
        };
        //导入商品类型点击
        $scope.importType = function (){
            $("#typeFile").click();
        };
        //检测商品类型文件
        $scope.checkTypeFile = function (){
            var fileName = $("#typePath").val();
            if(fileName && fileName.lastIndexOf('.')!=-1){
                var validFileType = /\.xls|\.xlsx/;
                var type =fileName.substring(fileName.lastIndexOf('.'));
                if(validFileType.test(type)){
                    $("#loading").show();
                    $("input[name='importType']").val("type");
                    $("#importType").click();
                }else{
                    $("#typeFile").val("");//清空商品类型导入文件名
                    bootbox.alert("请选择有效文件！");
                }
            }else{
                $("#typeFile").val("");//清空商品类型导入文件名
                bootbox.alert("请选择有效文件！");
            }
        };
        //删除列表
        $scope.comInfoDelete = function (id) {
            bootbox.confirm("确定删除该商品？", function (result) {
                if(result){
                    commodityinformationService.deletecommodity({id:id}).success(function (data) {
                        if(data.code==201){
                            bootbox.alert(data.msg);
                        }else{
                            if($scope.gridOptions.totalCount==($scope.pageIndex-1)*$scope.pageSize+1){
                                window.localStorage.page--;
                                window.localStorage.page=window.localStorage.page==0?1:window.localStorage.page
                            }
                            $scope.gridOptions.getData();
                        }
                    });
                }
            });
        };

        //弹层取消
        $scope.cancel = function (){
            $("#importInfoFailModal").modal("hide"); $("#importTypeFailModal").modal("hide");
            $("input[name='importType']").val("");//清空当前导入操作标示
            $("#typeFile").val("");//清空商品类型导入文件名
            $(".modal-data-count").text("");$scope.infoFailGrid.data=[];$scope.typeFailGrid.data=[];
        };

        $timeout(function(){
            $scope.gridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
    }]);
});