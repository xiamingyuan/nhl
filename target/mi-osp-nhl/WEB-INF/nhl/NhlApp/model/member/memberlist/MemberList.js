/**
 * Created by zd on 17/3/30.
 */
Ext.define('NhlApp.model.member.memberlist.MemberList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginName',type: 'string'},
        {name: 'realName', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'age', type: 'string'},
        {name: 'mobileArea', type: 'string'},
        {name: 'authenStatus', type: 'string'},
        {name: 'insuranceStatus', type: 'string'},
        {name: 'recommendName', type: 'string'},
        {name: 'recommendPhone', type: 'string'},
        {name: 'registerTime',type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});