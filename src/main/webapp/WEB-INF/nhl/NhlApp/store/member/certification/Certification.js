/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.store.member.certification.Certification', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_member_certification',
    model: 'NhlApp.model.member.certification.Certification',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.member.certification.Certification'
    ],
    proxy: {
        type: 'ajax',
        url: 'getcertificationlist',
        method: 'GET',
        extraParams: {
            queryKey: "",
            startDate: "",
            endDate: "",
            isAudit:false
        },
        reader: {
            type: 'json',
            rootProperty: 'data.datas',//返回数据字段
            totalProperty : 'data.totalCount'
        }
    },
    sorters: [{// 排序
        property: 'default',
        direction: 'default'
    }]
});