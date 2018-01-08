/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.schoolspecialty.SchoolSpecialtyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.system_schoolspecialty',
    requires: [
        'NhlApp.view.system.schoolspecialty.SchoolSpecialtyController',
        'NhlApp.store.system.schoolspecialty.SchoolSpecialty',
        'NhlApp.store.system.schoolspecialty.SchoolSpecialtyMajor'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_system_schoolspecialty'
        },
        majorstore: {
            // autoLoad: true,
            type: 'nhlapp_system_schoolspecialtymajor'
        }
    },
    data: {
        focusApplication: null,
        focusSchool:null,
        hosName: null,
        searchSchool:{
            id:""
        },
        searchModel:{
            schoolid:'',
            schoolName:"",
            province:"",
            city:"",
            district:""
        }
    }
    
});