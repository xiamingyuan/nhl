/**
 * Created by xmy on 2016/11/10.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('schoolspecialtyListController', ['$scope', '$rootScope','$timeout','hospitalService','schoolService',function ($scope, $rootScope,$timeout,hospitalService,schoolService) {
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
                {name: 'name', displayName: '名称',minWidth:100, headerCellClass: 'cell-center',
                    cellTemplate: '<div class=\'ui-grid-cell-contents\'><a ng-if="grid.appScope.permission.schoolspecialtyDetail" href="#schoolspecialty/detail/:{{row.entity.id}}"><span ng-bind="row.entity.name"></span></a><span ng-if="!grid.appScope.permission.schoolspecialtyDetail" ng-bind="row.entity.name"></span></div>'
                },
                {name:'area', displayName: '所在地',minWidth:100,enableSorting: false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div class="ui-grid-cell-contents">' +
                    '<span ng-bind="row.entity.province_name==null?\'\':row.entity.province_name"></span>'+
                    '<span ng-bind="row.entity.city_name==null?\'\':row.entity.city_name"></span>'+
                    '<span ng-bind="row.entity.district_name==null?\'\':row.entity.district_name"></span>'+
                    '</div>'
                },
                {name: 'address', displayName: '地址',minWidth:100, headerCellClass: 'cell-center'},
                {name: 'phone', displayName: '电话',minWidth:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'description', displayName: '描述',minWidth:100, headerCellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 170, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-if="grid.appScope.permission.schoolspecialtyDetail" href="#schoolspecialty/detail/:{{row.entity.id}}">' +
                    '       <i class="icon-file-text-o"></i> 详情' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.schoolspecialtyEdit" href="#schoolspecialty/edit/:{{row.entity.id}}" class="operate-a">' +
                    '      <i class="icon-edit"></i> 编辑' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.schoolspecialtyDelete" ng-click="grid.appScope.delschool(row.entity.id)">' +
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
                        $scope.gridOptions.sort('', '','');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction,sortColumns[0].sort.displayName);
                        $rootScope.direction.getDirection(sortColumns[0].sort.direction);
                    }
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    window.localStorage.selectRow = row.grid.renderContainers.body.visibleRowCache.indexOf(row);
                    if (rowIsSelected) {
                        $scope.schoolDetail = rowEntity;
                        $scope.searchPecialty($scope.schoolDetail.id);
                    }
                });
            }
        };

        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            schoolService.QuerySchoolList($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.permission = data.permission;
                    $scope.grid.data = data.data.result.datas;
                    $scope.gridOptions.totalCount = data.data.result.totalCount;
                    if($scope.gridOptions.totalCount==0){
                        $scope.nodata = true;
                        $scope.flag = true;
                    }else{
                        $scope.nodata = false;
                        $scope.flag = false;
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
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                }
            });
        };

        $scope.list = {};
        $scope.cancelAdd = function () {
            $('#myModal').modal('hide');
            $scope.serverErrorInfo = "";
            $scope.list.name = '';
            $scope.list.phone = '';
            $scope.list.description = '';
            $scope.list.province_id = '';
            $scope.list.city_id = '';
            $scope.list.district_id = '';
            $scope.list.address = '';
            $scope.list.description = '';
            $scope.addschool.schname.$setUntouched();
            $scope.addschool.schtel.$setUntouched();
            $scope.addschool.$setPristine();
        };

        $scope.addSchool = function(){
            $('#myModal').modal('show');
        };

        //添加学校按钮
        $scope.add = function(valid){
            if(valid){
                schoolService.InsertSchool($scope.list).success(function(data){
                    if(data.code==200){
                        $scope.cancelAdd();
                        window.localStorage.detail = false;
                        $scope.gridOptions.search();
                    }else{
                        $scope.serverErrorInfo = data.msg;
                    }
                });
            }
        };

        //删除学校
        $scope.delschool = function(id){
            bootbox.confirm("确定删除该学校？", function (result) {
                if (result) {
                    schoolService.DelSchool({id:id}).success(function(data){
                        if(data.code==200){
                            $scope.gridOptions.search();
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            })
        };

        //获取搜索条件省份
        hospitalService.getarea({ parentId: "0"}).success(function (data) {
            $scope.provinceDatas = data.data;
            if($scope.searchParams){
                hospitalService.getarea({ parentId: $scope.searchParams.province }).success(function (data) {
                    $scope.cityDatas = data.data;
                });
                hospitalService.getarea({ parentId: $scope.searchParams.city }).success(function (data) {
                    $scope.districtDatas = data.data;
                });
            }
        });
        //搜索条件省份选择变化
        $scope.provinceSelectChange = function () {
            $scope.districtDatas=[];$scope.cityDatas=[];//清空市,区数据
            if($scope.searchParams.city){
                $scope.searchParams.city="";//清空绑定的市值
                $scope.searchParams.district="";//清空绑定的区值
            }
            var pid = $("select[name='province'] option:selected").val();
            if(pid!=""){
                hospitalService.getarea({ parentId: pid }).success(function (data) {
                    $scope.cityDatas = data.data;$scope.citySelectChange();
                });
            }
        };
        //搜索条件城市变化
        $scope.citySelectChange = function () {
            $scope.districtDatas=[];//清空区数据
            if($scope.searchParams.district){
                $scope.searchParams.district="";//清空绑定的区值
            }
            var cid = $("select[name='city'] option:selected").val();
            if(cid!=""){
                hospitalService.getarea({ parentId: cid }).success(function (data) {
                    $scope.districtDatas = data.data;
                });
            }
        };

        //添加学校弹出框省份省份选择变化
        $scope.addprovinceSelectChange = function () {
            $scope.adddistrictDatas=[];$scope.addcityDatas=[];//清空市,区数据
            $scope.list.city_id = "";
            $scope.list.district_id = "";
            var pid = $("select[name='addprovince'] option:selected").val();
            if(pid!=""){
                hospitalService.getarea({ parentId: pid }).success(function (data) {
                    $scope.addcityDatas = data.data;$scope.addcitySelectChange();
                });
            }
        };
        //添加学校弹出框省份省份选择变化
        $scope.addcitySelectChange = function () {
            $scope.adddistrictDatas=[];//清空区数据
            $scope.list.district_id = "";
            var cid = $("select[name='addcity'] option:selected").val();
            if(cid!=""){
                hospitalService.getarea({ parentId: cid }).success(function (data) {
                    $scope.adddistrictDatas = data.data;
                });
            }
        };

        //搜索学校专业
        $scope.searchPecialty = function(id){
            schoolService.QuerySchoolDepartList({id:id}).success(function (data) {
                if(data.data.result.length==0){
                    $scope.flag = true;
                }else{
                    $scope.flag = false;
                    $scope.departList = data.data.result;;
                }
            });
        };

        $scope.showPecialty = function(){
            if($scope.nodata)
                bootbox.alert("请选择学校！");
            else
                $('#pecialtyModal').modal('show');
        };

        $scope.pecialty={};
        //添加学校专业按钮
        $scope.addPecialty = function(valid){
            if(valid){
                $scope.pecialty.school_id = $scope.schoolDetail.id;
                schoolService.InsertSchoolDepart($scope.pecialty).success(function(data){
                    if(data.code==200){
                        $scope.cancelAddPecialty();
                        $scope.searchPecialty($scope.pecialty.school_id);
                    }else{
                        $scope.serverErrorInfo = data.msg;
                    }
                });
            }
        };

        //取消添加专业
        $scope.cancelAddPecialty = function(){
            $('#pecialtyModal').modal('hide');
            $scope.serverErrorInfo = "";
            $scope.pecialty.name = '';
            $scope.pecialty.description = '';
            $scope.pecialty.code = '';
            $scope.addpecialty.pecialtyname.$setUntouched();
            $scope.addpecialty.pecialtycode.$setUntouched();
            $scope.addpecialty.$setPristine();
        };

        //取消编辑专业
        $scope.cancelUpdatePecialty = function () {
            $scope.serverErrorInfo = "";
        };

        //删除专业按钮
        $scope.delDepart = function(id,schoolId){
            bootbox.confirm("确定删除该专业？", function (result) {
                if (result) {
                    schoolService.DelDepart({id:id}).success(function(data){
                        if(data.code==200){
                            $scope.searchPecialty(schoolId);
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            })
        };

        $scope.pecialtyDetail={};
        //获取专业信息按钮
        $scope.updateDepart = function(id){
            $('#updatePecialtyModal').modal('show');
            schoolService.QuerySchoolDepartByID({id:id}).success(function(data){
                if(data.code==200){
                    $scope.pecialtyDetail = data.data.result;
                }
            });
        };

        //更新专业信息按钮
        $scope.updatePecialty = function(valid,schoolId){
            if(valid) {
                schoolService.UpdateSchoolDepart($scope.pecialtyDetail).success(function (data) {
                    if (data.code == 200) {
                        $('#updatePecialtyModal').modal('hide');
                        $scope.searchPecialty(schoolId);
                    }else{
                        $scope.serverErrorInfo = data.msg;
                    }
                });
            }
        };

        //隐藏错误信息
        $scope.hideServerErrorInfo = function () {
            $scope.serverErrorInfo = "";
        };

        $timeout(function () {
            $scope.gridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
    }]);
});
