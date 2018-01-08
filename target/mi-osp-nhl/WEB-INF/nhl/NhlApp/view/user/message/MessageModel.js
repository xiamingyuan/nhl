/**
 * Created by apple on 2017/3/29.
 */
Ext.define('NhlApp.view.user.message.MessageModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user_message',
    requires: [
        'NhlApp.view.user.message.MessageController',
        'NhlApp.store.user.message.Message'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_user_message'
        }
    },
    data: {
        searchModel: null
    }
});