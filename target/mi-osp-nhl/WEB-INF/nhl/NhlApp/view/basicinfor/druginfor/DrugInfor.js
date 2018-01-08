/**
 * Created by apple on 2017/3/31.
 */
Ext.define("NhlApp.view.basicinfor.druginfor.DrugInfor", {
    extend: "Ext.panel.Panel",
    alias: 'widget.basicinfor_druginfor',
    requires: [
        'NhlApp.view.basicinfor.druginfor.DrugInforController',
        'NhlApp.view.basicinfor.druginfor.DrugInforModel'
    ],
    controller: 'basicinfor_druginfor',
    viewModel: {
        type: 'basicinfor_druginfor'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：药品信息',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            flex:1,
            xtype:'cisgrid',
            columnLines: true,
            id:'drugclassification',
            isPage:true,//需要分页
            bind: {
                store: '{gridstore}'
            },
            columns : [
                { text: '药品分类',flex:1, dataIndex: 'name'}
            ],
            listeners:{
                select:'select'
            }
        },
        {
            flex:1,
            xtype:'cisgrid',
            columnLines: true,
            id:'drug',
            isPage:true,//需要分页
            bind: {
                store: '{druggridstore}',
                selection: '{focusApplication}'
            },
            multiColumnSort:false,
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
                    id:"genericName",
                    labelWidth: 40,
                    width: 140,
                    xtype: 'textfield',
                    fieldLabel: '通用名',
                    bind: '{searchModel.genericName}',
                    enableKeyEvents:true
                }, {
                    text: '查询',
                    listeners:{
                        click: 'filter'
                    }
                }, {
                    text: '查询全部',
                    listeners:{
                        click: 'filterAll'
                    }
                }]
            },
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                { text: '编号',width: 160, dataIndex: 'id'},
                { text: '通用名',flex:1,minWidth:60,dataIndex: 'name', align: 'center' },
                { text: '剂型',width: 100, dataIndex: 'dosageforms', align: 'center' },
                { text: '药品别名',width: 100, dataIndex: 'similarName', align: 'center' },
                { text: '所属分类',width: 240, dataIndex: 'drugGroupName', align: 'center' },
                { text: '标签',width: 120, dataIndex: 'tags', align: 'center'},
                { text: '快捷名称',width: 120, dataIndex: 'abbSpell', align: 'center' },
                { text: '操作',sortable: false, menuDisabled:true, width: 100,align:'left', renderer:function(){
                    var edit,del;
                    edit = permission.drugEdit?"<a href='javascript:void(0);' class='edit fa fa-edit'>编辑</a> " + "&nbsp|&nbsp":"";
                    del = permission.drugDelete?"<a  href='javascript:void(0);' class='delete fa fa-trash-o fa-fw'>删除</a>":"";
                    return edit+ del;
                }}
            ],
            listeners:{
                cellclick:'cellclick'
            }
        }
    ]
});