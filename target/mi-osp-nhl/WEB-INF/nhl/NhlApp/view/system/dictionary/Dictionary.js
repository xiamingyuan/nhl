/**
 * Created by apple on 2017/3/27.
 */
Ext.define("NhlApp.view.system.dictionary.Dictionary", {
    extend: "Nhl.base.Grid",
    alias: 'widget.system_dictionary',
    requires: [
        'NhlApp.view.system.dictionary.DictionaryController',
        'NhlApp.view.system.dictionary.DictionaryModel'
    ],
    controller: 'system_dictionary',
    viewModel: {
        type:'system_dictionary'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 字典数据维护',
    multiColumnSort:false,
    startRowGroupsCollapsed: false,
    isPage:true,//是否需要分页,
    border:true,
    id:'dictionary',
    bind: {
        store: '{gridstore}',
        selection: '{focusApplication}'
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
            id:"classID",
            labelWidth: 45,
            width: 180,
            xtype: 'textfield',
            fieldLabel: '分类ID',
            enableKeyEvents:true,
            bind: '{searchModel.classID}'
        },{
            id:"className",
            labelWidth: 60,
            width: 180,
            xtype: 'textfield',
            fieldLabel: '分类名称',
            bind: '{searchModel.className}',
            enableKeyEvents:true
        }, {
            id:"itemName",
            labelWidth: 60,
            width: 178,
            xtype: 'textfield',
            bind: '{searchModel.itemName}',
            fieldLabel: '代码名称'
        }, {
            text: '查询',
            id:"userSearch",
            name: 'userSearch',
            listeners:{
                click: 'filter'
            }
        }, {
            xtype:'permissionbutton',
            permission:'dataAdd',
            text: '添加',
            listeners:{
                click: 'add'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 50,height:30 },//创建序号
        { text: '分类ID',flex:1, dataIndex: 'classid'},
        { text: '分类名称',flex:1, dataIndex: 'classname' },
        { text: '分类描述',flex:1, dataIndex: 'classdesc' },
        { text: '代码值',width:100, dataIndex: 'itemvalue' },
        { text: '代码值描述',flex:1, dataIndex: 'itemvaluedesc' },
        { text: '代码名称',flex:1, dataIndex: 'itemname' },
        { text: '操作',sortable: false, menuDisabled:true, width: 90,align:'left', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            var edit,del;
            edit = permission.dataEdit?"<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>"+ "&nbsp|&nbsp":"";
            del = permission.dataDelete?"<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>":"";
            return  edit+ del;
        }}

    ],
    listeners: {
        cellclick: 'cellclick'
    }
});