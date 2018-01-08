/**
 * Created by apple on 2017/5/4.
 */
Ext.define('NhlApp.store.business.famousdoctor.FamousDoctor', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_business_famousdoctor',
    model: 'NhlApp.model.business.famousdoctor.FamousDoctor',
    requires: [
        'NhlApp.model.business.famousdoctor.FamousDoctor'
    ],
    proxy: {
        type: 'ajax',
        url: 'queryfamousdoctor',
        method: 'GET',
        extraParams: {
            disease:'',
            doctor:'',
            hospital:''
        },
        reader: {
            type: 'json',
            rootProperty: 'data.datas',//返回数据字段
            totalProperty : 'data.totalCount'
        }
    }
});