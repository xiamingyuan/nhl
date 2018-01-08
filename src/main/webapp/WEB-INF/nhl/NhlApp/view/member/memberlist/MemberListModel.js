/**
 * Created by zd on 17/3/30.
 */
Ext.define('NhlApp.view.member.memberlist.MemberListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.member_memberlist',
    requires: [
        'NhlApp.view.member.memberlist.MemberListController',
        'NhlApp.store.member.memberlist.MemberList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_member_memberlist'
        }
    },
    data: {
        searchModel:null
    },
    formulas: {
        
    }
});