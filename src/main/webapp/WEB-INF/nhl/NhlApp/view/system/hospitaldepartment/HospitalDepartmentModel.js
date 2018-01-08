/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.hospitaldepartment.HospitalDepartmentModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.system_hospitaldepartment',
    requires: [
        'NhlApp.view.system.hospitaldepartment.HospitalDepartmentController',
        'NhlApp.store.system.hospitaldepartment.HospitalDepartment',
        'NhlApp.store.system.hospitaldepartment.DepartmentList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_system_hospitaldepartment'
        },
        departmentstore: {
            // autoLoad: true,
            type: 'nhlapp_system_departmentList'
        }
    },
    data: {
        focusApplication: null,
        hosName: null,
        searchDep:{
            id:""
        },
        searchModel:{
            code:"",
            hospitalName:"",
            level:"",
            province:"",
            city:"",
            district:""
        }
    },
    formulas: {
        
    }
});