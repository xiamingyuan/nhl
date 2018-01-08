/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.model.member.blacklist.BlackList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginName',type: 'string'},
        {name: 'realName', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'ageOrder', type: 'string'},
        {name: 'mobilePhone', type: 'string'},
        {name: 'reason',type: 'string'},
        {name: 'iDNumStatus',type: 'string'},
        {name: 'registerTime',type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});