Ext.define('NhlApp.model.system.specialtydepartment.SpecialtyDepartment', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'level_', type: 'string'}
    ]
});