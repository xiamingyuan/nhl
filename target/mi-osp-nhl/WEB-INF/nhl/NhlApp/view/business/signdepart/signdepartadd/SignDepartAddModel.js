/**
 * Created by apple on 2017/4/12.
 */
Ext.define('NhlApp.view.business.signdepart.signdepartadd.SignDepartAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.business_signdepartadd',
    requires: [
        'NhlApp.view.business.signdepart.signdepartadd.SignDepartAddController'
    ],
    stores: {
        gridstore: {
            // autoLoad: true,
            // type: 'nhlapp_business_signdepart'
        }
    },
    data: {
        logo:'image/nopic.gif',
        addsigndepart:null
    }
});