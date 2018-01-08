/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.model.member.membercard.MemberCardDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginName',type: 'string'},
        {name: 'realName', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'idnumber', type: 'string'},
        {name: 'mobilePhone', type: 'string'},
        {name: 'birthday',type: 'date',dateFormat : 'time'},
        {name: 'registerTime',type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});