/**
 * Created by apple on 2017/4/14.
 */
Ext.define('NhlApp.view.business.signdepart.signdepartedit.SignDepartEditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.business_signdepartedit',
    requires: [
        'NhlApp.view.business.signdepart.signdepartedit.SignDepartEditController'
    ],
    stores: {
        gridstore: {
            // autoLoad: true,
            // type: 'nhlapp_business_signdepart'
        }
    },
    data: {
        logo:'image/nopic.gif',
        editsigndepart:null
    },
    formulas: {
        logoF:function (get) {
            var v = get('editsigndepart.url');
            if(v==null||v==""){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + v + "&userid=";
            }
        }
    }
});