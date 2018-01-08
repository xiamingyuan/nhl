Ext.define('NhlApp.view.system.specialtysystem.SpecialtySystemModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.system_specialtysystem',
    requires: [
        'NhlApp.view.system.specialtysystem.SpecialtySystemController',
        'NhlApp.store.system.specialtysystem.SpecialtySystem'
    ],
    data: {
        formModel:null,
    },
    stores: {
        gridstore: {
            type: 'nhlapp_system_specialtysystem'
        }
    }
});