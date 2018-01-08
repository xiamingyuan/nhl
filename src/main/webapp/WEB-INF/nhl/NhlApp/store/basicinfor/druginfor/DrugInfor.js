/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.store.basicinfor.druginfor.DrugInfor', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_basicinfor_druginfor',
    model: 'NhlApp.model.basicinfor.druginfor.DrugInfor',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.basicinfor.druginfor.DrugInfor'
    ],
    proxy: {
        type: 'ajax',
        url: 'getdruginfolist',
        method: 'GET',
        extraParams: {
            genericName: "",
            categaryid: ""
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
    }]
});