/**
 * Created by apple on 2017/4/2.
 */
Ext.define("NhlApp.view.system.specialtysystem.SpecialtySystem", {
    extend: "Ext.tree.Panel",
    alias: 'widget.system_specialtysystem',
    requires: [
        'NhlApp.view.system.specialtysystem.SpecialtySystemController',
        'NhlApp.view.system.specialtysystem.SpecialtySystemModel'
    ],
    controller: 'system_specialtysystem',
    viewModel: {
        type: 'system_specialtysystem'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：专业系统维护',
    rootVisible: false,
    singleExpand: false,
    bind:{
        store:'{gridstore}',
        selection: '{focusApplication}'
    },
    defaults:{
        flex:1
    },
    plugins: {
        ptype: 'treeviewdragdrop',
        containerScroll: true
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
            xtype: 'displayfield',
            value: '专业系统列表'
        },'->', {
            xtype:'permissionbutton',
            permission:'specialtysystemAdd',
            text: '添加根系统',
            listeners:{
                click:'addRoot'
            }
        }, {
            xtype:'permissionbutton',
            permission:'specialtysystemAdd',
            text: '添加子系统',
            listeners:{
                click:'addChild'
            }
        }]
    },
    columns: [
        {xtype: 'treecolumn', text: '专业系统编码', dataIndex: 'code', flex: 1, sortable: false},
        { text: '专业系统名称', dataIndex: 'name', flex: 1,align: 'center', sortable: false},
        { text: '专业系统描述', dataIndex: 'description', flex: 1,align: 'center', sortable: false},
        { text: '专业系统级别', dataIndex: 'level_', flex: 1,align: 'center', sortable: false, renderer:'levelRender'},
        { text: '操作',sortable: false, menuDisabled:true, width: 90,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            var edit,del;
            edit = permission.specialtysystemEdit?"<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>"+ "&nbsp|&nbsp":"";
            del = permission.specialtysystemDelete?"<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>":"";
            return  edit+ del;
        }}
        // { text: '上级专业科室名称', dataIndex: 'name', flex: 1, sortable: true},
        // { text: '上级专业科室编码', dataIndex: 'parent_code', flex: 1, sortable: true}
    ],
    bbar: {
        xtype: 'toolbar',
        padding: 5,
        height:38,
        width: '100%',
        items: [{
            xtype: 'displayfield',
            bind:{
                value: '共：{count} 个专业系统'
            }
        }]
    },
    listeners:{
        'afterrender':'render',
        'cellclick':'cellclick'
    }
});