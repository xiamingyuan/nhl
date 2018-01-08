/**
 * Created by apple on 2017/3/30.
 */
Ext.define('NhlApp.view.user.message.messageedit.MessageEditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user_messageedit',
    requires: [
        'NhlApp.view.user.message.messageedit.MessageEditController',
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