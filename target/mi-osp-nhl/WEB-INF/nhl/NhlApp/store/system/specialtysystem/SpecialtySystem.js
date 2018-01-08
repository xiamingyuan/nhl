/**
 * Created by apple on 2017/4/3.
 */
Ext.define('NhlApp.store.system.specialtysystem.SpecialtySystem', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.nhlapp_system_specialtysystem',
    model: 'NhlApp.model.system.specialtysystem.SpecialtySystem',
    requires: [
        'NhlApp.model.system.specialtysystem.SpecialtySystem'
    ],
    proxy: {
        type: 'ajax',
        url: 'getchildlistsystem',
        method: 'GET'
    },

    lazyFill: false
});