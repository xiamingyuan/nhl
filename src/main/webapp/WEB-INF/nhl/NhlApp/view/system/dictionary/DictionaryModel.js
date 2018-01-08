/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.dictionary.DictionaryModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.system_dictionary',
    requires: [
        'NhlApp.view.system.dictionary.DictionaryController',
        'NhlApp.store.system.dictionary.Dictionary'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_system_dictionary'
        }
    },
    data: {
        focusApplication: null,
        searchModel:null
    }
});