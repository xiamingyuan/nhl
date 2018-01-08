/**
 * Created by apple on 2017/3/29.
 */
Ext.define('NhlApp.model.user.message.Message', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'title',type: 'string'},
        {name: 'isAllUser', type: 'string'},
        {name: 'creatorName', type: 'string'},
        {name: 'publishTime',type: 'date',dateFormat : 'time'},
        {name: 'createTime',type: 'date',dateFormat : 'time'},
        {name: 'status', type: 'string'},
        {name: 'pubNum', type: 'string'},
        {name: 'read',type: 'string'}
    ],
    validators: {
    }
});