/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.model.user.feedback.FeedBackList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'content',type: 'string'},
        {name: 'loginName', type: 'string'},
        {name: 'realName', type: 'string'},
        {name: 'createTime', type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});