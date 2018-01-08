/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.view.member.micardbind.MicardBindModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.member_micardbind',
    requires: [
        'NhlApp.view.member.micardbind.MicardBindController',
        'NhlApp.store.member.micardbind.MicardBind'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_member_micardbind'
        }
    },
    data: {
        focusApplication: null
    }
});