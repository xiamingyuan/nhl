/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.view.member.certification.CertificationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.member_certification',
    requires: [
        'NhlApp.view.member.certification.CertificationController',
        'NhlApp.store.member.certification.Certification'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_member_certification'
        }
    },
    data: {
        focusApplication: null
    }
});