/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.model.system.disease.DiseaseList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'code',type: 'string'},
        {name: 'similarname', type: 'string'},
        {name: 'icd10code', type: 'string'},
        {name: 'icdname', type: 'string'},
        {name: 'tags', type: 'string'},
        {name: 'fullspell', type: 'string'},
        {name: 'abbspell', type: 'string'},
        {name: 'depts', type: 'string'}
        // {name: 'createTime', type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});