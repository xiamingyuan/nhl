/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.view.member.feedback.FeedBackListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.member_feedback',
    requires: [
        'NhlApp.view.member.feedback.FeedBackListController',
        'NhlApp.store.member.feedback.FeedBackList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_member_feedback'
        }
    },
    data: {
        focusApplication: null,
        searchModel:null
    }
});