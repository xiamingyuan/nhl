/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.doctorgroup.DoctorGroupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.system_doctorgroup',
    requires: [
        'NhlApp.view.system.doctorgroup.DoctorGroupController',
        'NhlApp.store.system.doctorgroup.DoctorGroup'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_system_doctorgroup'
        }
    },
    data: {
        focusApplication: null
    }
});