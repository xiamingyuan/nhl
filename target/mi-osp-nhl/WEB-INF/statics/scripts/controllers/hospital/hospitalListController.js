/**
 * Created by xmy on 2016/11/10.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('hospitalListController', ['$scope', '$rootScope','$timeout','hospitalService',function ($scope, $rootScope,$timeout,hospitalService) {
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
                    cellTemplate: '<div class=\'ui-grid-cell-contents\'><a ng-if="grid.appScope.permission.hospitaldepartmentDetail" href="#hospitaldepartment/detail/:{{row.entity.id}}"><span ng-bind="row.entity.name"></span></a><span ng-if="!grid.appScope.permission.hospitaldepartmentDetail" ng-bind="row.entity.name"></span></div>'
                },
                {name:'area', displayName: '所在地',minWidth:100,enableSorting: false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div class="ui-grid-cell-contents">' +
                    '<span ng-bind="row.entity.provincename==null?\'\':row.entity.provincename"></span>'+
                    '<span ng-bind="row.entity.cityname==null?\'\':row.entity.cityname"></span>'+
                    '<span ng-bind="row.entity.districtname==null?\'\':row.entity.districtname"></span>'+
                    '</div>'
                },
                {name: 'address', displayName: '地址', minWidth:100,headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'level', displayName: '级别',cellFilter: 'metadataFilter:grid.appScope.medicalLevelDatas',minWidth:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'type', displayName: '类型',minWidth:100, headerCellClass: 'cell-center'},
                {name: 'code', displayName: '编码',minWidth:100, headerCellClass: 'cell-center'},
                {name: 'phone', displayName: '电话',minWidth:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 170, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-if="grid.appScope.permission.hospitaldepartmentDetail" href="#hospitaldepartment/detail/:{{row.entity.id}}">' +
                    '       <i class="icon-file-text-o"></i> 详情' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.hospitaldepartmentEdit" href="#hospitaldepartment/edit/:{{row.entity.id}}" class="operate-a">' +
                    '      <i class="icon-edit"></i> 编辑' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.hospitaldepartmentDelete" ng-click="grid.appScope.delhospital(row.entity.id)">' +
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
                        $scope.hospitalDetail = rowEntity;
                        $scope.searchDepartment($scope.hospitalDetail.id);
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
            hospitalService.QueryHospitalList($scope.gridOptions.queryPrarms).success(function (data) {
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
                    bootbox.alert(data.msg);
                }
            });
        };

        //删除医院
        $scope.delhospital = function(id){
            bootbox.confirm("确定删除该医院？", function (result) {
                if (result) {
                    hospitalService.DelHospital({id:id}).success(function(data){
                        if(data.code==200){
                            $scope.gridOptions.search();
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            })
        };

        //获取医院等级
        hospitalService.GetMedicalLevel().success(function (data) {
            if(data.code==200)
                $scope.medicalLevelDatas = data.data.result;
            else
                $scope.medicalLevelDatas = [];
        });

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

        //搜索医院科室
        $scope.searchDepartment = function(id){
            hospitalService.QueryHospitalDepartList({id:id}).success(function (data) {
                if(data.data.result.length==0){
                    $scope.flag = true;
                }else{
                    $scope.flag = false;
                    $scope.departList = data.data.result;
                }
            });
        };

        //获取专业科室列表
        hospitalService.QueryMedicalDepartTree().success(function(data){
            if(data.code==200){
                $scope.result = data.data.result;
                for(var i=0;i<$scope.result.length;i++){
                    $scope.result[i].newName = "";
                    var level = $scope.result[i].level_;
                    var string = "";
                    if(level>1){
                        for(var j=1;j<level;j++){
                            string+="&nbsp;&nbsp;&nbsp;";
                        }
                        $scope.result[i].newName=string+$scope.result[i].name;
                    }else{
                        $scope.result[i].newName=$scope.result[i].name;
                    }
                }
                $scope.prodepartmentList = $scope.result;
            }
        });

        $scope.showDepartment = function(){
            if($scope.nodata)
                bootbox.alert("请选择医院！");
            else
                $('#departmentModal').modal('show');
        };

        $scope.depart = {};
        //添加医院科室
        $scope.addDepart = function(valid){
            if(valid){
                $scope.depart.hospital_id = $scope.hospitalDetail.id;
                hospitalService.InsertMedicalDepart($scope.depart).success(function(data){
                    if(data.code==200){
                        $scope.cancleAdddepart();
                        $scope.searchDepartment($scope.depart.hospital_id);
                    }else{
                        $scope.serverErrorInfo = data.msg;
                    }
                });
            }
        };

        //取消添加医院科室
        $scope.cancleAdddepart = function(){
            $('#departmentModal').modal('hide');
            $scope.serverErrorInfo = "";
            $scope.depart.name = '';
            $scope.depart.medicaldepart_id = '';
            $scope.depart.code = '';
            $scope.depart.description = '';
            $scope.adddepart.departmentname.$setUntouched();
            $scope.adddepart.departmentcode.$setUntouched();
            $scope.adddepart.$setPristine();
        };

        //取消编辑医院科室
        $scope.cancleUpdatedepart = function(){
            $('#updateDepartModal').modal('hide');
            $scope.serverErrorInfo = "";
        };

        //删除医院科室
        $scope.delDepart = function(id,hospitalId){
            bootbox.confirm("确定删除该科室？", function (result) {
                if (result) {
                    hospitalService.DelDepart({id:id}).success(function(data){
                        if(data.code==200){
                            $scope.searchDepartment(hospitalId);
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        };

        //获取科室详细信息
        $scope.getDepart = function(id,hospitalId){
            $('#updateDepartModal').modal('show');
            hospitalService.QueryDepartByID({id:id}).success(function(data){
                if(data.code==200){
                    $scope.departDetail = data.data.result;
                }else{
                    bootbox.alert(data.msg);
                }
            });
        };

        //编辑科室
        $scope.updateDepartment = function(valid,hospitalId){
            if(valid){
                hospitalService.UpdateDepart($scope.departDetail).success(function (data) {
                    if (data.code == 200) {
                        $scope.cancleUpdatedepart();
                        $scope.searchDepartment(hospitalId);
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
