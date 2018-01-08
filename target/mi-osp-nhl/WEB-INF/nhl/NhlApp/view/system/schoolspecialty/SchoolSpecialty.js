/**
 * Created by apple on 2017/4/2.
 */
Ext.define("NhlApp.view.system.schoolspecialty.SchoolSpecialty", {
    extend: "Ext.panel.Panel",
    alias: 'widget.system_schoolspecialty',
    requires: [
        'NhlApp.view.system.schoolspecialty.SchoolSpecialtyController',
        'NhlApp.view.system.schoolspecialty.SchoolSpecialtyModel'
    ],
    controller: 'system_schoolspecialty',
    viewModel: {
        type: 'system_schoolspecialty'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：学校及专业维护',
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
                    labelWidth: 60,
                    width: 160,
                    xtype: 'textfield',
                    fieldLabel: '学校名称:',
                    enableKeyEvents:true,
                    bind: '{searchModel.schoolName}'
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
                                city.getStore().load();
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
                                district.getStore().load()
                                // district.store.load({
                                //     params:{
                                //         parentId:combo.getValue()
                                //     }}
                                // );
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
                },  {
                    text: '查询',
                    listeners:{
                        click: 'filter'
                    }
                },  {
                    xtype:'permissionbutton',
                    permission:'schoolAdd',
                    text: '添加学校',
                    listeners:{
                        click: 'add'
                    }
                }]
            },
            id:'schoolGrid',
            margin:'0 10 0 0',
            flex:1,
            columnLines: true,
            isPage:true,//需要分页
            style: {
                border:'1px solid #f6f6f6'
            },
            bind: {
                store: '{gridstore}',
                selection: '{focusSchool}'
            },
            multiColumnSort:false,//禁止多列排序
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                { text: '名称', width: 100, dataIndex: 'name',renderer:function (val) {
                    return "<a href='javascript:void(0);' class='detail'>"+val+"</a> "
                }},
                { text: '所在地',sortable: false, width: 100, dataIndex: 'area', align: 'left',renderer:function (val,cellmeta,record,rowIndex,columnIndex,store) {
                    var p = record.get('province_name')==null?'':record.get('province_name');
                    var c = record.get('city_name')==null?'':record.get('city_name');
                    var d = record.get('district_name')==null?'':record.get('district_name');
                    return p+c+d;
                } },
                { text: '地址',width:100, dataIndex: 'address', align: 'left' },
                { text: '电话',width: 100, dataIndex: 'phone', align: 'center'},
                { text: '描述',flex:1, dataIndex: 'description', align: 'left'},
                { text: '操作',sortable: false, menuDisabled:true, width: 145,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
                    var detail,edit,del;
                    detail = permission.schoolDetail?"<a href='javascript:void(0);' class='detail fa fa-file-text-o'>详情</a> "+ "&nbsp|&nbsp":"";
                    edit = permission.schoolEdit?"<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>"+ "&nbsp|&nbsp":"";
                    del = permission.schoolDelete?"<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>":"";
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
            id:'majorGrid',
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
                        value:'{schoolName}'
                    }
                }, '->', {
                    xtype:'permissionbutton',
                    permission:'schoolspecialtyAdd',
                    text: '添加专业',
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
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                { text: '名称', sortable: false,width: 80, dataIndex: 'name', align: 'left'},
                { text: '描述', sortable: false,flex:1, dataIndex: 'description', align: 'left' },
                { text: '专业编码',sortable: false,width:80, dataIndex: 'code', align: 'center' },
                { text: '操作',sortable: false, menuDisabled:true, width: 100,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
                    var edit,del;
                    edit = permission.schoolspecialtyDelete?"<a  href='javascript:void(0);' class='editMajor fa fa-edit'>编辑</a>"+ "&nbsp|&nbsp":"";
                    del = permission.schoolspecialtyEdit?"<a  href='javascript:void(0);' class='deleteMajor fa fa-trash-o'>删除</a>":"";
                    return  edit+ del;
                }}
            ],
            listeners: {
                cellclick: 'cellclickMajor'
            }
        }
    ]
});