/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.view.user.feedback.FeedBackListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.feedback_feedbacklist',
    requires: [
        'NhlApp.view.user.feedback.FeedBackListController',
        'NhlApp.store.user.feedback.FeedBackList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_feedback_feedbacklist'
        }
    },
    data: {
        searchModel: null
    }
});