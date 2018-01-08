Ext.define('NhlApp.model.system.city.City', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'shortname', type: 'string'},
        {name: 'parent_id', type: 'string'},
        {name: 'id', type: 'string'},
        {name: 'spell', type: 'string'},
        {name: 'jianpin', type: 'string'},
        {name: 'level_', type: 'string'}
    ]
});