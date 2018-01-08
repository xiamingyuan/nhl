/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.system.hospitaldepartment.hospitaldepartmentadd.HospitalDepartmentAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.system_hospitaldepartmentadd',
    requires: [
        'NhlApp.view.system.hospitaldepartment.hospitaldepartmentadd.HospitalDepartmentAddController'
    ],
    data: {
        formModel:null,
        logo:'image/nopic.gif'
    }
});