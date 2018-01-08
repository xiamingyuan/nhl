/**
 * Created by apple on 2017/3/30.
 */
Ext.define('NhlApp.model.user.message.MessageDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'userName',type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'isSucSend', type: 'string'},
        {name: 'sendTime',type: 'date',dateFormat : 'time'},
        {name: 'read', type: 'string'},
        {name: 'readTime',type: 'date',dateFormat : 'time'},
        {name: 'registerTime',type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});