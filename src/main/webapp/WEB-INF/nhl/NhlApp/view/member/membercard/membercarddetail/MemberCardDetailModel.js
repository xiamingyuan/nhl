/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.view.member.membercard.membercarddetail.MemberCardDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.member_membercarddetail',
    requires: [
        'NhlApp.view.member.membercard.membercarddetail.MemberCardDetailController',
        'NhlApp.store.member.membercard.MemberCardDetail'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_member_membercarddetail'
        }
    },
    data: {
        focusApplication: null
    }
});