/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.basicinfor.sessionmanager.sessionmanageredit.SessionManagerEditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.basicinfor_sessionmanageredit',
    requires: [
        'NhlApp.view.basicinfor.sessionmanager.sessionmanageredit.SessionManagerEditController'
    ],
    data: {
        formModel:null
    },
    stores: {
        gridstore: {
            autoLoad: true
        }
    },
    formulas: {
        createTimeF:function (get) {
            var v = new Date(get('formModel.createTime'));
            return Ext.Date.format(v, 'Y-m-d');
        }
    }
});