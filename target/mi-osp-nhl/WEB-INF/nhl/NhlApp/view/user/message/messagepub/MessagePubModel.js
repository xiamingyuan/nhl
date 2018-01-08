/**
 * Created by apple on 2017/3/30.
 */
Ext.define('NhlApp.view.user.message.messagepub.MessagePubModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user_messagepub',
    requires: [
        'NhlApp.view.user.message.messagepub.MessagePubController',
        // 'NhlApp.store.user.message.MessageDetail'
    ],
    data: {
        formModel:null
    },
    stores: {
        // gridstore: {
        //     autoLoad: true,
        //     type: 'nhlapp_user_messagedetail'
        // }
    },
    formulas: {

    }
});