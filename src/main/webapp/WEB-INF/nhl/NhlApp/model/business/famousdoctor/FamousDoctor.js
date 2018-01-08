/**
 * Created by apple on 2017/5/4.
 */
Ext.define('NhlApp.model.business.famousdoctor.FamousDoctor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'disease_name',type: 'string'},
        {name: 'doctor_name',type: 'string'},
        {name: 'doctor_hospital',type: 'string'},
        {name: 'doctor_title',type: 'string'}
    ],
    validators: {
    }
});