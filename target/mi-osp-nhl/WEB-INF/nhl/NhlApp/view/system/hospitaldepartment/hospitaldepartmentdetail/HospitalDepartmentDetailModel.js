/**
 * Created by localadmin on 17/4/10.
 */
Ext.define('NhlApp.view.system.hospitaldepartment.hospitaldepartmentdetail.HospitalDepartmentDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hospitaldepartment_hospitaldepartmentdetail',
    data: {
        formModel:null,
        departList:null
    },
    formulas: {
        level_F:function (get) {
            var v = get('level_');
            switch (v){
                case "4":
                    return "三甲";
                    break;
                case "3":
                    return "三级";
                    break;
                case "2":
                    return "二级";
                    break;
                case "1":
                    return "一级";
                    break;
                case "0":
                    return "其他";
                    break;
                case "-1":
                    return "一级以下";
                    break;
                case "-2":
                    return "社区";
                    break;
                default:
                    return "";
                    break;
            }
        },
        typeF:function (get) {
            var v = get('type');
            switch (v){
                case "1":
                    return "综合医院";
                    break;
                case "2":
                    return "中医医院";
                    break;
                case "3":
                    return "专科医院";
                    break;
                case "4":
                    return "护理院";
                    break;
                default:
                    return "";
                    break;
            }
        },
        ispartnerF:function (get) {
            var v = get('ispartner');
            switch (v){
                case "1":
                    return "是";
                    break;
                case "2":
                    return "否";
                    break;
                default:
                    return "";
                    break;
            }
        },
        jointmethodF:function (get) {
            var v = get('jointmethod');
            switch (v){
                case "0":
                    return "国营";
                    break;
                case "1":
                    return "民营";
                    break;
                case "2":
                    return "合资";
                    break;
                case "3":
                    return "外资";
                    break;
                case "4":
                    return "未知";
                    break;
                default:
                    return "";
                    break;
            }
        },
        is_appointmentF:function (get) {
            var v = get('is_appointment');
            switch (v){
                case "1":
                    return "是";
                    break;
                case "2":
                    return "否";
                    break;
                default:
                    return "";
                    break;
            }
        },
        is_registrationF:function (get) {
            var v = get('is_registration');
            switch (v){
                case "1":
                    return "是";
                    break;
                case "2":
                    return "否";
                    break;
                default:
                    return "";
                    break;
            }
        },
        is_claimF:function (get) {
            var v = get('is_claim');
            switch (v){
                case "1":
                    return "是";
                    break;
                case "2":
                    return "否";
                    break;
                default:
                    return "";
                    break;
            }
        },
        cprt_flagF:function (get) {
            var v = get('cprt_flag');
            switch (v){
                case "1":
                    return "是";
                    break;
                case "2":
                    return "否";
                    break;
                default:
                    return "";
                    break;
            }
        },
        is_permanentF:function (get) {
            var v = get('is_permanent');
            switch (v){
                case "1":
                    return "是";
                    break;
                case "2":
                    return "否";
                    break;
                default:
                    return "";
                    break;
            }
        },
        logoF:function (get) {
            if(get('logo')==null){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + get('logo') + "&userid=";
            }
        }
    }
});