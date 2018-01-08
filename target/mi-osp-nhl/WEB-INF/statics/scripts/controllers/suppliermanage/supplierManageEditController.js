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
    controllers.controller('supplierManageEditController', ['$scope', '$http', '$rootScope','$timeout','$routeParams','$filter','suppliermanageService','strUtils',function ($scope, $http, $rootScope,$timeout,$routeParams,$filter,suppliermanageService,strUtils) {
        window.localStorage.bol = 'true';//返回状态保持标示
        //定义操作功能
        $scope.IsAddPharmacy = "1";  //药店新增
        $scope.hasPic = 0;
        $scope.hasIcon = 0;
        $("#providerID").val($routeParams.id.substring(1));//获取ID
        $scope.hidePharmacyDetails = false;
        $scope.isVerification = false; //详情验证变量
        $scope.idList = [];         //定义勾选集合,存储所有的勾选记录
        $scope.isAll = false;        //设置全选复选框的默认值
        $("#providerID").val($routeParams.id.substring(1));//获取ID


        //获取基本信息
        $scope.getsupplierbyid=function(){
            suppliermanageService.GetSupplierById({id: $routeParams.id.substring(1)}).success(function (data) {
                $scope.datas = data.data;
                if($scope.datas.abbIsSyncToDrug==null){
                    $scope.datas.abbIsSyncToDrug = 0;
                }
                $scope.datas.onLineDate = data.data.onLineDate != null ? $filter('date')(new Date(data.data.onLineDate), 'yyyy-MM-dd') : null;
                $scope.datas.offLineDate = data.data.offLineDate != null ? $filter('date')(new Date(data.data.offLineDate), 'yyyy-MM-dd') : null;
                if($scope.datas.picUrl != null){
                    $scope.datas.preferentialImg = "downloadfile?dfsFile=" + $scope.datas.picUrl + "&userid=";
                }else {
                    $scope.datas.preferentialImg = "image/nopic.gif";
                }
            });
        };
        $scope.getsupplierbyid();


        //上传图片，保存图片
        $scope.imgUrl = 'image/nopic.gif';
        $scope.selectFileImg = function () {
            $("#fileImg").click();
        };
        $scope.uploadImg = function (valid){
            $scope.isVerification = true;
            if(valid){
                bootbox.confirm("确定保存修改？", function (result) {
                    if(result){
                        if($("input[name='picName']").val()){
                            $("#upload").click();
                        }else {
                            $scope.update(valid);
                        }
                    }
                });
            }
        };
        $scope.imgErrorMsg = function (msg){
            bootbox.alert(msg);
        };

        //删除图片
        $scope.deleteFileImg = function () {
            $("input[name='fileImg']").val('');
            $("input[name='picName']").val('');
            $scope.datas.picUrl = "";
            $scope.datas.preferentialImg = "";
            $("#output").prop('src', "image/nopic.gif");
        };


        //保存左侧详情
        $scope.update = function () {
            suppliermanageService.updateSupplier($scope.datas).success(function (data) {
                if(data.code==201){
                    bootbox.alert(data.msg);
                }else{
                    $scope.back();
                }
            });
        };


        //列表页数据表格
        $scope.grid = {
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
                {name: 'selectAll',displayName: '',
                    headerCellTemplate: '<input type="checkbox" id="isAll" ng-model="isAll" ng-click="grid.appScope.selectAll();" style="margin: 9px 5px 0px 6px;"/>',
                    width: 40,enableSorting: false,headerCellClass: 'cell-center',cellClass: 'cell-center',
                    cellTemplate: '<input type="checkbox" name="sele" cid="{{row.entity.id}}" ng-model="row.entity.selected" ng-click="grid.appScope.recordClick($event,row.entity)">'
                },
                {name:'serialNumber', displayName: '编号',width: 120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'name', displayName: '名称',minWidth: 80, headerCellClass:'cell-center'},
                {name:'address', displayName: '地址',minWidth: 80, headerCellClass:'cell-center'},
                {name:'phone', displayName: '电话',width: 120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'areaName', displayName: '区域',width: 80, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'state', displayName: '状态',width: 50, headerCellClass:'cell-center', cellClass: 'cell-center',cellFilter:'getPharmacyState'},
                {name: 'edit', displayName: '操作',width: 80,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-click="grid.appScope.EnablePharmacyType(row.entity.id)" ng-show="row.entity.state==0" class="operate-a">' +
                    '      <i class="icon-lock"></i> 上架' +
                    '   </a>' +
                    '   <a ng-click="grid.appScope.DisablePharmacyType(row.entity.id)" ng-hide="row.entity.state==0" class="operate-a">' +
                    '      <i class="icon-unlock" ></i> 下架' +
                    '   </a>' +
                    '</div>'
                }
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
                $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.gridOptions.sort('', '');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    $scope.gridOptions.search();
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.hidePharmacyDetails = true;
                        $scope.detail={};
                        $scope.selectRowEntity=rowEntity;
                        $("#btnEdit").removeAttr("disabled");
                        $("#btnDelete").removeAttr("disabled");
                        $scope.IsAddPharmacy = "0";
                        for(var key in rowEntity){
                            $scope.detail[key]=rowEntity[key];
                        }
                    }
                });
            }
        };

        //搜索条件查询
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues({providerID:$routeParams.id.substring(1)});
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnDelete").attr("disabled", "disabled");
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = parseInt(window.localStorage.page);   //用于序号显示
            $scope.gridOptions.queryPrarms.pageIndex = parseInt(window.localStorage.page);
            suppliermanageService.getPharmacyByProviderId($scope.gridOptions.queryPrarms).success(function (data, status) {
                if(data.code == 200){
                    $("#isAll").prop("checked",false);
                    $scope.isAll = false;
                    $scope.gridOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.grid.data = data.data.datas;    //返回的要渲染的数据
                }else {
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };


        //提取全选
        $scope.selectAll = function () {
            $scope.isAll =  !$scope.isAll;
            if($scope.isAll){
                $($scope.grid.data).each(function(){
                    this.selected = true;
                    if($scope.idList.indexOf(this.id)==-1){
                       $scope.idList.push(this.id);
                    }
                } );
            }else{
                $scope.idList=[];
                $($scope.grid.data).each(function(){
                    this.selected = false;
                } );
            }
        };

        //每次点击记录一次
        $scope.recordClick = function (e,entity) {
            var isSelected = $(e.target).prop("checked");
            if(isSelected){
                $scope.idList.push(entity.id);
            }else{
                $scope.idList.splice($scope.idList.indexOf(entity.id),1);
            }
            if($scope.idList.length==$scope.grid.data.length){
                $scope.isAll=true;
            }else{
                $scope.isAll=false;
            }
            $("#isAll").prop("checked",$scope.isAll);
        };

        //上架
        $scope.EnablePharmacyType = function (id) {
            bootbox.confirm("确定上架？", function (result) {
                if (result) {
                    suppliermanageService.EnablePharmacyType({id: id}).success(function (data) {
                        if(data.code != 200)
                        {
                            bootbox.alert(data.msg);
                        }
                        else{
                            $scope.idList = [];
                            $scope.isAll = false;
                            $scope.detail.state = "1";
                            $scope.selectRowEntity.state=1;
                        }
                    });
                }
            });
        };

        //下架
        $scope.DisablePharmacyType = function (id) {
            bootbox.confirm("确定下架？", function (result) {
                if (result) {
                    suppliermanageService.DisablePharmacyType({id: id}).success(function (data) {
                        if(data.code != 200) {
                            bootbox.alert(data.msg);
                        }
                        else{
                            $scope.idList = [];
                            $scope.isAll = false;
                            $scope.detail.state = "0";
                            $scope.selectRowEntity.state=0;
                        }
                    });
                }
            });
        };

        $scope.auditAllSelected = function (type) {
            if($scope.idList.length>0){
                bootbox.confirm("确定要执行此操作？", function (result) {
                    if (result) {
                        var Reason = "";
                        var orgId = $scope.datas.orgID;
                        suppliermanageService.PharmacyByIds({type: type, ids: $scope.idList, orgId: orgId, Reason: Reason}).success(function (data) {
                            if (data.code == 200) {
                                bootbox.alert(data.msg);
                                $("#gridTbody input[type='checkbox']").removeAttr('checked');
                                $scope.idList = [];
                                $scope.isAll = false;
                                $scope.detail = {};
                                $scope.gridOptions.search();
                            }else {
                                bootbox.alert(data.msg);
                            }
                        });
                    }
                });
            }else{
                bootbox.alert("请选择药店！");
            }
        };

        //设置表格验证未初始化状态
        $scope.setVerificationStatus = function (){
            $scope.add.$submitted=false;
            $scope.add.baseForm.serialNumber.$touched=false;$scope.add.baseForm.name.$touched=false;
            $scope.add.baseForm.pinYin.$touched=false;$scope.add.baseForm.jianPin.$touched=false;
            $scope.add.formAdd.longitude.$touched=false;$scope.add.formAdd.latitude.$touched=false;
            $scope.add.formAdd.address.$touched=false;$scope.add.formAdd.areaName.$touched=false;
        };

        //点击新增按钮以后，再点击保存按钮是新增功能。（右边表格）
        $scope.addPharmacy = function () {
            //表格复选框设置成未选中
            $("#isAll").prop("checked",false);
            $scope.isAll = true;
            $scope.selectAll();

            $scope.gridApi.selection.clearSelectedRows();//清除选中行
            $scope.setVerificationStatus();//
            $scope.hidePharmacyDetails = true;
            $scope.detail ={};
            $scope.IsAddPharmacy = "1";
            $("#btnEdit").removeAttr("disabled");
            $scope.detail.providerID = $scope.datas.orgID;
            $scope.detail.state = "1";
            $scope.detail.type = '0';//药店详情 类型｛实体默认显示｝
        };


        //判断是否为添加新药店（右边表格）
        $scope.editPharmacy = function (valid,formAddValid) {
            if ($scope.IsAddPharmacy == "1") {
                $scope.savePharamacy("add",valid,formAddValid);
            }
            else {
                $scope.savePharamacy("edit",valid,formAddValid);
            }
        };


        //(城市选择)
        $scope.citygrid = {
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
                    name: 'select', displayName: '选择', width: 60, headerCellClass: 'cell-center', cellClass: 'cell-center', enableSorting: false,
                    cellTemplate: '<label style="height: 100%"><input type="radio" name="sele" ng-checked="row.isSelected"/></label>'
                },
                {name: 'name', displayName: '名称', headerCellClass: 'cell-center'},
            ],
            onRegisterApi: function (gridApi) {
                $scope.cityGridApi = gridApi;
                $scope.cityGridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.cityPageSize*(grid.appScope.cityPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.cityGridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.cityGridOptions.sort('', '');
                    } else {
                        $scope.cityGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    $scope.cityGridOptions.search();
                });
                $scope.cityGridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.cityDetail = rowEntity;
                    }
                });
            }
        };

        //搜索条件查询
        $scope.cityGridOptions = $rootScope.getGridOptions();
        $scope.cityGridOptions.setQueryPrarms = function(){
            $scope.cityGridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.cityGridOptions.getData = function(){
            $scope.cityPageSize = $scope.cityGridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.cityPageIndex = $scope.cityGridOptions.queryPrarms.pageIndex;   //用于序号显示
            suppliermanageService.GetCityByName($scope.cityGridOptions.queryPrarms).success(function (data) {
                if(data.code == 200){
                    $scope.cityGridOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.citygrid.data = data.data.datas;    //返回的要渲染的数据
                }else {
                    $scope.citygrid.data = [];
                    $scope.cityGridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        //保存选择的城市
        $scope.getCity = function () {
            $scope.cityInfor = $scope.cityDetail;
            $scope.detail.areaID = $scope.cityInfor.id;
            $scope.detail.areaCode = $scope.cityInfor.id;
            $scope.detail.areaName = $scope.cityInfor.name;
        };


        //保存药店（右边表格）
        $scope.savePharamacy = function(type,valid,formAddValid){
            if((valid && $scope.detail.type==1) || (valid && formAddValid && $scope.detail.type==0)){
                if(type == "add"){
                    suppliermanageService.addProviderPharmacy($scope.detail).success(function (data) {
                        if(data.code==200){
                            $scope.detail = {};
                            //$scope.errorInfoEmpty();
                            $scope.hidePharmacyDetails = false;
                            $scope.gridOptions.search();
                            bootbox.alert("药店添加成功");
                        }else {
                            bootbox.alert(data.msg);
                        }
                    });
                }
                if (type == "edit") {
                    suppliermanageService.modifyProviderPharmacy($scope.detail).success(function (data) {
                        if (data.code==200) {
                            $scope.detail = {};
                            //$scope.errorInfoEmpty();
                            $scope.hidePharmacyDetails = false;
                            $scope.gridOptions.search();
                            bootbox.alert("药店修改成功");
                        } else {
                            bootbox.alert(data.msg);
                        }
                    });
                }
            }
        };

        //删除药店（右边表格）
        $scope.deletePharmacy = function () {
            if ($scope.detail.id == null || $scope.detail.id == undefined || $scope.detail.id == '') {
                bootbox.alert("请选中一条记录再点击删除！");
                return;
            }
            bootbox.confirm("确定删除？", function (result) {
                if (result) {
                    suppliermanageService.deletePharmacyList({id:$scope.detail.id}).success(function (data){
                        if (data.code== 200) {
                            $scope.detail = {};
                            $scope.errorInfoEmpty();
                            $scope.hidePharmacyDetails = false;
                            $scope.gridOptions.search();
                        }
                        else {
                            bootbox.alert("药店删除失败！");
                        }
                    })
                }
            });
        }

        //错误信息提示清空
        $scope.errorInfoEmpty = function () {
            //$scope.add.serialNumber.$setUntouched();
            $scope.add.$setPristine();
        }

        //导入导出错误表格
        $scope.failGrid = {
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
                {name:'serialNumber', displayName: '药店编码', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'name', displayName: '药店名称', headerCellClass:'cell-center',cellClass: 'cell-center'},
                {name:'address', displayName: '地址', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'phone', displayName: '电话', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'areaName', displayName: '所属市名称', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'state', displayName: '状态', headerCellClass:'cell-center', cellClass: 'cell-center',cellFilter:'getPharmacyState'},
                {name:'failReason', displayName: '失败原因', headerCellClass:'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.failGridApi = gridApi;
                $scope.failGridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
            }
        };

        //选择文件模版
        $scope.selectFile = function (){
            $("#file").click();
        };

        //导入按钮点击
        $scope.importSupplierManage = function (){
            var fileName = $("#path").val();
            if(fileName && fileName.lastIndexOf('.')!=-1){
                var validFileType = /\.xls|\.xlsx/;
                var type =fileName.substring(fileName.lastIndexOf('.'));
                if(validFileType.test(type)){
                    $("#loading").show();
                    $("#importsuppliermanage").click();
                }else{
                    bootbox.alert("请选择有效数据文件！");
                }
            }else{
                bootbox.alert("请选择有效数据文件！");
            }
        };

        //导入成功
        $scope.importSuccess = function (totalCount,errorCount,successCount){
            if(totalCount==0){
                bootbox.alert("模板中无数据！");
            }else if(errorCount==0){
                bootbox.alert("数据已全部成功导入");
                $scope.gridOptions.search();
            } else{
                $(".modal-data-count").text("导入数据总共"+totalCount+"条，成功上传"+successCount+"条数据，失败"+errorCount+"条数据");
                suppliermanageService.getimportfaillistSupplier().success(function (data){
                    $("#importFailModal").modal();
                    $scope.failGrid.data = data.data;
                });
            }
        };

        //导入出错
        $scope.importFail = function (){
            bootbox.alert("导入失败！");
        };

        //模板下载
        $scope.GetTemplateClick = function () {
            $("#GetTemplate").click();
        };


        //弹层取消
        $scope.cancel = function (){
            $("#importFailModal").modal("hide");
            $(".modal-data-count").text("");$scope.failGrid.data=[];
        };


        //返回
        $scope.back = function(){
            window.location.href="#suppliermanage";
        };


        //延迟加载
        $timeout(function(){
            $scope.gridOptions.search();
            $scope.cityGridOptions.search();
        }, 0, false);
    }]);
});