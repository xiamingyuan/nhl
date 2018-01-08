/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.basicinfor.druginfor.DrugInforModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.basicinfor_druginfor',
    requires: [
        'NhlApp.view.basicinfor.druginfor.DrugInforController',
        'NhlApp.store.basicinfor.druginfor.DrugClassification',
        'NhlApp.store.basicinfor.druginfor.DrugInfor'//drugclassification
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_basicinfor_drugclassification'
        },
        druggridstore: {
            // autoLoad: true,
            type: 'nhlapp_basicinfor_druginfor'
        }
    },
    data: {
        focusApplication: null,
        searchModel:{
            genericName:'',
            categaryid:''
        }
    }
});