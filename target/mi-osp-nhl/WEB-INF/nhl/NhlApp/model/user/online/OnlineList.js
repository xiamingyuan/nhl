/**
 * Created by zd on 17/3/28.
 */
Ext.define('NhlApp.model.user.online.OnlineList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginName',type: 'string'},
        {name: 'ipAddress', type: 'string'},
        {name: 'deviceName', type: 'string'},
        {name: 'deviceId', type: 'string'},
        {name: 'os', type: 'string'},
        {name: 'appVersion', type: 'string'},
        {name: 'loginTime', type: 'date',dateFormat : 'time'},
        {name: 'onlineTime',type: 'string'}
    ],
    validators: {
    }
});