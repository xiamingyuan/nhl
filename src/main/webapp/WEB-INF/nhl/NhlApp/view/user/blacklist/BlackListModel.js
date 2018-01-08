/**
 * Created by apple on 2017/3/29.
 */
Ext.define('NhlApp.view.user.blacklist.BlackListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user_blacklist',
    requires: [
        'NhlApp.view.user.blacklist.BlackListController',
        'NhlApp.store.user.blacklist.BlackList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_user_blacklist'
        }
    },
    data: {
        focusApplication: null
    }
});