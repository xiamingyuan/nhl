/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.basicinfor.sessionmanager.sessionmanageradd.SessionManagerAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.basicinfor_sessionmanageradd',
    requires: [
        'NhlApp.view.basicinfor.sessionmanager.sessionmanageradd.SessionManagerAddController'
    ],
    data: {
        formModel:null
    }
});