/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.view.system.disease.DiseaseListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.disease_diseaselist',
    requires: [
        'NhlApp.view.system.disease.DiseaseListController',
        'NhlApp.store.system.disease.DiseaseList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_disease_diseaselist'
        }
    },
    data: {
        searchModel: null
    }
});