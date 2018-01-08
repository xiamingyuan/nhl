/**
 * Created by localadmin on 17/4/11.
 */
Ext.define('NhlApp.model.system.diseasegroup.DiseaseGroupMajor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'code',type: 'string'},
        {name: 'similarname',type: 'string'},
        {depts: 'description',type: 'string'}
    ],
    validators: {
    }
});