/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.store.basicinfor.druginfor.DrugClassification', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_basicinfor_drugclassification',
    model: 'NhlApp.model.basicinfor.druginfor.DrugClassification',
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.basicinfor.druginfor.DrugClassification'
    ],
    proxy: {
        type: 'ajax',
        url: 'getdrugclassificationlist',
        method: 'GET',
        extraParams: {

        },
        reader: {
            type: 'json',
            rootProperty: 'data.datas',//返回数据字段
            totalProperty : 'data.totalCount'
        }
    },
    //排序
    sorters: [{
        property: 'default',
        direction: 'default'
    }],
    listeners:{
        load:function (records, operation, success) {
            var me = this,
                grid = Ext.getCmp('drugclassification');
            grid.getSelectionModel().select(records.getData().items[0]);
        }
    }
});