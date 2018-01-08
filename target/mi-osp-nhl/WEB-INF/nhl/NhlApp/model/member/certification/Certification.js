/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.model.member.certification.Certification', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginName',type: 'string'},
        {name: 'realName', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'birthday',type: 'date',dateFormat : 'time'},
        {name: 'idnumber', type: 'string'},
        {name: 'createtime',type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});