/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.basicinfor.sessionmanager.SessionManagerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.basicinfor_sessionmanager',
    requires: [
        'NhlApp.view.basicinfor.sessionmanager.SessionManagerController',
        'NhlApp.store.basicinfor.sessionmanager.SessionManager'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_basicinfor_sessionmanager'
        }
    },
    data: {
        focusApplication: null,
        searchModel:null
    }
});