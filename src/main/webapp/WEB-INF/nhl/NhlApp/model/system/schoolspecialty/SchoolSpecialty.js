Ext.define('NhlApp.model.system.schoolspecialty.SchoolSpecialty', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',type: 'string'},
        {name: 'area', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    validators: {
    }
});