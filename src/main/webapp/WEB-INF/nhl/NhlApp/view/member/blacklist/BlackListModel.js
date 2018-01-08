/**
 * Created by apple on 2017/3/29.
 */
Ext.define('NhlApp.view.member.blacklist.BlackListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.member_blacklist',
    requires: [
        'NhlApp.view.member.blacklist.BlackListController',
        'NhlApp.store.member.blacklist.BlackList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_member_blacklist'
        }
    },
    data: {
        focusApplication: null,
        searchModel:null
    }
});