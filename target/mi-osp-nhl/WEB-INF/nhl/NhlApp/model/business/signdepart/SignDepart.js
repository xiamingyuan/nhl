/**
 * Created by apple on 2017/4/12.
 */
Ext.define('NhlApp.model.business.signdepart.SignDepart', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'url',type: 'string'},
        {name: 'name',type: 'string'},
        {name: 'base_hospital_name',type: 'string'},
        {name: 'base_hospital_depart_name',type: 'string'},
        {name: 'masters'},
        {name: 'membersCount',type: 'int'},
        {name: 'description',type: 'string'}
    ],
    validators: {
    }
});