Ext.define('NhlApp.model.system.diseasegroup.DiseaseGroup', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'id',type: 'string'},
        {name: 'name',type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'diseasesCount', type: 'string'}
    ],
    validators: {
    }
});