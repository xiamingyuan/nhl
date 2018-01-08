/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.diseasegroup.DiseaseGroupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.system_diseasegroup',
    requires: [
        'NhlApp.view.system.diseasegroup.DiseaseGroupController',
        'NhlApp.store.system.diseasegroup.DiseaseGroup',
        'NhlApp.store.system.diseasegroup.DiseaseGroupMajor'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_system_diseasegroup'
        },
        majorstore: {
            type: 'nhlapp_system_diseasegroupmajor'
        }
    },
    data: {
        focusApplication: null,
        focusSchool:null,
        searchDisease:{
            diseaseGroupId:""
        },
        searchModel:{
            name:'',
            description:''
        }
    }
    
});