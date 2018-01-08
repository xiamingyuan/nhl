/**
 * Created by apple on 2017/4/3.
 */
Ext.define('NhlApp.store.system.specialtydepartment.SpecialtyDepartment', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.nhlapp_system_specialtydepartment',
    model: 'NhlApp.model.system.specialtydepartment.SpecialtyDepartment',
    requires: [
        'NhlApp.model.system.specialtydepartment.SpecialtyDepartment'
    ],
    proxy: {
        type: 'ajax',
        url: 'getchildlistdepartment',
        method: 'GET',
        // reader: {
        //     type: 'json',
        //     rootProperty: 'root',//返回数据字段
        // }
    },

    lazyFill: false
});