/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.model.basicinfor.druginfor.DrugInfor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',type: 'string'},
        {name: 'name',type: 'string'},
        {name: 'dosageforms',type: 'string'},
        {name: 'similarName',type: 'string'},
        {name: 'drugGroupName',type: 'string'},
        {name: 'tags',type: 'string'},
        {name: 'abbSpell',type: 'string'}
    ],
    validators: {
    }
});