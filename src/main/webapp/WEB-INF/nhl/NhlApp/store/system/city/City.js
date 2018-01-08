/**
Created by apple on 2017/4/3.
*/
Ext.define('NhlApp.store.system.city.City', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.nhlapp_system_city',
    model: 'NhlApp.model.system.city.City',
    requires: [
        'NhlApp.model.system.city.City'
    ],
    proxy: {
        type: 'ajax',
        url: 'getchildarealist',
        method: 'GET'
    },

    lazyFill: false
});