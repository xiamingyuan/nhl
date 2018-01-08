/**
 * Created by localadmin on 17/3/29.
 */
Ext.define('NhlApp.view.user.doctoraudit.DoctorAuditListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user_doctoraudit',
    requires: [
        'NhlApp.view.user.doctoraudit.DoctorAuditListController',
        'NhlApp.store.user.doctoraudit.DoctorAuditList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_user_doctoraudit'
        }
    },
    data: {
        searchModel:null,
        taskNum:0,
        unCertCount:0
    },
    formulas: {
        taskNumF: function (get) {
            var fn = get('taskNum')==0;
            return fn;
        },
        unCertCountF: function (get) {
            var fn = get('unCertCount')==0;
            return fn;
        },
        CertCount:function (get) {
            var v = get('unCertCount');
            if(v>5){
                return 5;
            }else{
                return v;
            }
        }
    }
});