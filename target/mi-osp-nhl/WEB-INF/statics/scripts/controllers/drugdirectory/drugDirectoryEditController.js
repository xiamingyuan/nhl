/**
 * Created by xmy on 2016/8/29.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('drugDirectoryEditController', ['$scope', '$http', '$rootScope','$filter', '$timeout','druglistService','provinceServices', 'strUtils','$routeParams', function ($scope, $http, $rootScope,$filter, $timeout,druglistService,provinceServices, strUtils,$routeParams) {
        window.localStorage.bol = 'true';//返回状态保持标示
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
                    cellTemplate: '<label style="height: 100%"><input type="checkbox" data-id="{{row.entity.id}}"  data-shortName="{{row.entity.name}}" ng-click="grid.appScope.provinceSelect($event);" name="provincename"/></label>'
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
                }else{
                    $scope.provincegrid.data = [];
                    $scope.provinceGridOptions.totalCount = 0;
                }
            });
        };

        //保存选择的城市
        $scope.getProvince = function () {
            $scope.province1Names = "";
            $scope.detail.province1ids = [];
            $scope.detail.province1names = [];
            $scope.detail.provinces1Data = [];
            $scope.arr.sort(function (a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
            for (var d in $scope.arr) {
                if ($scope.arr[d] != undefined) {
                    $scope.province1Names += $scope.arr[d].name + ",";
                    $scope.detail.province1ids.push($scope.arr[d].id);
                    $scope.detail.province1codes.push($scope.arr[d].id);
                    $scope.detail.province1names.push($scope.arr[d].name);
                }
            }
            if ($scope.province1Names.length > 0) {
                $scope.province1Names = $scope.province1Names.substr(0, $scope.province1Names.length - 1);
            }
        };

        $scope.arr = [];
        $scope.provinceSelect = function ($event) {
            var $this = $($event.target);
            if ($this.prop("checked") == true) {
                var isIn = false;
                for (var d in $scope.arr) {
                    if ($scope.arr[d].id == $this.attr('data-id')) {
                        isIn = true;
                    }
                }
                if (isIn == false) {
                    $scope.arr.push({id:$this.attr('data-id'),name:$this.attr('data-shortName')});
                }
            } else {
                for (var d in $scope.arr) {
                    if ($scope.arr[d].id == $this.attr('data-id')) {
                        $scope.arr.splice(d, 1);
                    }
                }
            }
        };

        $scope.detail = { "pro1Amount": "0", "p2Amount": "0", "p1id": "", "p2id": "" };
        //获取药品信息
        druglistService.GetP1DrugInfo({ id: $routeParams.id.substring(1)}).success(function(data){
            $scope.detail = data.data;
            $scope.detail.citys1 = [];
            $scope.detail.citys2 = [];
            $scope.detail.citynames1 = [];
            $scope.detail.citynames2 = [];
            $scope.detail.citys1Data = [];
            $scope.detail.citys2Data = [];
            // for (var d in $scope.detail.city1Data) {
            //     names += $scope.detail.city1Data[d].CityName + ",";
            //     $scope.detail.citys1.push($scope.detail.city1Data[d].CityID);
            //     $scope.detail.citynames1.push($scope.detail.city1Data[d].CityName);
            //     $scope.detail.citys1Data.push({ Id: $scope.detail.city1Data[d].CityID, Name: $scope.detail.city1Data[d].CityName });
            // }
            // names = names.substr(0, names.length - 1);
            // $scope.city1Names = names;

            // for (var d in $scope.detail.city2Data) {
            //     names += $scope.detail.city2Data[d].CityName + ",";
            //     $scope.detail.citys2.push($scope.detail.city2Data[d].CityID);
            //     $scope.detail.citynames2.push($scope.detail.city2Data[d].CityName);
            //     $scope.detail.citys2Data.push({ Id: $scope.detail.city2Data[d].CityID, Name: $scope.detail.city2Data[d].CityName });
            // }
            // names = names.substr(0, names.length - 1);
            // $scope.city2Names = names;

            $scope.detail.province1ids = [];
            $scope.detail.provinces2 = [];
            $scope.detail.province1names = [];
            $scope.detail.provincenames2 = [];
            $scope.detail.provinces1Data = [];
            $scope.detail.provinces2Data = [];

            $scope.detail.province1codes = [];

            $scope.names = "";
            for (var d in data.province1Data) {
                $scope.names += data.province1Data[d].provinceName + ",";
                $scope.detail.province1ids.push(data.province1Data[d].provinceID);
                $scope.detail.province1names.push(data.province1Data[d].provinceName);
                $scope.detail.provinces1Data.push({ id: data.province1Data[d].provinceID, name: data.province1Data[d].provinceName, Code: data.province1Data[d].provinceCode });
                $scope.arr.push({ id: data.province1Data[d].provinceID, name: data.province1Data[d].provinceName, Code: data.province1Data[d].provinceCode });
                $scope.detail.province1codes.push(data.province1Data[d].provinceCode);
            }
            if ($scope.arr.length > 0) {
                for (var i in $scope.arr) {
                    for (var j in $scope.provincegrid.data) {
                        if ($scope.arr[i].id == $scope.provincegrid.data[j].id) {
                            $("#provinceGrid :checkbox").eq(j).prop("checked",true);
                        }
                    }
                }
            }
            $scope.names = $scope.names.substr(0, $scope.names.length - 1);
            $scope.province1Names = $scope.names;
            // names = "";
            // for (var d in $scope.detail.province2Data) {
            //     names += $scope.detail.province2Data[d].ProvinceName + ",";
            //     $scope.detail.provinces2.push($scope.detail.province2Data[d].ProvinceID);
            //     $scope.detail.provincenames2.push($scope.detail.province2Data[d].ProvinceName);
            //     $scope.detail.provinces2Data.push({ id: $scope.detail.province2Data[d].ProvinceID, name: $scope.detail.province2Data[d].ProvinceName });
            // }
            // names = names.substr(0, names.length - 1);
            // $scope.province2Names = names;province2Names

            if (data.data.factoryAuditFlag == "1") {
                data.data.factoryAuditFlag = "true";
            } else {
                data.data.factoryAuditFlag = "false";
            }
            if (data.data.isCheckRegulateCode == "1") {
                $scope.detail.isCheckRegulateCode = true;
                
            } else {
                $scope.detail.isCheckRegulateCode = false;
            }
            $scope.detail.rebateAmountUnit = $filter('getFloatDigit')(data.data.rebateunitAmount);
            $scope.detail.totalPrice = $filter('getFloatDigit')(data.data.totalPrice);
            $scope.detail.goodsCode = data.data.goodsDrugCode;
            $scope.detail.p1Program1AppDescription = data.data.p1Program1Description;
            $scope.detail.providerOnDate = data.data.providerOnDate != null ? $filter('date')(new Date(data.data.providerOnDate), 'yyyy-MM-dd') : null;
            $scope.detail.providerOffDate = data.data.providerOffDate != null ? $filter('date')(new Date(data.data.providerOffDate), 'yyyy-MM-dd') : null;
            $scope.detail.onlineDate = data.data.onlineDate != null ? $filter('date')(new Date(data.data.onlineDate), 'yyyy-MM-dd') : null;
            $scope.detail.offlineDate = data.data.offlineDate != null ? $filter('date')(new Date(data.data.offlineDate), 'yyyy-MM-dd') : null;
            $scope.detail.isState = data.data.state;
            $scope.detail.id = data.data.id;
            $scope.detail.name = data.data.orgName;
            druglistService.GetP1DrugPrograms({ p1DrugID: $routeParams.id.substring(1)}).success(function(data){
                $scope.Plan = data.data;
                $scope.detail.p1id = data.data[0].id;
                //$scope.detail.p2id = data.data[1].id;
                $scope.detail.pro1Amount = data.data[0].claimAmount;
                //$scope.detail.p2Amount = data.data[1].claimAmount;
            });

        });

        bootbox.setLocale("zh_CN");
        $scope.SelectFile = function () {
            $("#file").click();
        };
        $scope.ImportRCode = function () {
            if (document.getElementById('path').value == null || document.getElementById('path').value == '') {
                bootbox.alert('请先选择文件再点击上传');
                return;
            }
            $("#upload").click();
        };

        //保存
        $scope.save = function (valid,obj) {
            if (valid) {
                bootbox.confirm("确定保存修改？", function (result) {
                    if (result) {
                        //使用正则保证替换所有的-符号
                        var d1 = obj.onlineDate.replace(/\-/g, "").substr(0, 8);
                        var d2 = obj.offlineDate.replace(/\-/g, "").substr(0, 8);
                        if (parseInt(d1) >= parseInt(d2)) {
                            bootbox.alert("结算信息商务合同有效期结束日期必须大于开始日期");
                            return;
                        }
                        //使用正则保证替换所有的-符号
                        var d3 = obj.providerOnDate.replace(/\-/g, "").substr(0, 8);
                        var d4 = obj.providerOffDate.replace(/\-/g, "").substr(0, 8);
                        if (parseInt(d3) >= parseInt(d4)) {
                            bootbox.alert("报销信息有效期结束日期必须大于开始日期");
                            return;
                        }
                        if ($scope.detail.isCheckRegulateCode == true) {
                            $scope.detail.isCheckRegulateCode = "1";

                        } else {
                            $scope.detail.isCheckRegulateCode = "0";
                        }
                        druglistService.UpdateP1Drug($scope.detail).success(function (data, status) {
                            if (data.code != 200) {
                                bootbox.alert(data.msg);
                            } else {
                                bootbox.alert('修改成功');
                                $scope.back();
                            }
                        });
                    }
                })
            }
        };

        $timeout(function () {
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
                    bootbox.alert('上传失败,请检查文件是否正确');
                }
            });
        }
    }])
});