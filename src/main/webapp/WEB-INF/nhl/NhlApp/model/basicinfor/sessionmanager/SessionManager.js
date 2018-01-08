/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.model.basicinfor.sessionmanager.SessionManager', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'caption',type: 'string'},
        {name: 'content',type: 'string'},
        {name: 'serviceCompany',type: 'string'},
        {name: 'tags',type: 'string'},
        {name: 'remark',type: 'string'},
        {name: 'character_',type: 'int'},
        {name: 'type_',type: 'int'}
    ],
    validators: {
    }
});