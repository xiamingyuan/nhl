/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.city.CityModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.system_city',
    requires: [
        'NhlApp.view.system.city.CityController',
        'NhlApp.store.system.city.City'
    ],
    data: {
        formModel:null,
    },
    stores: {
        gridstore: {
            type: 'nhlapp_system_city'
        }
    },
    formulas: {

    }
});