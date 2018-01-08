/**
 * Created by apple on 2017/4/2.
 */
Ext.define("NhlApp.view.system.hospitaldepartment.HospitalDepartment", {
    extend: "Ext.panel.Panel",
    alias: 'widget.system_hospitaldepartment',
    requires: [
        'NhlApp.view.system.hospitaldepartment.HospitalDepartmentController',
        'NhlApp.view.system.hospitaldepartment.HospitalDepartmentModel'
    ],
    controller: 'system_hospitaldepartment',
    viewModel: {
        type: 'system_hospitaldepartment'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：医院及科室维护',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
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
            labelWidth: 30,
            width: 130,
            xtype: 'textfield',
            fieldLabel: '编码:',
            bind: '{searchModel.code}',
            enableKeyEvents:true
        },{
            labelWidth: 30,
            width: 130,
            xtype: 'textfield',
            fieldLabel: '名称',
            bind: '{searchModel.hospitalName}',
            enableKeyEvents:true
        },{
            xtype: 'combobox',
            labelWidth: 30,
            fieldLabel: '级别',
            width: 110,
            editable:false,//不可编辑
            bind: '{searchModel.level}',
            store:Ext.create('Ext.data.Store', {
                fields: ['itemvalue', 'itemname'],
                autoLoad:true,
                proxy: {
                    type: 'ajax',
                    url: 'getmedicallevel',
                    method: 'GET',
                    reader: {
                        type: 'json',
                        rootProperty: 'data.result'//返回数据字段
                    }
                }
            }),
            displayField: 'itemname',
            valueField: 'itemvalue',
            listeners: {
                afterRender: function(combo) {
                    combo.setValue('');//同时下拉框会将与name为firstValue值对应的 text显示
                }
            }
        },{
            xtype: 'combobox',
            id:'province',
            labelWidth: 15,
            fieldLabel: '省',
            selecOnFocus:true,
            forceSelection:true,
            triggerAction : 'all',
            emptyText:'全部',
            width: 100,
            editable:false,//不可编辑
            bind: '{searchModel.province}',
            store:Ext.create('Ext.data.Store', {
                fields: ['id', 'name'],
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: 'getarea',
                    method: 'GET',
                    extraParams: {
                        parentId:'0'
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data'//返回数据字段
                    }
                },
                listeners: {
                    load:function (store, records, options) { //设置全部
                        var newData = new Ext.data.Record({'id':'1','name':'全部'});
                        store.insert(0, newData);
                        Ext.getCmp('province').setValue('全部');
                    }
                }
            }),
            displayField: 'name',
            valueField: 'id',
            listeners: {
                select:function(combo,record,index){
                    try{
                        var city = Ext.getCmp('city');
                        var district = Ext.getCmp('district');
                        city.clearValue();
                        district.clearValue();
                        city.getStore().getProxy().extraParams.parentId = combo.getValue();
                        // district.getStore().getProxy().extraParams.parentId = '1';
                        city.getStore().load();
                        // district.getStore().load();
                    }catch(ex){
                        alert("数据加载失败！");
                    }
                }
            }
        }, {
            xtype: 'combobox',
            id:'city',
            labelWidth: 15,
            fieldLabel: '市',
            selecOnFocus:true,
            forceSelection:true,
            triggerAction : 'all',
            emptyText:'全部',
            width: 100,
            editable:false,//不可编辑
            bind: '{searchModel.city}',
            store:Ext.create('Ext.data.Store', {
                fields: ['id', 'name'],
                autoLoad:false,
                proxy: {
                    type: 'ajax',
                    url: 'getarea',
                    method: 'GET',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'//返回数据字段
                    }
                },
                listeners: {
                    load:function (store, records, options) { //设置全部
                        var newData = new Ext.data.Record({'id':'1','name':'全部'});
                        store.insert(0, newData);
                        Ext.getCmp('city').setValue('全部');
                    }
                }
            }),
            displayField: 'name',
            valueField: 'id',
            listeners: {
                select:function(combo,record,index){
                    try{
                        var district = Ext.getCmp('district');
                        district.clearValue();
                        district.getStore().getProxy().extraParams.parentId = combo.getValue();
                        district.getStore().load();
                    }catch(ex){
                        alert("数据加载失败！");
                    }

                }
            }
        }, {
            xtype: 'combobox',
            id:'district',
            labelWidth: 15,
            fieldLabel: '区',
            selecOnFocus:true,
            forceSelection:true,
            triggerAction : 'all',
            emptyText:'全部',
            width: 100,
            editable:false,//不可编辑
            bind: '{searchModel.district}',
            store:Ext.create('Ext.data.Store', {
                fields: ['id', 'name'],
                autoLoad:false,
                proxy: {
                    type: 'ajax',
                    url: 'getarea',
                    method: 'GET',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'//返回数据字段
                    }
                },
                listeners: {
                    load:function (store, records, options) { //设置全部
                        var newData = new Ext.data.Record({'id':'1','name':'全部'});
                        store.insert(0, newData);
                        Ext.getCmp('district').setValue('全部');
                    }
                }
            }),
            displayField: 'name',
            valueField: 'id'
        }, {
            text: '查询',
            listeners:{
                click: 'filter'
            }
        },  {
            xtype:'permissionbutton',
            permission:'hospitalAdd',
            text: '添加医院',
            listeners:{
                click: 'add'
            }
        }]
    },
    items:[
        {
            xtype:'cisgrid',
            id:'hospitalGrid',
            margin:'0 10 0 0',
            flex:1,
            columnLines: true,
            isPage:true,//需要分页
            style: {
                border:'1px solid #f6f6f6'
            },
            bind: {
                store: '{gridstore}'
            },
            multiColumnSort:false,//禁止多列排序
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                { text: '名称',minWidth: 100,flex:1, dataIndex: 'name',renderer:function (val) {
                    return "<a href='javascript:void(0);' class='detail'>"+val+"</a> "
                }},
                { text: '所在地',sortable: false,width: 100, dataIndex: 'area', align: 'center',renderer:function (val,cellmeta,record,rowIndex,columnIndex,store) {
                    var p = record.get('provincename')==null?'':record.get('provincename');
                    var c = record.get('cityname')==null?'':record.get('cityname');
                    var d = record.get('districtname')==null?'':record.get('districtname');
                    return p+c+d;
                } },
                { text: '地址',width:100, dataIndex: 'address', align: 'center'},
                { text: '级别',sortable: false,width: 50, dataIndex: 'level', align: 'center',renderer:function (val) {
                    if(val=="4"){
                        return "三甲";
                    }else if (val=="3"){
                        return "三级";
                    }else if(val=="2"){
                        return "二级";
                    }else if(val=="1"){
                        return "一级";
                    }else if(val=="0"){
                        return "其他";
                    }else if(val=="-2"){
                        return "社区";
                    }else if(val=="-1"){
                        return "一级以下";
                    }else {
                        return "";
                    }
                }},
                { text: '类型',width: 70,sortable: false, dataIndex: 'type', align: 'center',renderer:function (val) {
                    if(val=="1"){
                        return "综合医院";
                    }else if (val=="2"){
                        return "中医医院";
                    }else if(val=="3"){
                        return "专科医院";
                    }else if(val=="4"){
                        return "护理院";
                    }else {
                        return "";
                    }
                }},
                { text: '编码',width: 60, dataIndex: 'code', align: 'center'},
                { text: '电话',width: 90, dataIndex: 'phone', align: 'center'},
                { text: '操作',sortable: false, menuDisabled:true, width: 145,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
                    var detail,edit,del;
                    detail = permission.hospitalDetail?"<a href='javascript:void(0);' class='detail fa fa-file-text-o'>详情</a> "+ "&nbsp|&nbsp":"";
                    edit = permission.hospitalEdit?"<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>"+ "&nbsp|&nbsp":"";
                    del = permission.hospitalDelete?"<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>":"";
                    return  detail+ edit+ del;
                }}
            ],
            listeners: {
                cellclick: 'cellclick',
                select:'select'
            }
        },
        {
            xtype:'cisgrid',
            id:'department',
            isPage:false,
            columnLines: true,
            width:476,
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
                        value:'{hosName}'
                    }
                }, '->', {
                    xtype:'permissionbutton',
                    permission:'hospitaldepartmentAdd',
                    text: '添加科室',
                    bind:{
                        disabled:'{btnDepartmentF}'
                    },
                    listeners:{
                        click: 'addDepartment'
                    }
                }]
            },
            style: {
                border:'1px solid #f6f6f6'
            },
            bind: {
                store: '{departmentstore}',
                selection: '{focusApplication}'
            },
            multiColumnSort:true,//禁止多列排序
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                { text: '名称',sortable: false,width: 80, dataIndex: 'name', align: 'center'},
                { text: '描述',sortable: false,flex:1, dataIndex: 'description', align: 'center' },
                { text: '专业科室',sortable: false,width:80, dataIndex: 'medicalDepartName', align: 'center'},
                { text: '科室编码',sortable: false,width: 80, dataIndex: 'code', align: 'center' },
                { text: '操作',sortable: false, menuDisabled:true, width: 100,align:'left', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
                    var edit,del;
                    edit = permission.hospitaldepartmentEdit?"<a  href='javascript:void(0);' class='editDepartment fa fa-edit'>编辑</a>"+ "&nbsp|&nbsp":"";
                    del = permission.hospitaldepartmentDelete?"<a  href='javascript:void(0);' class='deleteDepartment fa fa-trash-o'>删除</a>":"";
                    return  edit+ del;
                }}
            ],
            listeners: {
                cellclick: 'cellclickdepartment'
            }
        }
    ]
});