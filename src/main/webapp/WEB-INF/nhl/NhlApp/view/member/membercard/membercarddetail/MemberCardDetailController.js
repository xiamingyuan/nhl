/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.view.member.membercard.membercarddetail.MemberCardDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.member_membercarddetail',
    back: function () {
        Ext.History.back();
    }
});