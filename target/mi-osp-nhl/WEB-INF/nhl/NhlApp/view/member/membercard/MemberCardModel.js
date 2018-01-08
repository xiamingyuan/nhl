/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.view.member.membercard.MemberCardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.member_membercard',
    requires: [
        'NhlApp.view.member.membercard.MemberCardController',
        'NhlApp.store.member.membercard.MemberCard'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_member_membercard'
        }
    },
    data: {
        focusApplication: null,
        searchModel:null
    }
});