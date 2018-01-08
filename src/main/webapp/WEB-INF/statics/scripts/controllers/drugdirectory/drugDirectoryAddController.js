/**
 * Created by xmy on 2016/8/29.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('drugDirectoryAddController', ['$scope', '$http', '$rootScope', '$timeout','provinceServices','druglistService', 'strUtils', function ($scope, $http, $rootScope, $timeout,provinceServices,druglistService, strUtils) {
        window.localStorage.bol = 'true';//返回状态保持标示
        bootbox.setLocale("zh_CN");
        var ue = $("#container").xheditor({
            tools: "Source,Cut,Copy,Pastetext,Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,Align,List,Outdent,Indent,Link,Unlink,Hr,Preview,Fullscreen",
            skin: "nostyle"
        });
        $scope.searchParams={};
        $scope.arr = [];
        $scope.isGetData = false;
        $scope.isRCode = false;
        $scope.isUpload = false;
        $scope.isAdd = false;
        $scope.isState = '0';
        $scope.detail = { "factoryAuditFlag": '0', "IsCheckRegulateCode": '0', "treatDays": "0","provinces1":[],"provincenames1":[] };
        $scope.SuppliersInfo = {};

        $scope.goodsInfo = {};

        //city 暂时不用 只需要province
        $scope.detail.citys1 = [];
        $scope.detail.citys2 = [];
        $scope.detail.citynames1 = [];
        $scope.detail.citynames2 = [];
        $scope.detail.citys1Data = [];
        $scope.detail.citys2Data = [];

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
                    cellTemplate: '<label style="height: 100%"><input type="radio" ng-checked="row.isSelected" name="sele"/></label>'
                },
                {name: 'name', displayName: '名称', headerCellClass: 'cell-center'},
                {name: 'address', displayName: '地址', headerCellClass: 'cell-center'},
                {name: 'phone', displayName: '电话', headerCellClass: 'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.proPageSize*(grid.appScope.proPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.proGridOptions.sort('', '');
                    } else {
                        $scope.proGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    $scope.proGridOptions.search();
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
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
            $("#proInforId").val($scope.proInfor.id);
            //供应商信息赋值
            $scope.SuppliersInfo = $scope.proDetail;
            $scope.detail.ProviderAlias = ($scope.SuppliersInfo.abbreviation == null || $scope.SuppliersInfo.abbreviation == undefined || $scope.SuppliersInfo.abbreviation == '') ? $scope.SuppliersInfo.name : $scope.SuppliersInfo.abbreviation;
            $scope.detail.ProviderOnDate = $scope.SuppliersInfo.onLineDate;
            $scope.detail.ProviderOffDate = $scope.SuppliersInfo.offLineDate;
        };
        //点击选择供应商按钮 清除弹层搜索过的数据
        $scope.openPro = function () {
            $scope.searchParams.queryKey = "";
            $scope.proGridOptions.search();
        };


        //商品编码grid
        $scope.goodgrid = {
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
                    cellTemplate: '<label style="height: 100%"><input type="radio" ng-checked="row.isSelected" name="goodname"/></label>'
                },
                {name: 'productID', displayName: '产品ID', headerCellClass: 'cell-center'},
                {name: 'goodsName', displayName: '通用名', headerCellClass: 'cell-center'},
                {name: 'drugName', displayName: '商品名', headerCellClass: 'cell-center'},
                {name: 'specification', displayName: '规格', headerCellClass: 'cell-center'},
                {name: 'manufactEnterprise', displayName: '生产厂家', headerCellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.goodPageSize*(grid.appScope.goodPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.goodGridOptions.sort('', '');
                    } else {
                        $scope.goodGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    $scope.goodGridOptions.search();
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.goodsCodeDetail = rowEntity;
                    }
                });
            }
        };
        $scope.goodGridOptions = $rootScope.getGridOptions();
        $scope.goodGridOptions.setQueryPrarms = function(){
            $scope.goodGridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.goodGridOptions.getData = function(){
            $scope.goodPageSize = $scope.goodGridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.goodPageIndex = $scope.goodGridOptions.queryPrarms.pageIndex;   //用于序号显示
            druglistService.GetGoodsCode($scope.goodGridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.goodgrid.data = data.data.result.datas;
                    $scope.goodGridOptions.totalCount = data.data.result.totalCount;
                }else{
                    $scope.goodgrid.data = [];
                    $scope.goodGridOptions.totalCount = 0;
                }
            });
        };

        //保存选择的商品
        $scope.getGoodInfor = function () {
            $scope.goodInfor = $scope.goodsCodeDetail;//通用名(商品)信息赋值
        };
        //点击选择商品按钮 清除弹层搜索过的数据
        $scope.openGood = function () {
            $scope.searchParams.goodcode = "";
            $scope.goodGridOptions.search();
        };

        $scope.SelectFile = function () {
            $("#file").click();
        };
        $scope.ImportRCode = function () {
            if (document.getElementById('path').value == null || document.getElementById('path').value == '') {
                bootbox.alert("请先选择文件再点击上传！");
                return;
            }
            $("#upload").click();
        };

        //城市选择grid
        $scope.provincegrid = {
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
                    cellTemplate: '<label style="height: 100%"><input type="checkbox" data-id="{{row.entity.id}}" ng-model="row.entity.selected"  data-shortName="{{row.entity.name}}" ng-click="grid.appScope.provinceSelect($event);"/></label>'
                },
                {name: 'name', displayName: '名称', headerCellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.provincePageSize*(grid.appScope.provincePageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.provinceGridOptions.sort('', '');
                    } else {
                        $scope.provinceGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    $scope.provinceGridOptions.search();
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.provinceDetail = rowEntity;
                    }
                });
            }
        };
        $scope.provinceGridOptions = $rootScope.getGridOptions();
        $scope.provinceGridOptions.setQueryPrarms = function(){
            $scope.provinceGridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.provinceGridOptions.getData = function(){
            $scope.provincePageSize = $scope.provinceGridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.provincePageIndex = $scope.provinceGridOptions.queryPrarms.pageIndex;   //用于序号显示
            provinceServices.query($scope.provinceGridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.provincegrid.data = data.data.datas;
                    $scope.provinceGridOptions.totalCount = data.data.totalCount;
                    if ($scope.arr.length > 0) {
                        for (var i in $scope.arr) {
                            for (var j in $scope.provincegrid.data) {
                                if ($scope.arr[i].id == $scope.provincegrid.data[j].id) {
                                    $("#provinceGrid :checkbox").eq(j).prop("checked",true);
                                }
                            }
                        }
                    }
                }else{
                    $scope.provincegrid.data = [];
                    $scope.provinceGridOptions.totalCount = 0;
                }
            });
        };

        //保存选择的城市
        $scope.getProvince = function () {
            $scope.arr.sort(function (a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
            $scope.names = "";
            for (var d in $scope.arr) {
                if ($scope.arr[d] != undefined) {
                    $scope.names += $scope.arr[d].name + ",";
                    $scope.detail.provinces1.push($scope.arr[d].id);
                    $scope.detail.provincenames1.push($scope.arr[d].name);
                }
            }
            if ($scope.names.length > 0) {
                $scope.names = $scope.names.substr(0, $scope.names.length - 1);
            }
        };
        //点击选择商品城市 清除弹层搜索过的数据
        $scope.openArea = function () {
            $scope.searchParams.provinceName = "";
            $scope.provinceGridOptions.search();
        };

        $scope.provinceSelect = function ($event) {
            var $this = $($event.target);
            if ($this.prop("checked") == true) {
                $scope.isIn = false;
                for (var d in $scope.arr) {
                    if ($scope.arr[d].id == $this.attr('data-id')) {
                        $scope.isIn = true;
                    }
                }
                if ($scope.isIn == false) {
                    $scope.arr.push({id:$this.attr('data-id'),name:$this.attr('data-shortName')});
                }
            }
            else {
                for (var d in $scope.arr) {
                    if ($scope.arr[d].id == $this.attr('data-id')) {
                        $scope.arr.splice(d, 1);
                    }
                }
            }
        };

        $scope.obj = {};
        $scope.validBol = false;
        $scope.setData = function () {
            console.log($scope.detail.IsCheckRegulateCode);
            if ($scope.detail.IsCheckRegulateCode == true) {
                $scope.isRCode = true;
            }else {
                $scope.isRCode = false;
            }
            if ($scope.isRCode == true && $scope.isUpload == false) {
                bootbox.alert("请上传监管码！");
                return;
            }
            $scope.obj.isState = $scope.isState;
            $scope.obj.orgID = $scope.proInfor.orgID;
            $scope.obj.orgName = $scope.proInfor.name;
            $scope.obj.goodsCode = $scope.goodInfor.goodsCode;
            $scope.obj.CisCode = $scope.goodInfor.cisCode;
            $scope.obj.treatDays = $scope.treatDays;
            $scope.obj.manufactEnterprise = $scope.goodInfor.manufactEnterprise;
            $scope.obj.manufactEnterpriseID = $scope.goodInfor.manufactEnterpriseID;
            $scope.obj.rebateAmountUnit = $scope.rebateunitAmount;
            $scope.obj.totalPrice = $scope.totalPrice;
            $scope.obj.totalNumber = $scope.totalNumber;
            //使用正则保证替换所有的-符号
            var d1 = $scope.onLineDate.replace(/\-/g, "").substr(0, 8);
            var d2 = $scope.offLineDate.replace(/\-/g, "").substr(0, 8);
            if (parseInt(d1) >= parseInt(d2)) {
                bootbox.alert("结算信息商务合同有效期结束日期必须大于开始日期！");
                $scope.validBol = false;
                return;
            }else{
                $scope.obj.onLineDate = $scope.onLineDate;
                $scope.obj.offLineDate = $scope.offLineDate;
                $scope.validBol = true;
            }
            $scope.obj.factoryAuditFlag = $scope.factoryAuditFlag; //源HTML代码删除这个参数
            $scope.obj.pro1Amount = $scope.p1Amount;
            $scope.obj.pro2Amount = $scope.p2Amount == null || $scope.p2Amount == undefined ? 0 : $scope.p2Amount;
            $scope.obj.goodsName = $scope.goodInfor.goodsName;
            $scope.obj.drugName = $scope.goodInfor.drugName;
            $scope.obj.barCode = $scope.goodInfor.barCode;
            $scope.obj.generalName = $scope.goodInfor.generalName;
            $scope.obj.dosage = $scope.goodInfor.dosage;
            $scope.obj.p1Program1AppDescription = $scope.p1Program1AppDescription;
            $scope.obj.p1Program2AppDescription = $scope.p1Program2AppDescription;
            $scope.obj.specification = $scope.goodInfor.specification;
            $scope.obj.RegulateCodePrefix = $scope.goodInfor.regulateCodePrefix;
            //使用正则保证替换所有的-符号
            var d3 = $scope.providerOnDate.replace(/\-/g, "").substr(0, 8);
            var d4 = $scope.providerOffDate.replace(/\-/g, "").substr(0, 8);
            if (parseInt(d3) >= parseInt(d4)) {
                bootbox.alert("报销信息有效期结束日期必须大于开始日期！");
                $scope.validBol = false;
                return;
            }else{
                $scope.obj.ProviderOnDate = $scope.providerOnDate;
                $scope.obj.ProviderOffDate = $scope.providerOffDate;
                $scope.validBol = true;
            }
            $scope.obj.IsExistRegulateCode = $scope.goodInfor.isExistRegulateCode;
            // $scope.obj.IsCheckRegulateCode = $scope.detail.IsCheckRegulateCode == null || $scope.detail.IsCheckRegulateCode == undefined ? false : $scope.detail.IsCheckRegulateCode;
            $scope.obj.IsCheckRegulateCode = $scope.detail.IsCheckRegulateCode;
            $scope.obj.claimPriority = $scope.claimPriority;//报销优先级 源HTML代码删除这个参数
            $scope.obj.ProviderAuditOverDay = 30;
            $scope.obj.ProviderAlias =  $scope.providerAlias;

            //选择city的代码在原HTML页面注释了 暂时新nhl不加 一下12均区分方案1 方案2
            $scope.obj.city1ids = [];
            $scope.obj.city2ids = [];
            $scope.obj.city1names = [];
            $scope.obj.city2names = [];
            $scope.obj.province1ids = $scope.detail.provinces1;
            $scope.obj.province2ids = [];
            $scope.obj.province1names = $scope.detail.provincenames1;
            $scope.obj.province2names = [];
            $scope.obj.province1codes = $scope.detail.provinces1;
            $scope.obj.IsSupervisionCode = $scope.proInfor.isSupervisionCode;
            //药店信息 暂时设置为空
            $scope.obj.pharmacy1ids = [];
            $scope.obj.pharmacy1names = [];
        };

        //保存
        $scope.save = function (valid) {
            if (valid) {
                bootbox.confirm("确定添加该产品？", function (result) {
                    if (result) {
                        $scope.setData();
                        if($scope.validBol){
                            druglistService.AddP1Drug($scope.obj).success(function (data, status) {
                                if (data.code != 200) {
                                    bootbox.alert(data.msg);
                                } else {
                                    bootbox.alert('添加成功');
                                    $scope.back();
                                }
                            });
                        }
                    }
                })
            }
        };

        $timeout(function () {
            $scope.proGridOptions.search();
            $scope.goodGridOptions.search();
            $scope.provinceGridOptions.search();
        }, 0, false);

        //返回
        $scope.back = function () {
            window.localStorage.detail = 'true';
            window.location.href = "#drugdirectory";
        };


        $scope.GetUploadCodeResult = function () {
            druglistService.GetUploadCodeResult().success(function (data) {
                console.log(data);
                if (data.data = "1") {
                    $scope.isUpload = true;
                } else {
                    $scope.isUpload = false;
                    bootbox.alert('上传失败,请检查文件是否正确！');
                }
            });
        }
    }])
});