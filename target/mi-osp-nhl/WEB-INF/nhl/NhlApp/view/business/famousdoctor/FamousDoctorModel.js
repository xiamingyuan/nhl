/**
 * Created by apple on 2017/5/4.
 */
Ext.define('NhlApp.view.business.famousdoctor.FamousDoctorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.business_famousdoctor',
    requires: [
        'NhlApp.view.business.famousdoctor.FamousDoctorController',
        'NhlApp.store.business.famousdoctor.FamousDoctor'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_business_famousdoctor'
        }
    },
    data: {
        searchModel:{
            disease:'',
            doctor:'',
            hospital:''
        }
    }
});