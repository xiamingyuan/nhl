define(['./module'], function (filters) {


    'use strict';

    return filters.filter('dataMark_ymd', function () {
        //格式化日期  年月日
        return function (dataTime) {
            var dateformat = function (dataTime, fomartstr) {
                try {
                    return dataTime == null ? "" : (eval(dataTime.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))).pattern(fomartstr);
                } catch (e) {
                    return '';
                }
            };
            return dateformat(dataTime, 'yyyy-MM-dd');
        };
    }).filter("dataMark_ymdhms", function () {
        //格式化日期   年月日 时分
        var fn = function (dataTime, createdtime) {
            var dateformat = function (dataTime, fomartstr, createdtime) {
                try {
                    if (dataTime) {
                        if (dataTime.lastIndexOf("-") < 0) {
                            return dataTime == null ? "" : (eval(dataTime.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))).pattern(fomartstr);
                        }
                        return createdtime == null ? "" : (eval(createdtime.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))).pattern(fomartstr);
                    }
                } catch (e) {
                    return '';
                }
            };
            return dateformat(dataTime, 'yyyy-MM-dd HH:mm:ss', createdtime);
        };
        return fn;
    }).filter("insuranceAudit", function () {
        var fn = function (status) {
            var result = function (status) {
                var res = "";
                switch (status) {
                    case 0:
                        res = "待审核";
                        break;
                    case 1:
                        res = "审核中";
                        break;
                    case 2:
                        res = "已通过";
                        break;
                    case 3:
                        res = "已拒绝";
                        break;
                }
                return res;
            };
            return result(status);
        }
        return fn;
    }).filter("clientBindStatusEnum", function () {
        //绑定信息狀態
        var fn = function (status) {
            var result = function (status) {
                switch (parseInt(status)) {
                    case 1:
                        return "待处理";
                        break;
                    case 2:
                        return "已绑定";
                        break;
                    case 3:
                        return "已驳回";
                        break;
                    default:
                        return "未知";

                }
            };
            return result(status);
        }
        return fn;
    }).filter('orderClass', function () {
        //表格排序图标样式
        var fn = function (status) {
            var result = function (status) {
                if (status == 'desc') {
                    return "glyphicon-chevron-down";
                } else if (status == 'asc') {

                    return "glyphicon-chevron-up";
                } else {
                    return '';
                }
            };
            return result(status);
        }
        return fn;
    }).filter('TABcheckBox', ['$sce', function ($sce) {
        //可以把html字符串当成真正的html结构输出到页面
        var fn = function (text) {
            var result = function (status) {
                return $sce.trustAsHtml(text);
            };
            return result(status);
        }
        return fn;
    }]).filter('Status', function () {
        return function (input) {
            return parseInt(input) ? '已发布' : '未发布';
        }
    }).filter("validValue", function () {
        //商品信息的月销量
       return function (status) {
            var result = function (status) {
                var res = status;
                if (status == 0 || status=="" || status==undefined || status==null)
                    res = "";
                return res;
            };
            return result(status);
        }
    }).filter("complaintStatus", function () {
        //申诉状态
        return function (status, reason) {
            var result = function (status, reason) {
                switch (parseInt(status)) {
                    case 0:
                        return "申诉中";
                        break;
                    case 1:
                        return "申诉通过";
                        break;
                    case 2:
                        if (reason != "" && reason != null && reason != undefined)
                            return "申诉拒绝(" + reason + ")";
                        else
                            return "申诉拒绝";
                        break;
                }
            };
            return result(status, reason);
        }
    }).filter("serNewCharacter", function () {
        //性質
        return function (character) {
            var result = function (character) {
                switch (character) {
                    case 0:
                        return '咨询';
                        break;
                    case 1:
                        return '投诉';
                        break;
                    default:
                        return '--';
                }
            };
            return result(character);
        }
    }).filter("serNewType", function () {
        //類別
        return function (type) {
            var result = function (type) {
                switch (type) {
                    case 0:
                        return '产品咨询及变更';
                        break;
                    case 1:
                        return '就医环节';
                        break;
                    case 2:
                        return '报销环节';
                        break;
                    case 3:
                        return '疾病知识';
                        break;
                    case 4:
                        return '业务咨询';
                        break;
                    case 5:
                        return '使用说明';
                        break;
                    default:
                        return '--';
                }
            };
            return result(type);
        }
    }).filter("floatDigit", function () {
        return function (num) {
            var result = function (num) {
                if (num == undefined || num == null)
                    return "";
                num += '';
                num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符
                if (/^0+/) //清除字符串开头的0
                    num = num.replace(/^0+/, '');
                if (!/\./.test(num)) //为整数字符串在末尾添加.00
                    num += '.00';
                if (/^\./.test(num)) //字符以.开头时,在开头添加0
                    num = '0' + num;
                //如果小数点后超出2位，对第三位进行四舍五入
                var arrayContent = num.split('.');
                if (arrayContent[1].length > 2) {
                    num = Math.round(num * 100) / 100;
                }
                num += '00';        //在字符串末尾补零
                num = num.match(/\d+\.\d{2}/)[0];

                return num;
            };
            return result(num);
        }
    }).filter("twoDecimals", function () {
        //商品分类统计占中类和大类的百分比转化
        return function (percent) {
            var result = function (percent) {
                var res = "";
                res = percent.toString();
                if (res.indexOf('.') > 0) {
                    if (res.substring(res.indexOf('.')).length == 2) {
                        res = res + "0%";
                    }
                    else {
                        res = res + "%";
                    }
                }
                else if(res==0.00){
                    res="";
                }else{
                    res = res + ".00%";
                }
                return res;
            };
            return result(percent);
        }
    }).filter("respondentStatus", function () {
        //被申诉状态
        return function (status, reason, complatintid) {
            var result = function (status, reason, complatintid) {
                switch (parseInt(status)) {
                    case 0:
                        return "合规报销";
                        break;
                    case 1:
                        if (reason != "" && reason != null && reason != undefined)
                            return "虚假报销(" + reason + ")";
                        else
                            return "虚假报销";
                        break;
                    default:
                        if (complatintid != "" && complatintid != null && complatintid != undefined)
                            return "合规报销";
                        else
                            return "未审核";
                        break;
                }
            };
            return result(status, reason, complatintid);
        }
    }).filter('placedtopstatus', function () {
        return function (input) {
            return parseInt(input) ? '已置顶' : '未置顶';
        }
    }).filter('gender', function () {
        //性别
        return function (input) {
            if (input == "1") {
                return "男";
            } else if (input == "2") {
                return "女";
            } else {
                return "";
            }
        }
    }).filter('genderf', function () {
        //性别
        return function (input) {
            if (input == "1") {
                return "♂";
            } else if (input == "2") {
                return "♀";
            } else {
                return "";
            }
        }
    }).filter('genderName', function () {
        //性别
        return function (input) {
            if (input == "MAN") {
                return "男";
            } else if (input == "WOMEN") {
                return "女";
            } else {
                return "";
            }
        }
    }).filter("StateOfHealthCard", function () {
        //新健康卡状态
        var fn1 = function (status) {
            var convertstatus = function (status) {
                switch (parseInt(status)) {
                    case 0:
                        return "未激活";
                        break;
                    case 1:
                        return "正常";
                        break;
                    case 2:
                        return "转让中";
                        break;
                    case 3:
                        return "禁用";
                        break;
                }
            };
            return convertstatus(status);
        }
        return fn1;
    }).filter("StateOfHealthCardNew", function () {
        //新健康卡状态
        var fn1 = function (status) {
            var convertstatus = function (status) {
                switch (status) {
                    case "INACTIVE":
                        return "未激活";
                        break;
                    case "NORMAL":
                        return "正常";
                        break;
                    case "TRANSFER":
                        return "转让中";
                        break;
                    case "DISABLED":
                        return "禁用";
                        break;
                }
            };
            return convertstatus(status);
        }
        return fn1;
    }).filter('metadataFilter', function () {
        //元数据过滤器
        return function (input, arr) {
            if (input == "" || input == null || input == undefined) {
                return "";
            }
            for (var i = 0; i < arr.length; i++) {
                if (input == arr[i].itemvalue) {
                    return arr[i].itemname;
                }
            }
            return "";
        }
    }).filter('departNameFilter', function () {
        //二级科室
        return function (input, child) {
            if (input == "" || input == null || input == undefined) {
                if (child == "" || child == null || child == undefined) {
                    return "";
                }
                else {
                    return child;
                }
            } else {
                if (child == "" || child == null || child == undefined) {
                    return input;
                }
                else {
                    return input + ' ' + child;
                }
            }
            return "";
        }
    }).filter('vaccinetype', function () {
        //疫苗类型
        return function (input) {
            if (input == "1") {
                return "计划接种";
            } else {
                return "非计划接种";
            }
        }
    }).filter('isEnabled', function () {
        //疫苗启用状态
        return function (input) {
            if (input == "0") {
                return "禁用";
            } else if (input == "1") {
                return "启用";
            } else {
                return "";
            }
        }
    }).filter('target', function () {
        //身份认证
        return function (input) {
            if (input == "0") {
                return "医院";
            } else if (input == "1") {
                return "科室";
            } else {
                return "医生";
            }
        }
    }).filter('authenstatus', function () {
        //身份认证
        return function (input) {
            if (input == "1") {
                return "";
            } else if (input == "2") {
                return "√";
            } else if (input == "3") {
                return "";
            } else {
                return "";
            }
        }
    }).filter('authenstatuss', function () {
        //审核认证
        return function (input) {
            if (input == "0") {
                return "待审核";
            } else if (input == "1") {
                return "审核中";
            } else if (input == "2") {
                return "审核通过";
            } else if (input == "3") {
                return "审核拒绝";
            } else {
                return "";
            }
        }
    }).filter('auditstatusf', function () {
        //审核认证办理状态
        return function (input, iscancelled) {
            if (iscancelled != null && iscancelled != undefined && iscancelled == true) {
                return "已撤销";
            }
            if (input == "AUDITING") {
                return "待办理";
            } else if (input == "SUCCESSFUL") {
                return "办理成功";
            } else if (input == "FAILURE") {
                return "办理失败";
            } else {
                return "办理中";
            }
        }
    }).filter('authenstatusf', function () {
        //身份认证
        return function (input,iscancelled) {
            if (iscancelled != null && iscancelled != undefined && iscancelled == true) {
                return "已撤销";
            }
            if (input == "1") {
                return "未认证";
            } else if (input == "2") {
                return "已认证";
            } else if (input == "3") {
                return "认证失败";
            } else if (input == "4") {
                return "认证中";
            } else {
                return "未认证";
            }
        }
    }).filter('insuranceStatusf', function () {
        //医保认证
        return function (input) {
            if (input == null || input == undefined || input == "") {
                return "未认证";
            } else if (input == "0") {
                return "未认证";
            } else if (input == "1") {
                return "认证中";
            } else if (input == "2") {
                return "已认证";
            } else if (input == "3") {
                return "认证失败";
            } else if (input == "4") {
                return "认证中";
            } else {
                return "未认证";
            }
        }
    }).filter('insuranceStatus', function () {
        //医保认证
        return function (input) {
            if (input == "1") {
                return "√";
            } else {
                return "";
            }
        }
    }).filter('authenmode', function () {
        //认证方式
        return function (input) {
            if (input == '1') {
                return '身份证';
            } else if (input == '2') {
                return '社保卡';
            } else {
                return '';
            }
            //   return parseInt(input) ? '身份证' : '社保卡';
        }
    }).filter('level', function () {
        //等级
        return function (input) {
            return "VIP" + input;
        }
    }).filter('initiate', function () {
        return function (input) {
            return parseInt(input) ? '启用' : '停用';
        }
    }).filter('signstate', function () {
        //签约审核认证
        return function (input) {
            if (input == "SIGNING") {
                return "签约中";
            }
            if (input == "SUCCESS") {
                return "签约成功";
            } else if (input == "REFUSE") {
                return "签约拒绝";
            } else if (input == "UNDO") {
                return "已撤销";
            } else if (input == "HASTERMINATION") {
                return "已解约";
            } else {
                return "";
            }
        }
    }).filter('ordertate', function () {
        //预约审核认证
        return function (input, iscancelled) {
            if (iscancelled != null && iscancelled != undefined && iscancelled == true) {
                return "已撤销";
            }
            if (input == "0") {
                return "预约中";
            }
            if (input == "1") {
                return "预约成功";
            } else if (input == "2") {
                return "预约失败";
            } else {
                return "预约取消";
            }
        }
    }).filter('period', function () {
        //预约审核认证
        return function (input) {
            if (input == null)
                return '';
            return input + '月龄 ';
        }
    }).filter('ampm', function () {
        //医保认证
        return function (input) {
            if (input == "am") {
                return "上午";
            } else {
                return "下午";
            }
        }
    }).filter('messageTypeId', function () {
        //消息类型---消息管理
        return function (input) {
            if (input == "0") {
                return "系统消息";
            } else if (input == "1") {
                return "复诊消息";
            } else if (input == "2") {
                return "用药提醒";
            } else if (input == "3") {
                return "取药提醒";
            } else if (input == "4") {
                return "疫苗接种提醒";
            } else if (input == "5") {
                return "健康小贴士";
            }
        }
    }).filter('isAllUser', function () {
        //是否所有用户--消息管理
        return function (input) {
            if (input == "0") {
                return "指定用户";
            } else if (input == "1") {
                return "所有用户";
            }
        }
    }).filter('sendStatus', function () {
        //发送状态--消息管理
        return function (input) {
            if (input == "0") {
                return "待发送";
            } else if (input == "1") {
                return "发送中";
            } else if (input == "2") {
                return "发送完毕";
            } else if (input == "3") {
                return "已取消";
            }
        }
    }).filter('isVisible', function () {
        //医生组是否可见
        return function (input) {
            if (input == "1") {
                return "显示";
            } else {
                return "不显示";
            }
        }
    }).filter('isReply', function () {
        //便民问答是否回复
        return function (input) {
            if (input == "1")
                return "已回复";
            else
                return "未回复";
        }
    }).filter('appointapplyquery_status', function () {//对象名_字段
        //预约审核认证
        return function (input,isCancelled) {
            if(isCancelled){
                return "已撤销";
            }
            if (input == "APPOINTING") {
                return "预约中";
            } else if (input == "SUCCESS") {
                return "预约成功";
            } else if (input == "REFUSE") {
                return "预约失败";
            } else if (input == "CANCEL") {
                return "预约取消";
            }
        }
    }).filter('spconfirminfo_status', function () {//对象名_字段
        //特门申请办理状态
        return function (input,isCancelled) {
            if(isCancelled){
                return "已撤销";
            }
            if (input == "AUDITING") {
                return "未审核";
            } else if (input == "SUCCESSFUL") {
                return "审核成功";
            } else if (input == "FAILURE") {
                return "审核失败";
            } else if (input == "CERTIFICATION") {
                return "审核中";
            }
        }
    }).filter('pettyclaimenum_status', function () {//对象名_字段
        //异地零报状态
        return function (input,isCancelled) {
            if(isCancelled){
                return "已撤销";
            }
            if (input == "AUDITING") {
                return "审核中";
            } else if (input == "SUCCESSFUL") {
                return "审核成功";
            } else if (input == "FAILURE") {
                return "审核失败";
            }
        }
    }).filter('isauthen', function () {
        //身份认证
        return function (input) {
            if (input == "0") {
                return "未认证";
            } else if(input == "1"){
                return "认证中";
            } else if(input == "2"){
                return "已认证";
            } else {
                return "认证失败";
            }
        }
    }).filter('read', function () {
        //是否阅读
        return function (input) {
            if (input == "1") {
                return "√";
            } else {
                return "";
            }
        }
    }).filter('isSend', function () {
        //消息是否送达
        return function (input) {
            if (input == "1") {
                return "已送达";
            } else {
                return "未送达";
            }
        }
    }).filter('to_trusted', ['$sce', function ($sce) {
        //解析html
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]).filter('getBirthdayFromIdNumber', function () {
        return function (input) {
            if (input == null || input == '') {
                return '';
            }
            if (input.length == 18) {
                var year = input.substring(6, 10);
                var month = input.substring(10, 12);
                var day = input.substring(12, 14);

            } else if (input.length == 15) {
                var year = '19' + input.substring(6, 8);
                var month = input.substring(8, 10);
                var day = input.substring(10, 12);
            }
            else {
                return '';
            }
            return year + '-' + month + '-' + day;
        }
    }).filter('getGenderFromIdNumber', function () {
        return function (input) {
            if (input == null || input == '') {
                return '';
            }
            if (input.length == 18)
                var sex = input.substring(16, 17);
            else if (input.length == 15)
                var sex = input.substring(14, 15);
            else
                return '';
            if (sex % 2 == 0)
                return '♀';
            else
                return '♂';
        }
    }).filter('getBlacklistOperType',function () {
        return function (input) {
            if (input == null || input == '') {
                return "";
            }
            if(input=="0"){
                return "加入";
            }else if(input=="1"){
                return "移出";
            }else {
                return "";
            }
        }
    }).filter('designhospitals', function () {
        //定点医院
        return function (input) {
            if (input == ""||input==null||input==undefined) {
                return "暂无数据";
            }  else {
                return input;
            }
        }
    }).filter('isExistInsurance', function () {
        //是否存在医保
        return function (insuranceno,authenmode,isauthen) {
            if (insuranceno != ""&&authenmode=='2'&&isauthen=='2') {
                return "√";
            }  else {
                return "";
            }
        }
    }).filter('hospitalLevel',function () {
        //医院级别
        return function (input) {
            if (input == ""||input==null||input==undefined) {
                return "";
            }
            if(input=="3"){
                return "三级";
            }else if(input=="2"){
                return "二级";
            }else if(input=="1"){
                return "一级";
            }else if(input=="0"){
                return "其他";
            }else if(input=="-2"){
                return "社区";
            }else if(input=="-1"){
                return "一级以下";
            }else {
                return "";
            }
        }
    }).filter('supplierManagementType',function () {
        //供应商列表 类型
        return function (input) {
            if (input == ""||input==null||input==undefined) {
                return "";
            }
            if(input=="0"){
                return "全部";
            }else if(input=="1"){
                return "生产企业";
            }else if(input=="2"){
                return "流通企业";
            }else if(input=="3"){
                return "终端企业";
            }else if(input=="4"){
                return "电商";
            }else if(input=="5"){
                return "未设定";
            }
        }
    }).filter('contractStatus',function () {
        //供应商列表 合同状态
        return function (input) {
            if (input == "1") {
                return "生效";
            } else {
                return "失效";
            }
        }
    }).filter("PhotoUrl", function () {
        //转换图片路径
        var fn = function (photoUrl, http) {
            var result = function (photoUrl, http) {
                var res = photoUrl == undefined || photoUrl == null || photoUrl == "" ? "image/nopic.gif" : http + photoUrl;
                return res;
            };
            return result(photoUrl, http);
        }
        return fn;
    }).filter("AuditStatus", function () {
        var fn = function (status) {
            var result = function (status) {
                var res = "";
                switch (status) {
                    case "0":
                        res = "待处理";
                        break;
                    case "1":
                        res = "同意";
                        break;
                    case "2":
                        res = "拒绝";
                        break;
                    case "3":
                        res = "退回";
                        break;
                }
                return res;
            };
            return result(status);
        }
        return fn;
    }).filter("getFloatDigit", function () {
        //供应商列表 金额转换0.00
        var fn = function (num) {
            var result = function (num) {
                if (num == undefined || num == null)
                    return "";
                num += '';
                num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符
                if (/^0+/) //清除字符串开头的0
                    num = num.replace(/^0+/, '');
                if (!/\./.test(num)) //为整数字符串在末尾添加.00
                    num += '.00';
                if (/^\./.test(num)) //字符以.开头时,在开头添加0
                    num = '0' + num;
                //如果小数点后超出2位，对第三位进行四舍五入
                var arrayContent = num.split('.');
                if (arrayContent[1].length > 2) {
                    num = Math.round(num * 100) / 100;
                }
                num += '00';        //在字符串末尾补零
                num = num.match(/\d+\.\d{2}/)[0];

                return num;
            };
            return result(num);
        }
        return fn;
    }).filter("GetAuditType", function () {
        var fn = function (status) {
            var result = function (status) {
                var res = "";
                switch (status) {
                    case "0":
                        res = "供应商/药店";
                        break;
                    case "2":
                        res = "报销审核";
                        break;
                    case "3":
                        res = "财务审核";
                        break;
                    default:
                        res = "未知";
                        break;
                }
                return res;
            };
            return result(status);
        }
        return fn;
    }).filter("ReimManageStatus", function () {
        var fn = function (SubmitStatus, AcceptStatus, AuditStep, Status, BusinessConfirmStatus, ProviderConfirmStatus, FinanceConfirmStatus) {
            var result = function (SubmitStatus, AcceptStatus, AuditStep, Status, BusinessConfirmStatus, ProviderConfirmStatus, FinanceConfirmStatus) {
                var res = "";
                if (AcceptStatus == "0")
                    return "待受理"
                else {
                    switch (AuditStep) {
                        case null:
                            return "受理拒绝";
                        case "0":
                            if (Status == 0 && AcceptStatus == 1)
                                return "待供应商审核";
                        case "10":
                            if (FinanceConfirmStatus == "3")
                                return "财务账单已确认";
                            else if (BusinessConfirmStatus == "1" && ProviderConfirmStatus == "2")
                                return "待财务确认账单";
                            else if (BusinessConfirmStatus == "1" && ProviderConfirmStatus == "0")
                                return "待供应商确认账单";
                            else if (BusinessConfirmStatus == "0")
                                return "待业务确认账单";
                            return "待报销审核";
                        case "30":
                            if (Status == 1 && BusinessConfirmStatus == null)
                                return "报销审核拒绝"
                            if (Status == 2 && BusinessConfirmStatus == null)
                                return "待财务审核"
                            if (FinanceConfirmStatus == "3")
                                return "财务账单已确认";
                            else if (BusinessConfirmStatus == "1" && ProviderConfirmStatus == "2")
                                return "待财务确认账单";
                            else if (BusinessConfirmStatus == "1" && ProviderConfirmStatus == "0")
                                return "待供应商确认账单";
                            else if (BusinessConfirmStatus == "0")
                                return "待业务确认账单";
                            return "待财务审核";
                        case "31":
                            if (FinanceConfirmStatus == "3")
                                return "财务账单已确认";
                            else if (BusinessConfirmStatus == "1" && ProviderConfirmStatus == "2")
                                return "待财务确认账单";
                            else if (BusinessConfirmStatus == "1" && ProviderConfirmStatus == "0")
                                return "待供应商确认账单";
                            else if (BusinessConfirmStatus == "0")
                                return "待业务确认账单";
                            return "报销审核退回";
                        case "40":
                            if (FinanceConfirmStatus == "3")
                                return "财务账单已确认";
                            else if (BusinessConfirmStatus == "1" && ProviderConfirmStatus == "2")
                                return "待财务确认账单";
                            else if (BusinessConfirmStatus == "1" && ProviderConfirmStatus == "0")
                                return "待供应商确认账单";
                            else if (BusinessConfirmStatus == "0")
                                return "待业务确认账单";
                            return "财务已审核";
                        case "41":
                            return "财务审核退回";
                    }
                }
                return res;
            };
            return result(SubmitStatus, AcceptStatus, AuditStep, Status, BusinessConfirmStatus, ProviderConfirmStatus, FinanceConfirmStatus);
        }
        return fn;
    }).filter("ShowRefuseBtn", function () {
        var fn = function (auditStep, fcStatus) {
            var result = function (auditStep, fcStatus) {
                if (auditStep != "40" && fcStatus != '3')
                    return true;
            };
            return result(auditStep, fcStatus);
        }
        return fn;
    }).filter("respondentStatus", function () {
        //被申诉状态
        var fn = function (status, reason, complatintid) {
            var result = function (status, reason, complatintid) {
                switch (parseInt(status)) {
                    case 0:
                        return "合规报销";
                        break;
                    case 1:
                        if (reason != "" && reason != null && reason != undefined)
                            return "虚假报销(" + reason + ")";
                        else
                            return "虚假报销";
                        break;
                    default:
                        if (complatintid != "" && complatintid != null && complatintid != undefined)
                            return "合规报销";
                        else
                            return "未审核";
                        break;
                }
            };
            return result(status, reason, complatintid);
        }
        return fn;
    }).filter("ClaimSubmitStatus", function () {
        var fn = function (status) {
            var result = function (status) {
                if (status == "0")
                    return "报销中";
                if (status == "1")
                    return "报销失败";
                if (status == "2" || status == "3")
                    return "报销成功";
                return "";
            };
            return result(status);
        };
        return fn;
    }).filter("GetFinanceConfirmStatus", function () {
        var fn = function (status) {
            var result = function (status) {
                switch (status) {
                    case "0":
                        return "待确认";
                    //case "1":
                    //    return "已确认";
                    case "3":
                        return "已确认";
                }
            };
            //alert(status);
            return result(status);
        };
        return fn;
    }).filter("GetProviderConfirmStatus", function () {
        var fn = function (status) {
            var result = function (status) {
                switch (status) {
                    case "0":
                        return "待确认";
                    case "1":
                        return "已确认";
                    case "2":
                        return "已确认";
                }
            };
            return result(status);
        };
        return fn;
    }).filter("GetFinanceConfirmStatus", function () {
        var fn = function (status) {
            var result = function (status) {
                switch (status) {
                    case "0":
                        return "待确认";
                    //case "1":
                    //    return "已确认";
                    case "3":
                        return "已确认";
                }
            };
            return result(status);
        };
        return fn;
    }).filter("GetAuditNode", function () {
        var fn = function (status) {
            var result = function (status) {
                switch (status) {
                    case "0":
                        return "供应商审核";
                    case "2":
                        return "报销审核";
                    case "3":
                        return "财务审核";
                }
            };
            return result(status);
        };
        return fn;
    }).filter("GetAuditNodeStatus", function () {
        var fn = function (status) {
            var result = function (status) {
                switch (status) {
                    case "0":
                        return "待审核";
                    case "1":
                        return "审核通过";
                    case "2":
                        return "审核拒绝";
                    case "3":
                        return "退回";
                }
            };
            return result(status);
        };
        return fn;
    }).filter("GetAcceptStatus", function () {
        var fn = function (status, auditStep) {
            var result = function (status, auditStep) {
                if (status == "0")
                    return "待受理";
                if (auditStep == null)
                    return "受理拒绝";
                if (status == null || status == "1")
                    return "已受理";
            };
            return result(status, auditStep);
        };
        return fn;
    }).filter("GetInvoiceType", function () {
        var fn = function (status) {
            var result = function (status) {
                var res = "";
                if (status == '0')
                    res = '增值税普通发票';
                else if (status == '1')
                    res = '增值税专用发票';
                return res;
            };
            return result(status);
        };
        return fn;
    }).filter("BankAccountFourGroup", function () {
        //银行卡号4位分组显示
        var fn = function (account) {
            var result = function (account) {
                var res = "";
                if (account == undefined || account == null) {
                    account = "";
                }
                if (account.length > 4) {
                    for (var i = 0; i < account.length;) {
                        res += account.substr(i, 4) + " ";
                        i += 4;
                    }
                    res.substr(0, res.length - 1);
                } else {
                    res = account;
                }
                return res;
            };
            return result(account);
        };
        return fn;
    }).filter("GetAuditReason", function () {
        var fn = function (reason, businessReason) {
            var result = function (reason, businessReason) {
                var res = "";
                if (reason == undefined || reason == null) {
                    if (businessReason == undefined || businessReason == null)
                        res = "";
                    else
                        res = businessReason;
                }
                else
                    res = reason;
                return res;
            };
            return result(reason, businessReason);
        };
        return fn;
    }).filter("IsShowRemittanceAccountBillStatus", function () {
        var fn = function (status) {
            var result = function (status) {
                if (status == '处理中' || status == '支付中' || status == "未支付")
                    return false;
                else
                    return true;
            };
            return result(status);
        };
        return fn;
    }).filter("GetInvoiceName", function () {
        var fn = function (status) {
            var result = function (status) {
                var res = "";
                if (status == '0')
                    res = '服务费';
                else if (status == '1')
                    res = '咨询费';
                return res;
            };
            return result(status);
        };
        return fn;
    }).filter("AccountBillStatus", function () {
        var fn = function (status, bstatus, pstatus) {
            var result = function (status, bstatus, pstatus) {
                if (bstatus == "0" && status == '0')
                    return "待业务确认";
                if (status == "3")
                    return "财务已确认";
                if ((bstatus == "1" && pstatus == "0") || status != "1")
                    return "待供应商确认";
                if ((pstatus == "2" && status == "0") || status == '2')
                    return "待财务确认";
            };
            return result(status, bstatus, pstatus);
        };
        return fn;
    }).filter("getPharmacyState", function () {
        //药店列表 上架下架
        var fn = function (status) {
            var result = function (status) {
                var res = "上架";
                if (status == '0')
                    res = '下架';
                else if (status == '1')
                    res = '上架';
                return res;
            };
            return result(status);
        };
        return fn;
    }).filter("GetDibitState", function () {
        var fn = function (status, reason) {
            var result = function (status, reason) {
                var res = "未扣款";
                if (status == "1")
                    res = "已扣款";
                if (reason == undefined || reason == null)
                    reason = "";
                else
                    reason = "(" + reason + ")";
                return res + reason;
            };
            return result(status, reason);
        };
        return fn;
    }).filter("phoneNum", function () {
        //手机号
        var fn = function (phone) {
            var computed = function (phone) {
                if (phone == null) {
                    return '';
                }
                var res = '';
                res = phone.substr(0, 3);
                res += '****';
                res += phone.substr(7, 4);
                return res;
            };
            return computed(phone);
        };
        return fn;
    }).filter("certificate", function () {
        //證件號碼
        var fn = function (idnum) {
            var computed = function (idnum) {
                if (idnum == null) return '';
                if (idnum.length > 7) {
                    var ss = idnum.substring(3, idnum.length - 4);
                    return idnum.substring(0, 3) + ss.replace(/\w/g, '*') + idnum.substring(3 + ss.length, idnum.length);
                }
                else if (idnum.length <= 7) {
                    var ss = idnum.substring(3, idnum.length);
                    return idnum.substring(0, 3) + ss.replace(/\w/g, '*');
                }
            };
            return computed(idnum);
        };
        return fn;
    }).filter("ispartner", function () {
        //是否与海虹合作
        var fn = function (status) {
            var result = function (status) {
                var res = "";
                if (status == '1')
                    res = '是';
                else if (status == '2')
                    res = '否';
                else
                    res = '';
                return res;
            };
            return result(status);
        };
        return fn;
    }).filter("jointmethod", function () {
        //投资方式
        var fn = function (status) {
            var result = function (status) {
                var res = "";
                if (status == '0')
                    res = '国营';
                else if (status == '1')
                    res = '民营';
                else if (status == '2')
                    res = '合资';
                else if (status == '3')
                    res = '外资';
                else if (status == '4')
                    res = '未知';
                else
                    res = '';
                return res;
            };
            return result(status);
        };
        return fn;
    }).filter("isAppointment", function () {
        //是否
        var fn = function (status) {
            var result = function (status) {
                var res = "";
                if (status == '1')
                    res = '是';
                else if (status == '2')
                    res = '否';
                else
                    res = '';
                return res;
            };
            return result(status);
        };
        return fn;
    }).filter('trustHtml', ['$sce', function ($sce) {
        //转化HTML格式
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    }]).filter('ageFilter', function () {
        //元数据过滤器
        return function (input) {
            if (input == "" || input == null || input == undefined || input == "0") {
                return "";
            } else {
                return input;
            }
        }
    }).filter('memberAgeFilter', function () {
        //元数据过滤器
        return function (input,status,idnumber) {
            if (status == '2' && idnumber && idnumber.length == 18) {
                var nowYear = (new Date()).getFullYear();
                var birthYear = idnumber.substring(6, 10);
                var age = nowYear - birthYear;
                if (age >= 0 && age <= 120) {
                    return age;
                } else {
                    return "";
                }
            } else if (input == "" || input == null || input == undefined || input == "0") {
                return "";
            } else {
                return input;
            }
        }
    }).filter('realNameDetailFilter', function () {
        return function (input, note, reason) {
            if (input == null || input == "" || input == undefined) {
                return "";
            } else if (input == "2") {
                if (note == "" || note == null || note == undefined) {
                    return "";
                } else {
                    return note;
                }

            } else {
                if (reason == "" || reason == null || reason == undefined) {
                    return "";
                } else {
                    return reason;
                }
            }
        }
    }).filter('medicalInsuranceDetailFilter', function () {
        return function (input, note, reason) {
            if (input == null || input == "" || input == undefined) {
                return "";
            } else if (input == "2") {
                if (note == "" || note == null || note == undefined) {
                    return "";
                } else {
                    return note;
                }

            } else {
                if (reason == "" || reason == null || reason == undefined) {
                    return "";
                } else {
                    return reason;
                }
            }
        }
    }).filter('authenstatusDoctor', function () {
        //身份认证
        return function (input, iscancelled) {
            if (iscancelled != null && iscancelled != undefined && iscancelled == true) {
                return "已撤销";
            }
            if (input == "0") {
                return "未认证";
            } else if (input == "2") {
                return "已认证";
            } else if (input == "3") {
                return "认证失败";
            } else if (input == "1") {
                return "认证中";
            } else {
                return "未认证";
            }
        }
    }).filter("contentTitle", function () {
        //取值content
        var fn = function (con) {
          var conData = eval("("+con+")");
          return conData.content;
        };
        return fn;
    })
});







