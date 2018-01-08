/**
 * Created by zd on 17/3/28.
 */
Ext.define('NhlApp.view.user.online.OnlineListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.online_onlinelist',
    requires: [
        'NhlApp.view.user.online.OnlineListController',
        'NhlApp.store.user.online.OnlineList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_online_onlinelist'
        }
    },
    data: {
        searchModel: null
    }
});