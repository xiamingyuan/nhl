/**
 * Created by zd on 17/3/29.
 */
Ext.define("NhlApp.view.system.disease.DiseaseList",{
    extend: "Nhl.base.Grid",
    alias: 'widget.diseaselist',
    requires: [
        'NhlApp.view.system.disease.DiseaseListController',
        'NhlApp.view.system.disease.DiseaseListModel'
    ],
    controller: 'disease_diseaselist',
    viewModel:{
        type:'disease_diseaselist'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 疾病查询',
    multiColumnSort:false, //单个排序功能
    isPage:true,//是否需要分页,
    border:true,
    bind: {
        store: '{gridstore}'
    },
    tbar: {
        xtype: 'toolbar',
        padding: 5,
        height:38,
        width: '100%',
        defaults: {
            labelAlign: 'right',
            margin: '0 10 0 0'
        },
        items: [{
            id:"diseaseCode",
            labelWidth: 40,
            width: 140,
            xtype: 'textfield',
            fieldLabel: '编码',
            bind: '{searchModel.diseaseCode}',
            enableKeyEvents:true
        },{
            id:"diseaseIcdName",
            labelWidth: 30,
            width: 180,
            xtype: 'textfield',
            fieldLabel: '名称',
            bind: '{searchModel.diseaseIcdName}',
            enableKeyEvents:true
        },{
            text: '查询',
            id:"onlineSearch",
            name: 'onlineSearch',
            listeners:{
                click: 'filter'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
        { text: '编码',width: 150, dataIndex: 'code', align: 'center'},
        { text: '名称',flex:1,minWidth: 100, dataIndex: 'similarname', align: 'left'},
        { text: '标签',width: 150, dataIndex: 'tags', align: 'center'},
        { text: '全拼',width: 180, dataIndex: 'fullspell', align: 'center'},
        { text: '简拼',width: 120, dataIndex: 'abbspell', align: 'center'},
        { text: '科室',width: 180, dataIndex: 'depts', align: 'center'}
    ]
});
