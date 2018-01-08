/**
 * Created by apple on 2017/3/29.
 */
Ext.define('NhlApp.model.user.blacklist.BlackList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginName',type: 'string'},
        {name: 'realName', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'birthday',type: 'date',dateFormat : 'time'},
        {name: 'authenStatus',type: 'string'},
        {name: 'registertime',type: 'date',dateFormat : 'time'},
        {name: 'reason',type: 'string'},
        {name: 'operator_name', type: 'string'},
        {name: 'createTime',type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});