/**
 * Created by apple on 2017/4/10.
 */
Ext.define('NhlApp.model.user.doctoraudit.DoctorAuditCheck', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginname',type: 'string'},
        {name: 'doctor_RealName', type: 'string'},
        {name: 'createTime',type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});