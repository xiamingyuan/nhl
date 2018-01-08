/**
 * Created by apple on 2017/4/2.
 */
Ext.define("NhlApp.view.system.city.City", {
    extend: "Ext.tree.Panel",
    alias: 'widget.system_city',
    requires: [
        'NhlApp.view.system.city.CityController',
        'NhlApp.view.system.city.CityModel'
    ],
    controller: 'system_city',
    viewModel: {
        type: 'system_city'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：城市维护',
    rootVisible: false,
    singleExpand: false,
    bind:{
        store:'{gridstore}',
        selection: '{focusApplication}'
    },
    defaults:{
        flex:1
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
            value: '城市列表'
        },'->', {
            xtype:'permissionbutton',
            permission:'cityAdd',
            text: '添加根城市',
            listeners:{
                click:'addRoot'
            }
        }, {
            xtype:'permissionbutton',
            permission:'cityAdd',
            text: '添加子城市',
            listeners:{
                click:'addChild'
            }
        }]
    },
    // 城市编码：	220100
    // 城市名称：	长春市
    // 城市简称：	长春
    // 城市全拼：	changchunshi
    // 城市简拼：	ccs
    // 地区级别：	地级行政区
    // 上级地区：	吉林省
    columns: [
        {xtype: 'treecolumn', text: '城市名称', dataIndex: 'name', flex: 2, sortable: false},
        { text: '城市简称', dataIndex: 'shortname', flex: 1,align: 'center', sortable: false},
        { text: '城市全拼', dataIndex: 'spell', flex: 1,align: 'left', sortable: false},
        { text: '城市简拼', dataIndex: 'jianpin', flex: 1,align: 'left', sortable: false},
        { text: '城市编码', dataIndex: 'id', flex: 1,align: 'center', sortable: false},
        { text: '是否主要城市', dataIndex: 'key_city', flex: 1,align: 'center', sortable: false,renderer:function (val) {
            return val?"是":"否";
        }},
        { text: '百度编码', dataIndex: 'baidu_name', flex: 1,align: 'center', sortable: false},
        { text: '序号', dataIndex: 'c_order', flex: 1,align: 'center', sortable: false},
        { text: '地区级别', dataIndex: 'level_', flex: 1,align: 'center', sortable: false, renderer:'levelRender'},
        //{ text: '上级地区', dataIndex: 'parent_id', flex: 1,align: 'center', sortable: false},
        { text: '操作',sortable: false, menuDisabled:true, width: 90,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            var edit,del;
            edit = permission.cityEdit?"<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>"+ "&nbsp|&nbsp":"";
            del = permission.cityDelete?"<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>":"";
            return  edit+ del;
        }}
    ],
    bbar: {
        xtype: 'toolbar',
        padding: 5,
        height:38,
        width: '100%',
        items: [{
            xtype: 'displayfield',
            bind:{
                value: '共：{count} 个城市'
            }
        }]
    },
    listeners:{
        'afterrender':'render',
        'cellclick':'cellclick'
    }
});