/**
 * Created by apple on 2017/3/27.
 */
Ext.define('NhlApp.model.user.userlist.UserList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginName',type: 'string'},
        {name: 'realName', type: 'string'},
        {name: 'nickName', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'birthday', type: 'date',dateFormat : 'time'},
        {name: 'authenStatus',type: 'string'},
        {name: 'registerTime',type: 'date',dateFormat : 'time'},
        {name: 'lastLoginTime',type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});