Ext.define('NhlApp.model.system.specialtysystem.SpecialtySystem', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'level_', type: 'string'}
    ]
});