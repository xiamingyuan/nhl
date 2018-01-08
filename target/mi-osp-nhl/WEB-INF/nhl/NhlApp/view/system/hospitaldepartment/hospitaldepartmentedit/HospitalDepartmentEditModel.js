/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.system.hospitaldepartment.hospitaldepartmentedit.HospitalDepartmentEditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.system_hospitaldepartmentedit',
    requires: [
        'NhlApp.view.system.hospitaldepartment.hospitaldepartmentedit.HospitalDepartmentEditController'
    ],
    data: {
        formModel:{
            // logo:''
        }
    },
    stores: {
        gridstore: {
            autoLoad: true
        }
    },
    formulas: {
        logoF:function (get) {
            if(get('formModel.logo')==null){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + get('formModel.logo') + "&userid=";
            }
        }
    }
});