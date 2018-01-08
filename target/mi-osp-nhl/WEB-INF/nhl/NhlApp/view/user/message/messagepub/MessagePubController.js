/**
 * Created by apple on 2017/3/30.
 */
Ext.define('NhlApp.view.user.message.messagepub.MessagePubController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_messagepub',
    init:function () {
        console.log('user_messagepub')
    },
    back: function () {
        Ext.History.back();
    }
});