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
    controllers.controller('drugDirectoryListController', ['$scope', '$http', '$rootScope', '$timeout', 'druglistService', 'strUtils',function ($scope, $http, $rootScope, $timeout,druglistService, strUtils) {
        $scope.isRCode = false;//定义选中的药品是否有监管码 默认无

        //药品目录grid
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
                {name: 'orgName', displayName: '供应商',width: 250, headerCellClass: 'cell-center'},
                {name: 'productID', displayName: 'ID', minWidth:120,headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'goodsName', displayName: '通用名',minWidth:120, headerCellClass: 'cell-center'},
                {name: 'chemicalName', displayName: '商品名',minWidth:120, headerCellClass: 'cell-center'},
                {name: 'specification', displayName: '规格',minWidth:120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'manufactEnterprise', displayName: '生产厂家',minWidth:120, headerCellClass: 'cell-center'},
                {name: 'barCode', displayName: '条形码', width: 170, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'regulateCodePrefix', displayName: '监管码前缀', width: 150, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'claimAmount', displayName: '用户报销金额', cellFilter:'getFloatDigit', width: 150, headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'status', displayName: '状态', width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 170, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-if="row.entity.status==\'下架\'&&grid.appScope.permission.druglistEnable" ng-click="grid.appScope.getId(row.entity,\'1\')">' +
                    '       <i class="icon-unlock"></i> 上架' +
                    '   </a>' +
                    '   <a ng-if="row.entity.status==\'上架\'&&grid.appScope.permission.druglistEnable" ng-click="grid.appScope.getId(row.entity,\'2\')">' +
                    '       <i class="icon-lock"></i> 下架' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.druglistEdit" href="#drugdirectory/edit/:{{row.entity.id}}" class="operate-a">' +
                    '      <i class="icon-edit"></i> 编辑' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.druglistDelete" ng-click="grid.appScope.delete(row.entity.id)">' +
                    '      <i class="icon-trash-o"></i> 删除' +
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
                        $scope.gridOptions.sort('', '');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction,sortColumns[0].displayName);
                        $rootScope.direction.getDirection(sortColumns[0].sort.direction);
                    }
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    window.localStorage.selectRow = row.grid.renderContainers.body.visibleRowCache.indexOf(row);
                    if (rowIsSelected) {
                        $scope.detail = rowEntity;
                        $scope.drugId = $scope.detail.id;
                        //搜索选中的药品更新日志
                        druglistService.GetP1DrugStateLog({id:$scope.drugId, pageIndex:1, pageSize:25, tableOrderName:'', tableOrderSort:''}).success(function (data) {
                            $scope.logGrid.data = data.data.datas;
                        });
                        //获取药品信息
                        druglistService.GetP1DrugInfo({ id: $scope.drugId}).success(function(data){
                            if(data.code ==200){
                                $scope.drugDetail = data;
                                if (data.data.isCheckRegulateCode == '1') {
                                    $scope.isRCode = true;
                                } else{
                                    $scope.isRCode = false;
                                    if ($("#lastOption").hasClass('active')) {
                                        $(".firstTab").click();
                                    }
                                }
                            }
                        });
                    }
                });
            }
        };

        $scope.searchParams = {};
        //药品查询
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            var obj = this.queryPrarms;
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
            if (obj.isEffective == ''||obj.isEffective == null) {
                obj.isEffective = "-1";
            }
            if (obj.programID == ''||obj.programID == null) {
                obj.programID = "-1";
            }
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            druglistService.GetDrugList($scope.gridOptions.queryPrarms).success(function (data) {
                $scope.detail = "";
                $scope.logGrid.data = [];
                if(data.code==200){
                    $scope.permission = data.permission;
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }

                //默认第一条被选中，高亮显示
                if(window.localStorage.selectRow&&window.localStorage.detail=='true'){
                    $scope.selectRow = window.localStorage.selectRow;
                }else{
                    $scope.selectRow = 0;
                }
                $timeout(function () {
                    $scope.gridApi.selection.selectRow($scope.grid.data[$scope.selectRow]);
                }, 100);
            });
        };


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
                    cellTemplate: '<label style="height: 100%"><input type="radio" ng-checked="row.isSelected" name="proname"/></label>'
                },
                {name: 'name', displayName: '名称', headerCellClass: 'cell-center'},
                {name: 'address', displayName: '地址', headerCellClass: 'cell-center'},
                {name: 'phone', displayName: '电话', headerCellClass: 'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                // $scope.gridApi = gridApi;
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
                if(data.code==200){
                    $scope.progrid.data = data.data.datas;
                    $scope.proGridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.progrid.data = [];
                    $scope.proGridOptions.totalCount = 0;
                }
            });
        };

        //保存选择的供应商
        $scope.getPro = function () {
            $scope.proInfor = $scope.proDetail;
            $("#proInforId").val($scope.proInfor.orgID);
            $scope.searchParams.providerID = $scope.proInfor.orgID;
            $("#proInforName").val($scope.proInfor.name);
            $scope.providerKey = $scope.proInfor.name;
            $scope.providerID = $scope.proInfor.id;
            $scope.Type = $scope.proInfor.Type;
            $scope.Abbreviation = $scope.proInfor.Abbreviation;
            if ($scope.proInfor.id == null || $scope.proInfor.id == "") {
                $scope.IsSelectProvider = "0";
            } else {
                $scope.IsSelectProvider = "1";
            }
        };

        //定义drugId 获取药品上下架操作日志
        $scope.drugId = '';
        //药品目录grid
        $scope.logGrid = {
            enableSorting: false,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'operName', displayName: '操作人', headerCellClass: 'cell-center'},
                {name: 'status', displayName: '操作', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'operTime', displayName: '上/下架时间',cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'reason', displayName: '上/下架原因', headerCellClass: 'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                // $scope.gridApi = gridApi;
                gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
            }
        };

        //清空供应商文本框内容后，把供应商id也清空，以查询全部供应商。
        $scope.providerChange = function () {
            if ($scope.providerKey == "") {
                $scope.providerID = "";
                //$scope.Type = "";
            }
        };

        $scope.getId=function(val,type){
            $scope.submitID=val.id;
            $scope.type=type;
            $scope.shelfReason="";
            $scope.shelf.shelfReason.$setUntouched();
            $scope.shelf.$setPristine();
            $('#reasonModal').modal('show');
        };

        $scope.sureShelf = function (isValid) {
            if(isValid){
                if($scope.type=="1"){
                    druglistService.EnableP1Drug({id: $scope.submitID, reason: $scope.shelfReason}).success(function (data) {
                        $scope.cancelShelf();
                        if(data.code != 200) {
                            bootbox.alert(data.msg);
                        } else{
                            bootbox.alert("上架成功");
                            $scope.gridOptions.search();
                        }
                    });
                }else{
                    druglistService.DisEnableP1Drug({id: $scope.submitID, reason: $scope.shelfReason}).success(function (data) {
                        $scope.cancelShelf();
                        if(data.code != 200) {
                            bootbox.alert(data.msg);
                        } else{
                            bootbox.alert("下架成功");
                            $scope.gridOptions.search();
                        }
                    });
                }
            }
        };

        //关闭弹窗
        $scope.cancelShelf = function () {
            $('#reasonModal').modal('hide');
        };

        //监管码grid
        $scope.rcodegrid = {
            enableSorting: false,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'regulateCode', displayName: '监管码',headerCellClass: 'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                // $scope.gridApi = gridApi;
                gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.rcodePageSize*(grid.appScope.rcodePageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
            }
        };
        $scope.rcodeGridOptions = $rootScope.getGridOptions();
        $scope.rcodeGridOptions.setQueryPrarms = function(){
            $scope.rcodeGridOptions.setQueryValues($scope.searchParams,{p1DrugID:$scope.drugId});      //查询条件搜索 类型转换方法
        };
        $scope.rcodeGridOptions.getData = function(){
            $scope.rcodePageSize = $scope.rcodeGridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.rcodePageIndex = $scope.rcodeGridOptions.queryPrarms.pageIndex;   //用于序号显示
            druglistService.GetRCode($scope.rcodeGridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.rcodegrid.data = data.data.datas;
                    $scope.rcodeGridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.rcodegrid.data = [];
                    $scope.rcodeGridOptions.totalCount = 0;
                }
            });
        };

        //查看监管码
        $scope.viewRCode = function () {
            $scope.rcodeGridOptions.search();
            $('#rcodeModal').modal('show');
        };

        //删除药品
        $scope.delete = function (id) {
            bootbox.confirm("确定删除该药品？", function (result) {
                if (result) {
                    druglistService.DeleteP1Drug({id: id}).success(function (data) {
                        if(data.code != 200) {
                            bootbox.alert(data.msg);
                        } else{
                            bootbox.alert("删除成功");
                            $scope.gridOptions.search();
                        }
                    });
                }
            });
        };

        //模板下载
        $scope.GetTemplateClick = function () {
            $("#GetTemplate").click();
        };

        //选择按钮点击
        $scope.SelectDrugFile = function (){
            $("#file").click();
            $("#DrugPath").val("");
        };

        $scope.ImportDrug = function () {
            if ($scope.IsSelectProvider != "1") {
                bootbox.alert("请选择供应商！");
                return;
            }
            if (document.getElementById('DrugPath').value == null || document.getElementById('DrugPath').value == '') {
                bootbox.alert("请先选择文件再点击上传！");
                return;
            }
            bootbox.confirm('确定导入药品目录？',function (result) {
                if (result) {
                    $("#DrugUpload").click();
                }
            });
        };
        //导入药品失败目录grid
        $scope.druggrid = {
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'productID', displayName: '产品ID',headerCellClass: 'cell-center'},
                {name: 'rebateAmountUnit', displayName: '供应商报销金额',headerCellClass: 'cell-center'},
                {name: 'p1Amount', displayName: '单位报销金额', headerCellClass: 'cell-center'},
                {name: 'reason', displayName: '失败原因', headerCellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                // $scope.gridApi = gridApi;
                gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
            }
        };
        $("#myDrugIframe").load(function () {
            document.getElementById('file').value = "";
            var iframeText = document.getElementById('myDrugIframe').contentWindow.document.body.innerHTML;
            if(iframeText) {
                var obj = eval("(" + iframeText + ")");
                if (obj.code==200) {
                    $scope.druggrid.data = obj.data;
                    $scope.totalNum= obj.totalDrugNum;
                    $scope.successNum= obj.successDrugNum;
                    $scope.failNum= obj.failDrugNum;
                    $('#templateModal').modal('show');
                }
            }
        });
        //取消
        $scope.cancel = function () {
            document.getElementById('DrugPath').value = "";
            $('#templateModal').modal('hide');
        };
        //导出导入失败的药品列表
        $scope.GetImportDrugWrongList = function () {
            if ($scope.failNum == 0) {
                $scope.IsNullList = true;
                return;
            } else {
                $scope.IsNullList = false;
                $("#ButtonExport").click();
                $scope.cancel();
            }
        };
        //搜索药品目录
        $timeout(function () {
            $scope.gridOptions.search();
            $scope.proGridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
    }])
});