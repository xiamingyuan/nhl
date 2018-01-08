/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.specialtydepartment.SpecialtyDepartmentModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.system_specialtydepartment',
    requires: [
        'NhlApp.view.system.specialtydepartment.SpecialtyDepartmentController',
        'NhlApp.store.system.specialtydepartment.SpecialtyDepartment'
    ],
    data: {
        formModel:null
    },
    stores: {
        gridstore: {
            //autoLoad: true,
            type: 'nhlapp_system_specialtydepartment'
        }
    }
});