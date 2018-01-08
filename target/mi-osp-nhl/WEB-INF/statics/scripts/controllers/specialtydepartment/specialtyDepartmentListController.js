/**
 * Created by zd on 2016/11/10.
 */
define(['../module'], function (controllers) {
    'use strict';
    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('specialtyDepartmentListController', ['$scope', '$rootScope', '$timeout', 'specialtyDepartmentService',
        function ($scope, $rootScope, $timeout, specialtyDepartmentService) {
            $scope.CurrentNode = null;//当前节点
            $scope.CurrentParent = null;//当前节点父节点
            $scope.arrList = {};
            $scope.parent_id = "";//创建根目录默认赋值“”
            $scope.deleteNodeIndex = 0; //删除当前第一个

            //关闭弹窗
            $scope.cancel = function () {
                $('#editModal').modal('hide');
                $('#addModal').modal('hide');
                $('#addRootModal').modal('hide');
                //参数的引入为了解决表单错误时关闭弹层再弹出层时错误提示仍在的问题
                $scope.isShowOrgIdError = false;
                $scope.isShowOrgNameError = false;
                $scope.isShowOrgEditIdError = false;
                $scope.isShowOrgEditNameError = false;
                $scope.org = {};
                $scope.org.id = "";
                $scope.orgEdit = {};
                $scope.orgEdit.id = "";
                $scope.serverErrorInfo = "";//清空错误信息提示
            };


            //根目录地区等级选中
            $scope.addRoot = function () {
                $scope.org = {};
                $scope.org.level_ = "1";
            };

            //子目录地区等级选中
            $scope.addChild = function () {
                $('#addModal').modal('show');
                $scope.org = {};
                $scope.childDepartmentLevelList = [];
                specialtyDepartmentService.levelCompany().success(function (data) {
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].itemvalue > $scope.CurrentNode.level_) {
                            $scope.childDepartmentLevelList.push(data.data[i]);
                        }
                    }
                    if ($scope.childDepartmentLevelList.length == 0) {
                        //判断如果最后一级==0，添加之后每一个子节点都是最低等级
                        $scope.childDepartmentLevelList.push(data.data[data.data.length - 1]);
                        $scope.org.level_ = String(parseInt($scope.CurrentNode.level_));
                    } else {
                        $scope.org.level_ = String(parseInt($scope.CurrentNode.level_) + 1);
                    }
                });
            };


            //获取数据
            $scope.query = function (datas) {
                specialtyDepartmentService.levelCompany().success(function (data) {
                    //获取等级列表
                    $scope.departmentLevelList = data.data;
                    //获取数据
                    specialtyDepartmentService.getChildDepartmentList({id: ""}).success(function (data) {
                        if (data.data.length != 0) {
                            //禁用状态true为禁用，false为可用
                            $scope.disabledBtn = false;
                            $scope.textVisible = false;
                            $scope.scrollCurrentNode = 0;
                            for (var i = 0; i < data.data.length; i++) {
                                if ($scope.selectedNodeId == data.data[i].id) {
                                    $scope.orgDatail = data.data[i];
                                    $scope.CurrentNode = $scope.orgDatail;
                                    $scope.arrList[$scope.CurrentNode.id] = $scope.CurrentNode;
                                    $scope.CurrentNode.isChecked = true;//显示背景颜色为选中(ture:为选中 背景变色)
                                    $scope.scrollCurrentNode = parseFloat(i / data.data.length) * $(".treeHeight").height();//计算根目录整体容器高度
                                } else {
                                    data.data[i].isChecked = false;//显示背景颜色为不选中(ture:为选中 背景变色)
                                }
                                if(datas && datas.length!=0 && data.data[i].id==datas[0].id){
                                    $scope.arrList[data.data[i].id] = data.data[i];
                                    $scope.getChildData(data.data[i].id,data.data[i],datas.slice(1));
                                    data.data[i].isPlus = false; //显示树状结构的图片("+"图标,false："-")
                                    $scope.scrollCurrentNode = parseFloat(i / data.data.length) * $(".treeHeight").height();//计算根目录整体容器高度
                                }else{
                                    data.data[i].isPlus = true; //显示树状结构的图片("+"图标,false："-")
                                }
                            }
                            $scope.data = data;
                            if (!$scope.CurrentNode) {
                                if ($scope.deleteNodeIndex != null && $scope.deleteNodeIndex > 0) {
                                    if ($scope.deleteNodeIndex == $scope.data.data.length) {
                                        $scope.deleteNodeIndex = $scope.deleteNodeIndex - 1;
                                    }
                                    $scope.orgDatail = data.data[$scope.deleteNodeIndex]; //显示默认数
                                    $scope.selectedNodeId = data.data[$scope.deleteNodeIndex].id;
                                    $scope.scrollCurrentNode = parseFloat(($scope.deleteNodeIndex) / $scope.data.data.length) * $(".treeHeight").height();//计算根目录整体容器高度
                                } else {
                                    $scope.orgDatail = data.data[0]; //显示默认数
                                    $scope.selectedNodeId = data.data[0].id;
                                }
                                specialtyDepartmentService.getMedicalDepartmentByID({id:data.data[0].id}).success(function (orgData) {
                                    $scope.orgDatail.parent_code = orgData.data.parent_code;
                                    $scope.CurrentNode = $scope.orgDatail;
                                    $scope.CurrentNode.isChecked = true;
                                });
                            }
                            $timeout(function () {
                                //添加节点后滚动到当前节点根目录位置
                                $(".tree").scrollTop($scope.scrollCurrentNode);
                            }, 500, false);
                        } else {
                            $scope.data = data;
                            $scope.orgDatail = null;
                            //禁用状态true为禁用，false为可用
                            $scope.disabledBtn = true;
                            $scope.textVisible = true;
                        }
                    });
                });
            };
            $scope.query();//加载数据

            $scope.getChildData = function (Id, node,datas) {
                specialtyDepartmentService.getChildDepartmentList({id: Id}).success(function (data) {
                    for (var i = 0; i < data.data.length; i++) {
                        if ($scope.selectedNodeId == data.data[i].id) {
                            $scope.orgDatail = data.data[i];
                            $scope.CurrentNode = data.data[i];
                            specialtyDepartmentService.getMedicalDepartmentByID({id:data.data[i].id}).success(function (dataById) {
                                $scope.orgDatail.parent_code = dataById.data.parent_code;
                                $scope.CurrentNode.parent_code = dataById.data.parent_code;
                            });
                            data.data[i].isChecked = true;//显示背景颜色为选中(ture:为选中 背景变色)
                        } else {
                            data.data[i].isChecked = false;//显示背景颜色为不选中(ture:为选中 背景变色)
                        }
                        if(datas && datas.length!=0 && data.data[i].id==datas[0].id){
                            $scope.arrList[data.data[i].id] = data.data[i];
                            $scope.getChildData(data.data[i].id,data.data[i],datas.slice(1));
                            data.data[i].isPlus = false; //显示树状结构的图片("+"图标,false："-")
                            $scope.scrollCurrentNode = parseFloat(i / data.data.length) * $(".treeHeight").height();//计算根目录整体容器高度
                        }else{
                            data.data[i].isPlus = true; //显示树状结构的图片("+"图标,false："-")
                        }
                    }
                    node.childData = data;
                    node.isPlus = false;
                });
            };


            //图标点击事件
            $scope.checkTreeClick = function (org) { //点击图片加载子节点
                $scope.parent_id = org.id;
                $scope.arrList[org.id] = org;
                //判断当前节点是否展开 如果是展开 则关闭（图标换为“+”）,否则加载数据并改变图标为“-”
                if (!org.isPlus) {
                    //清空当前节点的子节点（如果有再次点击不请求服务器  应该交给第三变量）
                    org.childData = null;
                    //更改图标为“+”
                    org.isPlus = true;
                } else {
                    //改变图片为“-”
                    org.isPlus = false;
                    $scope.getChildData(org.id, org);
                }
            };

            //修改信息拷贝数据
            $scope.editOrg = function () {
                $('#editModal').modal('show');
                $scope.orgEdit = {};
                angular.copy($scope.CurrentNode, $scope.orgEdit);//拷贝数据
                //获取焦点时清空错误信息
                $("input[type='text']").focus(function(){
                    $scope.serverErrorInfo = "";
                });
                if($scope.arrList[$scope.orgDatail.parent_id] != null){
                    $scope.orgEdit.parent_id = $scope.arrList[$scope.orgDatail.parent_id].id;
                }
            };

            //节点选中事件
            $scope.createShow = function (org) {
                $scope.arrList[org.id] = org;
                $scope.selectedNodeId = org.id;
                //判断CurrentNode是否为空
                if ($scope.CurrentNode != null || $scope.CurrentNode == true) {
                    //此时CurrentNode为上次选中节点，将上次选中节点背景色改为非选中状态
                    $scope.CurrentNode.isChecked = false;
                }
                //将当前节点改为选中状态(改变背景色)
                org.isChecked = true;
                //将CurrentNode 改变为当前选中节点
                specialtyDepartmentService.getMedicalDepartmentByID({id:org.id}).success(function (data) {
                    $scope.orgDatail = data.data;
                    org.parent_code = data.data.parent_code;
                    $scope.CurrentNode = org;
                    //页面右侧详细信息 展示
                    $scope.oldParentCode = org.parent_code;
                });
            };


            //添加方法
            $scope.create = function (valid, parent_id) {
                //参数的引入为了解决表单错误时关闭弹层再弹出层时错误提示仍在的问题
                $scope.isShowOrgIdError = true;
                $scope.isShowOrgNameError = true;
                if (valid) {
                    $scope.org.parent_id = parent_id;
                    if($scope.org.parent_id != ""){
                        $scope.org.parent_code = $scope.arrList[$scope.org.parent_id].code;
                    }
                    specialtyDepartmentService.addDepartment($scope.org).success(function (data) {
                        if (data.code == 200) {
                            if (parent_id == "") {
                                $scope.selectedNodeId = data.data;//获取ID
                                $scope.query();
                            }
                            else {
                                $scope.getChildData(parent_id, $scope.CurrentNode);
                                //设置当前节点含有子节点（显示图标）
                                $scope.CurrentNode.hasChild = true;
                                //设置图标为“-”
                                $scope.isPlus = false;
                            }
                            $scope.cancel();
                        } else {
                            $scope.serverErrorInfo = data.msg;
                        }
                    });
                }
            };


            //编辑对话框
            $scope.edit = function (valid, org) {
                //参数的引入为了解决表单错误时关闭弹层再弹出层时错误提示仍在的问题
                $scope.isShowOrgEditIdError = true;
                $scope.isShowOrgEditNameError = true;
                if (valid) {
                    if($scope.orgEdit.code == $scope.orgEdit.parent_code){
                        $scope.serverErrorInfo = "专业系统迁移编码，不允许是当前专业系统编码！";
                        return;
                    }else {
                        $scope.isChild = false;
                        specialtyDepartmentService.getMedicalDepartmentByCode({code:org.parent_code}).success(function (codeData){
                            if(codeData.code == 201){
                                $scope.serverErrorInfo = "您迁移的节点不存在！";
                                return;
                            }
                            org.parent_id = codeData.data.id;
                            specialtyDepartmentService.queryMedicalDepartment({id:org.parent_id}).success(function (dChild){
                                var childList = dChild.data;
                                for(var i=0; i<childList.length; i++){
                                    if(childList[i].code == org.code){
                                        $scope.isChild = true;
                                        $scope.serverErrorInfo = "不能迁移到当前节点的子节点！";
                                        return;
                                    }
                                }
                                if(!$scope.isChild){
                                    specialtyDepartmentService.editDepartment(org).success(function (data) {
                                        if (data.code == 200) {
                                            if ($scope.oldParentCode != null && $scope.oldParentCode == $scope.orgEdit.parent_code) {
                                                $scope.orgDatail = org;
                                                $scope.selectedNodeId = org.id;
                                                $scope.CurrentNode.isChecked = true;
                                                $scope.arrList[org.parent_id].isPlus = true;
                                                $scope.checkTreeClick($scope.arrList[org.parent_id]);
                                            }else {
                                                specialtyDepartmentService.queryMedicalDepartment({id:org.parent_id}).success(function (d){
                                                    $scope.query(d.data);//加载数据
                                                });
                                            }
                                            $scope.cancel();
                                            $scope.oldParentCode = org.parent_code;
                                        } else {
                                            $scope.serverErrorInfo = data.msg;
                                        }
                                    });
                                }
                            });
                        });
                    }
                }
            };


            //删除Org
            $scope.delete = function (org) {
                $scope.serverErrorInfo = "";//清空错误信息提示
                if (org.id == '') {
                    bootbox.alert("未选择任何记录！")
                } else {
                    bootbox.confirm("确定删除该数据？", function (result) {
                        if (result) {
                            for (var i = 0; i < $scope.data.data.length; i++) {
                                if ($scope.data.data[i].id == org.id) {
                                    $scope.deleteNodeIndex = i;
                                    break;
                                }
                            }
                            if ($scope.arrList[org.parent_id] != null && $scope.arrList[org.parent_id].childData.data.length > 0) {
                                for (var i = 0; i < $scope.arrList[org.parent_id].childData.data.length; i++) {
                                    if ($scope.arrList[org.parent_id].childData.data[i].id == org.id) {
                                        $scope.deleteChildNodeIndex = i;
                                        break;
                                    }
                                }
                            }
                            if (org.hasChild) {
                                bootbox.confirm("含有子集目录，确定删除？", function (resultChild) {
                                    if (resultChild) {
                                        specialtyDepartmentService.delete({id: org.id}).success(function (data) {
                                            //删除成功后 刷新列表
                                            if ($scope.arrList[org.parent_id] != null) {
                                                $scope.arrList[org.parent_id].isPlus = true;
                                                $scope.checkTreeClick($scope.arrList[org.parent_id]);
                                                specialtyDepartmentService.getChildDepartmentList({id: $scope.arrList[org.parent_id].id}).success(function (data) {
                                                    $scope.arrList[org.parent_id].childData = data;
                                                    if (data.data.length == 0) {
                                                        $scope.arrList[org.parent_id].isChecked = true;
                                                        $scope.orgDatail = $scope.arrList[org.parent_id];
                                                        $scope.CurrentNode = $scope.arrList[org.parent_id];
                                                        $scope.selectedNodeId = $scope.arrList[org.parent_id].id;
                                                        $scope.arrList[org.parent_id].childData = null;
                                                        $scope.arrList[org.parent_id].hasChild = false;
                                                    } else {
                                                        for (var i = 0; i < data.data.length; i++) {
                                                            data.data[i].isChecked = false;//显示背景颜色为不选中(ture:为选中 背景变色)
                                                            data.data[i].isPlus = true;//显示树状结构的图片("+"图标,false："-")
                                                        }
                                                        if ($scope.deleteChildNodeIndex == data.data.length) {
                                                            $scope.deleteChildNodeIndex = $scope.deleteChildNodeIndex - 1
                                                        }
                                                        $scope.arrList[org.parent_id].childData.data[$scope.deleteChildNodeIndex].isChecked = true;
                                                        $scope.orgDatail = $scope.arrList[org.parent_id].childData.data[$scope.deleteChildNodeIndex];
                                                        $scope.CurrentNode = $scope.arrList[org.parent_id].childData.data[$scope.deleteChildNodeIndex];
                                                        $scope.selectedNodeId = $scope.arrList[org.parent_id].childData.data[$scope.deleteChildNodeIndex].id;
                                                    }
                                                });
                                            } else {
                                                $scope.CurrentNode = null;
                                                $scope.query();//加载数据
                                            }
                                        });
                                    }
                                });
                            } else {
                                specialtyDepartmentService.delete({id: org.id}).success(function (data) {
                                    //删除成功后 刷新列表
                                    if ($scope.arrList[org.parent_id] != null) {
                                        $scope.arrList[org.parent_id].isPlus = true;
                                        $scope.checkTreeClick($scope.arrList[org.parent_id]);
                                        specialtyDepartmentService.getChildDepartmentList({id: $scope.arrList[org.parent_id].id}).success(function (data) {
                                            $scope.arrList[org.parent_id].childData = data;
                                            if (data.data.length == 0) {
                                                $scope.arrList[org.parent_id].isChecked = true;
                                                $scope.orgDatail = $scope.arrList[org.parent_id];
                                                $scope.CurrentNode = $scope.arrList[org.parent_id];
                                                $scope.selectedNodeId = $scope.arrList[org.parent_id].id;
                                                $scope.arrList[org.parent_id].childData = null;
                                                $scope.arrList[org.parent_id].hasChild = false;
                                            } else {
                                                for (var i = 0; i < data.data.length; i++) {
                                                    data.data[i].isChecked = false;//显示背景颜色为不选中(ture:为选中 背景变色)
                                                    data.data[i].isPlus = true;//显示树状结构的图片("+"图标,false："-")
                                                }
                                                if ($scope.deleteChildNodeIndex == data.data.length) {
                                                    $scope.deleteChildNodeIndex = $scope.deleteChildNodeIndex - 1;
                                                }
                                                $scope.arrList[org.parent_id].childData.data[$scope.deleteChildNodeIndex].isChecked = true;
                                                $scope.orgDatail = $scope.arrList[org.parent_id].childData.data[$scope.deleteChildNodeIndex];
                                                $scope.CurrentNode = $scope.arrList[org.parent_id].childData.data[$scope.deleteChildNodeIndex];
                                                $scope.selectedNodeId = $scope.arrList[org.parent_id].childData.data[$scope.deleteChildNodeIndex].id;
                                            }
                                        });
                                    } else {
                                        $scope.CurrentNode = null;
                                        $scope.query();//加载数据
                                    }
                                });
                            }
                        }
                    })
                    ;
                }
            };

            //弹出层input的focus事件
            $scope.inputFocus = function (isShow, formName, inputName) {
                //判断是否是首次focus
                if (!$scope[isShow]) {
                    $scope[isShow] = true;
                    $scope[formName][inputName].$touched = false;
                    $scope[formName].$submitted = false;
                }
            };
        }]);
});