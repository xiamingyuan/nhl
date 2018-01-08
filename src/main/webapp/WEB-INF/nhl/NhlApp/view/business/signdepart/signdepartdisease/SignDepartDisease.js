/**
 * Created by apple on 2017/4/12.
 */
Ext.define('diseasesLeftModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'cisname', type: 'string'},
        {name: 'code',  type: 'string'},
        {name: 'depts', type: 'string'}
    ]
});
Ext.define('diseasesRightModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'cisname', type: 'string'},
        {name: 'code',  type: 'string'},
        {name: 'depts', type: 'string'}
    ]
});
Ext.define('diseasesGroupModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'description',  type: 'string'}
    ]
});
Ext.define("NhlApp.view.business.signdepart.signdepartdisease.SignDepartDisease", {
    extend: "Ext.panel.Panel",
    alias: 'widget.business_signdepartdisease',
    requires: [
        'NhlApp.view.business.signdepart.signdepartdisease.SignDepartDiseaseController',
        'NhlApp.view.business.signdepart.signdepartdisease.SignDepartDiseaseModel'
    ],
    controller: 'business_signdepartdisease',
    viewModel: {
        type: 'business_signdepartdisease'
    },
    width : '100%',
    layout: 'fit',
    iconCls:"fa fa-home",
    title: '当前位置：签约科室疾病',
    bodyPadding: 10,
    items:{
        xtype:'panel',
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [
            {
                title: '基本信息',
                iconCls:'fa fa-table',
                xtype: 'form',
                cls:'detailsForm',
                margin: '0 0 10 0',
                layout: {
                    type: 'table',
                    columns: 8,
                    tableAttrs: {　　//在这儿控制table标签中的Attrs属性
                        border: 0,
                        cellspacing: 1,
                        width: '100%',
                        align: 'center',
                        style: "border-collapse:collapse;margin:0 auto;"
                    }
                },
                defaults: {
                    xtype: 'label'
                },
                items: [{
                    text: '科室：'
                }, {
                    bind: '{departdetail.name}',
                    colspan:2
                }, {
                    text: '医院：'
                }, {
                    bind: '{departdetail.base_hospital_name}',
                    colspan: 2
                }, {
                    text: 'logo：',
                    rowspan: 2
                }, {
                    xtype:'image',
                    width: 40,
                    height: 40,
                    bind:{
                        src: '{logoF}'
                    },
                    rowspan: 2
                },{
                    text: '管理员：'
                }, {
                    bind: '{mastersF}',
                    colspan: 2
                }, {
                    text: '成立时间：'
                }, {
                    bind: '{create_timeF}',
                    colspan: 2
                },{
                    text: '简介：'
                }, {
                    bind: '{departdetail.description}',
                    style: {
                        'max-height':'100px',
                        overflow: 'scroll',
                        display:'block'
                    },
                    colspan: 7
                }]
            },
            {
                xtype: 'panel',
                flex:1,
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [
                    {
                        id:'dpt_diseases',
                        xtype:'grid',
                        flex: 1,
                        margin:'0 10 0 0',
                        columnLines: true,
                        style:{
                            border:'1px solid #f6f6f6'
                        },
                        emptyText:'暂无数据',
                        columns: [
                            { text: '序号', xtype: 'rownumberer', align: 'center', width: 60 },//创建序号
                            { text: '疾病名称', sortable: false, dataIndex: 'cisname', align: 'center',flex:1 },
                            { text: '编码', sortable: false, dataIndex: 'code', align: 'center', flex:1 },
                            { text: '部门', sortable: false, dataIndex: 'depts', align: 'center', flex:1 }
                        ],
                        store: Ext.create('Ext.data.Store', {
                            model: 'diseasesLeftModel',
                            proxy: {
                                type: 'ajax',
                                method:'GET',
                                extraParams: {
                                    departId: ''
                                },
                                url: 'getdepartdiseases',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data.datas'
                                }
                            }
                        })
                    },
                    {
                        xtype:'tabpanel',
                        flex: 1,
                        items:[
                            {
                                title: '添加疾病',
                                xtype:'panel',
                                layout: 'fit',
                                tbar: {
                                    xtype: 'toolbar',
                                    padding: 5,
                                    height:38,
                                    width: '100%',
                                    defaults: {
                                        labelAlign: 'right',
                                        margin: '0 10 0 0',
                                        labelWidth: 30,
                                        width: 130,
                                        xtype: 'textfield'
                                    },
                                    items: [{
                                        id:"diseaseCode",
                                        fieldLabel: '编码'
                                    },{
                                        id:"diseaseIcdName",
                                        fieldLabel: '名称'
                                    },{
                                        xtype: 'button',
                                        width: 42,
                                        text: '查询',
                                        listeners:{
                                            click: function () {
                                                var diseaselistStore = Ext.getCmp('diseases').getStore(),
                                                    diseaseCode = Ext.getCmp("diseaseCode").getValue(),
                                                    diseaseIcdName = Ext.getCmp("diseaseIcdName").getValue();
                                                diseaselistStore.getProxy().extraParams = {
                                                    diseaseCode: diseaseCode,
                                                    diseaseIcdName: diseaseIcdName
                                                };
                                                diseaselistStore.loadPage(1);
                                            }
                                        }
                                    }]
                                },
                                items:[
                                    {
                                        id:'diseases',
                                        xtype:'cisgrid',
                                        isPage:true,
                                        multiColumnSort:false,//单个排序
                                        columnLines: true,
                                        style:{
                                            border:'1px solid #f6f6f6'
                                        },
                                        emptyText:'暂无数据',
                                        columns: [
                                            { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },//创建序号
                                            { text: '疾病名称', dataIndex: 'cisname', align: 'center',flex:1 },
                                            { text: '编码', dataIndex: 'code', align: 'center', flex:1 },
                                            { text: '部门', dataIndex: 'depts', align: 'center', flex:1 },
                                            { text: '操作', sortable: false, width:50,align: 'center',renderer:function (val,cellmeta,record,rowIndex,columnIndex,store) {
                                                var dpt_diseasesStore = Ext.getCmp('dpt_diseases').getStore();
                                                if(dpt_diseasesStore.contains(record)){
                                                    return "<a href='javascript:void(0);' class='remove fa fa-trash-o'>移除</a> ";
                                                }else {
                                                    return "<a href='javascript:void(0);' class='add fa fa-plus-square'>添加</a> ";
                                                }
                                            }}
                                        ],
                                        store: Ext.create('Ext.data.Store', {
                                            model: 'diseasesRightModel',
                                            remoteSort: true,//服务端排序必须参数
                                            proxy: {
                                                type: 'ajax',
                                                method:'GET',
                                                extraParams: {
                                                    diseaseCode:"",
                                                    diseaseIcdName: ""
                                                },
                                                url: 'getdiseaselist',
                                                reader: {
                                                    type: 'json',
                                                    rootProperty: 'data.datas',
                                                    totalProperty : 'data.totalCount'
                                                }
                                            },
                                            // //排序
                                            sorters: [{
                                                property: 'default',
                                                direction: 'default'
                                            }]
                                        }),
                                        listeners: {
                                            cellclick: 'cellclick',
                                            beforeshow:function () {
                                                var diseaselistStore = Ext.getCmp('diseases').getStore();
                                                diseaselistStore.load();
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                id:'diseasesgroups',
                                title: '添加疾病分组',
                                xtype:'cisgrid',
                                isPage:true,
                                multiColumnSort:false,//单个排序
                                columnLines: true,
                                style:{
                                    border:'1px solid #f6f6f6'
                                },
                                emptyText:'暂无数据',
                                columns: [
                                    { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },//创建序号
                                    { text: '名称', dataIndex: 'name', align: 'center',flex:1 },
                                    { text: '描述', dataIndex: 'description', align: 'center', flex:1 },
                                    { text: '操作', sortable: false, width:90,align: 'center',renderer:function (val,cellmeta,record,rowIndex,columnIndex,store) {
                                        return "<a href='javascript:void(0);' class='addgroup fa fa-plus-square'>添加</a> "+
                                                "<a href='javascript:void(0);' class='removegroup fa fa-trash-o'>移除</a> ";
                                    }}
                                ],
                                store: Ext.create('Ext.data.Store', {
                                    model: 'diseasesRightModel',
                                    remoteSort: true,//服务端排序必须参数
                                    proxy: {
                                        type: 'ajax',
                                        method:'GET',
                                        extraParams: {
                                            name:"",
                                            description: ""
                                        },
                                        url: 'querydiseasegroups',
                                        reader: {
                                            type: 'json',
                                            rootProperty: 'data.datas',
                                            totalProperty : 'data.totalCount'
                                        }
                                    },
                                    // //排序
                                    sorters: [{
                                        property: 'default',
                                        direction: 'default'
                                    }]
                                }),
                                listeners: {
                                    cellclick: 'cellclick',
                                    beforeshow:function () {
                                        var diseasegroupsStore = Ext.getCmp('diseasesgroups').getStore();
                                        diseasegroupsStore.load();
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },

    buttons: [
        '->',
        {
            text: '返回',
            handler: 'back'
        }
    ],
    listeners: {
        afterrender:'afterrender',
    }
});