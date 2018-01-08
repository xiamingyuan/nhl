/**
 * Created by localadmin on 17/4/11.
 */
Ext.define('NhlApp.model.system.schoolspecialty.SchoolSpecialtyMajor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',type: 'string'},
        {name: 'name',type: 'string'},
        {name: 'description',type: 'string'},
        {name: 'medicalDepartName',type: 'string'},
        {name: 'code',type: 'string'}
    ],
    validators: {
    }
});