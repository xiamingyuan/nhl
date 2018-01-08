/**
 * Created by apple on 2017/3/30.
 */
Ext.define('NhlApp.view.user.message.messageedit.MessageEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_messageedit',
    init:function () {
        console.log('user_messageedit')
    },
    back: function () {
        Ext.History.back();
    }
});