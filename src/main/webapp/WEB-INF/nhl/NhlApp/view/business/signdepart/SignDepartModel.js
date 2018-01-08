/**
 * Created by apple on 2017/4/12.
 */
Ext.define('NhlApp.view.business.signdepart.SignDepartModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.business_signdepart',
    requires: [
        'NhlApp.view.business.signdepart.SignDepartController',
        'NhlApp.store.business.signdepart.SignDepart'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_business_signdepart'
        }
    },
    data: {
        focusApplication: null,
        searchModel:{
            hospital:'',
            department:'',
            master:''
        }
    }
});