/**
 * Created by apple on 2017/4/12.
 */
Ext.define('NhlApp.view.business.signdepart.signdepartadd.SignDepartAdd', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.signdepartadd',
    requires: [
        'NhlApp.view.business.signdepart.signdepartadd.SignDepartAddController',
        'NhlApp.view.business.signdepart.signdepartadd.SignDepartAddModel'
    ],
    controller: 'business_signdepartadd',
    viewModel: {
        type:'business_signdepartadd'
    },
    iconCls:'fa fa-home',
    title: '当前位置 : 签约科室添加',
    scrollable:'y',
    items: [
        {
            xtype: 'form',
            id:'basicInfor',
            bodyPadding: 10,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 65,
                margin:'0 0 15',
                width:"50%"
            },
            items: [
                {
                    width: 500,
                    id:'signdepartname',
                    xtype: 'textfield',
                    bind:'{addsigndepart.name}',
                    fieldLabel: '科室',
                    msgTarget: 'under',
                    allowBlank: false,
                    blankText: "请输入签约科室名称！"
                },
                {
                    width: 500,
                    id: 'hospital',
                    xtype: 'textfield',
                    bind:'{addsigndepart.base_hospital_name}',
                    fieldLabel: '医院',
                    msgTarget: 'under',
                    allowBlank: false,
                    blankText: "请输入医院名称"
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    width: 500,
                    margin:0,
                    fieldLabel: '医院所在地',
                    defaults: {
                        width:'50%'
                    },
                    items:[
                        {
                            xtype: 'combobox',
                            id:'provinceAdd',
                            bind:'{addsigndepart.hospital_province_id}',
                            fieldLabel: '省/直辖市',
                            editable:false,//不可编辑
                            emptyText: "--请选择--",
                            allowBlank: false,
                            blankText: "请选择医院所在省/直辖市！",
                            store:Ext.create('Ext.data.Store', {
                                fields: ['id', 'name'],
                                autoLoad: true,
                                proxy: {
                                    type: 'ajax',
                                    method:'GET',
                                    extraParams: {
                                        parentId: "0"
                                    },
                                    url: 'getarea',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'data'
                                    }
                                }
                            }),
                            displayField: 'name',
                            valueField: 'id',
                            listeners: {
                                select:function(combo,record,index){
                                    try{
                                        var city = Ext.getCmp('cityAdd');
                                        city.clearValue();
                                        city.getStore().getProxy().extraParams.parentId = combo.getValue();
                                        city.getStore().load();
                                    }catch(ex){
                                        alert("数据加载失败！");
                                    }

                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            id:'cityAdd',
                            bind:'{addsigndepart.hospital_city_id}',
                            fieldLabel: '地级市',
                            editable:false,//不可编辑
                            emptyText: "--请选择--",
                            allowBlank: false,
                            blankText: "请选择医院所在地级市！",
                            store:Ext.create('Ext.data.Store', {
                                fields: ['id', 'name'],
                                autoLoad: true,
                                proxy: {
                                    type: 'ajax',
                                    method:'GET',
                                    extraParams: {},
                                    url: 'getarea',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'data'
                                    }
                                }
                            }),
                            displayField: 'name',
                            valueField: 'id'
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    width: 200,
                    bind:'{addsigndepart.hospital_level}',
                    fieldLabel: '医院级别',
                    editable:false,//不可编辑
                    emptyText: "--请选择--",
                    blankText : "医院级别不能为空！",
                    allowBlank: false,
                    store:Ext.create('Ext.data.Store', {
                        fields: ['itemvalue', 'itemname'],
                        proxy: {
                            type: 'ajax',
                            method:'GET',
                            url: 'getmedicallevel',
                            reader: {
                                type: 'json',
                                rootProperty: 'data.result'
                            }
                        },
                        autoLoad: true
                    }),
                    displayField: 'itemname',
                    valueField: 'itemvalue'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 5 0 0'
                    },
                    items: [
                        {
                            width: 500,
                            id:'iamgeCon',
                            xtype: 'textfield',
                            readOnly:true,
                            fieldLabel: 'logo'
                        },
                        {
                            xtype: 'button',
                            text: '选择图片',
                            listeners: {
                                click: 'addImage'
                            }
                        }
                    ]
                },
                {
                    xtype: 'image',
                    id:'imageView',
                    style: {
                        'margin': '0 0 0 68px',
                        'border-radius': '3px',
                        'width': '90px',
                        'height': '90px',
                        'border': '1px solid #f6f6f6'
                    },
                    bind: {
                        src: '{logo}'
                    }
                },
                {
                    xtype: 'textareafield',
                    bind:'{addsigndepart.description}',
                    fieldLabel: '简介',
                    maxLength : 800,
                    maxLengthText : '分组描述长度不能超过800个字符',
                    width: 500,
                    height: 300
                }
            ]
        },
        {
            xtype: 'form',
            id:'imageForm',
            hidden:true,
            items:[
                {
                    xtype: 'filefield',
                    id:'uploadImage',
                    buttonOnly: true,
                    hideLabel: true,
                    name:'file',
                    listeners: {
                        change: 'imageChange'
                    }
                }
            ]
        }
    ],
    buttons: [
        { text: '保存', handler: 'onSave' },
        '->',
        { text: '返回', handler: 'back' }
    ],
    listeners:{
        afterrender:'afterrender'
    }
});