/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.model.system.dictionary.Dictionary', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'classid',type: 'string'},
        {name: 'classname', type: 'string'},
        {name: 'classdesc', type: 'string'},
        {name: 'itemvalue', type: 'string'},
        {name: 'itemvaluedesc', type: 'string'},
        {name: 'itemname', type: 'string'}
    ],
    validators: {
    }
});