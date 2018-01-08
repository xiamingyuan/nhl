/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.model.system.doctorgroup.DoctorGroup', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',type: 'string'},
        {name: 'area', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'level', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'code',type: 'string'},
        {name: 'phone',type: 'string'}
    ],
    validators: {
    }
});