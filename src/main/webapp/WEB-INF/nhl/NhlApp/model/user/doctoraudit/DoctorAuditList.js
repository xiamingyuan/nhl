/**
 * Created by localadmin on 17/3/29.
 */
Ext.define('NhlApp.model.user.doctoraudit.DoctorAuditList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginname',type: 'string'},
        {name: 'doctor_RealName', type: 'string'},
        {name: 'doctor_Gender', type: 'string'},
        {name: 'doctor_Age',type: 'string'},
        {name: 'doctor_Hospital_Name', type: 'string'},
        {name: 'doctor_Depart_Name', type: 'string'},
        {name: 'authenstatus',type: 'string'},
        {name: 'auditor',type: 'string'},
        {name: 'createTime',type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});