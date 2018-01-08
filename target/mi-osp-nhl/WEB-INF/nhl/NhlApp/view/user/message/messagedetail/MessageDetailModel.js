/**
 * Created by apple on 2017/3/30.
 */
Ext.define('NhlApp.view.user.message.messagedetail.MessageDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user_messagedetail',
    requires: [
        'NhlApp.view.user.message.messagedetail.MessageDetailController',
        'NhlApp.store.user.message.MessageDetail'
    ],
    data: {
        formModel:null
    },
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_user_messagedetail'
        }
    },
    formulas: {

    }
});