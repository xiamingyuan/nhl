/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.user.doctoraudit.doctorauditcheck.DoctorAuditCheckModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user_doctorauditcheck',
    requires: [
        'NhlApp.view.user.doctoraudit.doctorauditcheck.DoctorAuditCheckController',
        'NhlApp.store.user.doctoraudit.DoctorAuditCheck'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_user_doctorauditcheck'
        }
    },
    data: {
        msgNotice:true
    },
    formulas: {
        doctor_GenderF: function (get) {
            var v = get('doctor_Gender');
            if(v=="1"){
                return "男"
            }else{
                return "女"
            }
        },
        workImgF:function (get) {
            if(!get('work_img')){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + get('work_img') + "&userid=";
            }
        },
        doctor_AgeF:function (get) {
            var v = get('birthday'),
                year=new Date().getFullYear();
            if(v){
                var b = Number(new Date(v).toLocaleString().substring(0,4));
                return year-b;
            }else{
                return "";
            }
        },
        createTimeF:function (get) {
            var v = new Date(get('createTime'));
            return Ext.Date.format(v, 'Y-m-d');
        },
        doctor_Parent_Depart_NameF:function (get) {
            var v = get('doctor_Parent_Depart_Name'),
                c = get('doctor_Depart_Name');
            if (v == "" || v == null || v == undefined) {
                if (c == "" || c == null || c == undefined) {
                    return "";
                }
                else {
                    return c;
                }
            } else {
                if (c == "" || c == null || c == undefined) {
                    return v;
                }
                else {
                    return v + ' ' + c;
                }
            }
        },
        idcard_imgF:function (get) {
            if(!get('idcard_img')){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + get('idcard_img') + "&userid=";
            }
        },
        practiceCertF:function (get) {
            if(!get('practiceCert')){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + get('practiceCert') + "&userid=";
            }
        },
        practice_change_imgF:function (get) {
            if(!get('practice_change_img')){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + get('practice_change_img') + "&userid=";
            }
        },
        qualificationCertF:function (get) {
            if(!get('qualificationCert')){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + get('qualificationCert') + "&userid=";
            }
        },
    }
});