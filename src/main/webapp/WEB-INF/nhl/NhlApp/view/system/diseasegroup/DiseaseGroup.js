/**
 * Created by apple on 2017/4/2.
 */
Ext.define("NhlApp.view.system.diseasegroup.DiseaseGroup", {
    extend: "Ext.panel.Panel",
    alias: 'widget.system_diseasegroup',
    requires: [
        'NhlApp.view.system.diseasegroup.DiseaseGroupController',
        'NhlApp.view.system.diseasegroup.DiseaseGroupModel'
    ],
    controller: 'system_diseasegroup',
    viewModel: {
        type: 'system_diseasegroup'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：疾病分组',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    items:[
        {
            xtype:'cisgrid',
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
                    id:"diseaseName",
                    labelWidth: 65,
                    width: 190,
                    xtype: 'textfield',
                    fieldLabel: '疾病组名称',
                    bind: '{searchModel.name}',
                    enableKeyEvents:true
                },{
                    id:"diseaseDescription",
                    labelWidth: 65,
                    width: 190,
                    xtype: 'textfield',
                    fieldLabel: '疾病组描述',
                    bind: '{searchModel.description}',
                    enableKeyEvents:true
                },{
                    text: '查询',
                    id:"onlineSearch",
                    name: 'onlineSearch',
                    listeners:{
                        click: 'filter'
                    }
                },{
                    xtype:'permissionbutton',
                    permission:'diseasegroupAdd',
                    text: '添加疾病分组',
                    listeners:{
                        click: 'add'
                    }
                }]
            },
            id:'diseaseGroupGrid',
            margin:'0 10 0 0',
            flex:1.5,
            minWidth:600,
            emptyText:'暂无数据',
            columnLines: true,
            isPage:true,//需要分页
            style: {
                border:'1px solid #f6f6f6'
            },
            bind: {
                store: '{gridstore}',
                selection: '{focusDisease}'
            },
            multiColumnSort:false,//禁止多列排序
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                { text: '疾病组名称', width: 150, dataIndex: 'name'},
                { text: '描述',flex:1, dataIndex: 'description', align: 'left'},
                { text: '疾病统计数',width: 80, dataIndex: 'diseasesCount', align: 'center'},
                { text: '操作',sortable: false, menuDisabled:true, width: 100,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
                    var edit,del;
                    edit = permission.diseasegroupEdit?"<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>"+ "&nbsp|&nbsp":"";
                    del = permission.diseasegroupDelete?"<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>":"";
                    return edit+ del;
                }}
            ],
            listeners: {
                cellclick: 'cellclick',
                select:'select'
            }
        },
        {
            xtype:'cisgrid',
            id:'diseaseMajorGrid',
            isPage:false,
            columnLines: true,
            flex:1,
            emptyText:'暂无数据',
            tbar: {
                xtype: 'toolbar',
                padding: 5,
                height: 38,
                width: '100%',
                defaults: {
                    labelAlign: 'right',
                    margin: '0 10 0 0'
                },
                items: [{
                    xtype: 'displayfield',
                    bind:{
                        value:'{diseaseTitleName}'
                    }
                }, '->', {
                    xtype:'permissionbutton',
                    permission:'diseasegroupmajorAdd',
                    text: '添加疾病',
                    bind:{
                        disabled:'{btnMajorF}'
                    },
                    listeners:{
                        click: 'addMajor'
                    }
                }]
            },
            style: {
                border:'1px solid #f6f6f6'
            },
            bind: {
                store: '{majorstore}',
                selection: '{focusApplication}'
            },
            // isPage:true,//需要分页
            // multiColumnSort:false,//禁止多列排序
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                { text: '疾病编码', sortable: false,width: 100, dataIndex: 'code', align: 'center'},
                { text: '疾病名称', sortable: false,flex:1,minWidth:150, dataIndex: 'similarname', align: 'left' },
                { text: '疾病科室',sortable: false,width:100, dataIndex: 'depts', align: 'center' },
                { text: '操作',sortable: false, menuDisabled:true, width: 60,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
                    var del;
                    del = permission.diseasegroupmajorDelete?"<a  href='javascript:void(0);' class='deleteMajor fa fa-trash-o'>删除</a>":"";
                    return  del;
                }}
            ],
            listeners: {
                cellclick: 'cellclickMajor'
            }
        }
    ]
});