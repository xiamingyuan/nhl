/**
 * Created by localadmin on 17/3/30.
 */
Ext.define('NhlApp.view.member.memberlist.memberdetail.MemberDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.member_memberdetail',
    data: {
        formModel:null
    },
    formulas: {
        isBlackF:function (get) {
            if(get('isBlack')==true){
                return '是';
            }else{
                return '否';
            }
        },
        genderF:function (get) {
            if(get('gender')=='1'){
                return '男';
            }else if(get('gender')=='2'){
                return '女';
            }else{
                return '';
            }
        },
        authenstatusF:function (get) {
            if (get('authenStatus') == "1") {
                return "未认证";
            } else if (get('authenStatus') == "2") {
                return "已认证";
            } else if (get('authenStatus') == "3") {
                return "认证失败";
            } else if (get('authenStatus') == "4") {
                return "认证中";
            } else {
                return "未认证";
            }
        },
        insuranceStatusF:function (get) {
            if (get('insuranceStatus') == "1") {
                return "已认证";
            } else {
                return "未认证";
            }
        },
        birthdayF: function (get) {
            var v = get('birthday');
            if(v){
                var v = new Date(get('birthday'));
                return Ext.Date.format(v, 'Y-m-d');
            }else{
                return "";
            }
        },
        registerTimeF: function (get) {
            var v = new Date(get('registerTime'));
            return Ext.Date.format(v, 'Y-m-d');
        },
        idNumberF: function (get) {
            var v = get('idNumber');
            if (v == null) return '';
            if (v.length > 7) {
                var ss = v.substring(3, v.length - 4);
                return v.substring(0, 3) + ss.replace(/\w/g, '*') + v.substring(3 + ss.length, v.length);
            }
            else if (v.length <= 7) {
                var ss = v.substring(3, v.length);
                return v.substring(0, 3) + ss.replace(/\w/g, '*');
            }
        },
        avatarF:function (get) {
            if(get('avatar')==null){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + get('avatar') + "&userid=";
            }
        }

    }
});