/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.system.hospitaldepartment.hospitaldepartmentadd.HospitalDepartmentAdd', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hospitaldepartmentadd',
    requires: [
        'NhlApp.view.system.hospitaldepartment.hospitaldepartmentadd.HospitalDepartmentAddController',
        'NhlApp.view.system.hospitaldepartment.hospitaldepartmentadd.HospitalDepartmentAddModel'
    ],
    controller: 'system_hospitaldepartmentadd',
    viewModel: {
        type:'system_hospitaldepartmentadd'
    },
    iconCls:'fa fa-home',
    title: '当前位置 : 医院添加',
    scrollable:'y',
    items: [
        {
            bodyPadding: 10,
            modelValidation: true,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 80,
                width:"50%"
            },
            defaults: {
                columnWidth: 0.5
            },
            xtype: 'form',
            layout: 'column',
            id:'addhosForm',
            items:[
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            bind:'{formModel.name}',
                            fieldLabel: '医院名称',
                            blankText : "医院名称不能为空！",
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            bind:'{formModel.shortname}',
                            fieldLabel: '医院简称',
                            blankText : "医院简称不能为空！",
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5
                    },
                    items:[
                        {
                            xtype: 'combobox',
                            bind:'{formModel.level_}',
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
                            xtype: 'combobox',
                            bind:'{formModel.type}',
                            fieldLabel: '医院类型',
                            editable:false,//不可编辑
                            emptyText: "--请选择--",
                            store:Ext.create('Ext.data.Store', {
                                fields: ['itemvalue', 'itemname'],
                                proxy: {
                                    type: 'ajax',
                                    method:'GET',
                                    url: 'gethostype',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'data.result'
                                    }
                                },
                                autoLoad: true
                            }),
                            displayField: 'itemname',
                            valueField: 'itemvalue'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            bind:'{formModel.phone}',
                            fieldLabel: '医院电话'
                        },
                        {
                            xtype: 'textfield',
                            bind:'{formModel.url}',
                            fieldLabel: '医院网址'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5
                    },
                    items:[
                        {
                            xtype: 'radiogroup',
                            defaults: {
                                name: 'ispartner'
                            },
                            columns:4,
                            bind:{
                                value:'{formModel.ispartner}'
                            },
                            fieldLabel: '海虹合作',
                            items: [
                                {boxLabel: '是', inputValue: '1'},
                                {boxLabel: '否', inputValue: '2'}
                            ]
                        },
                        {
                            xtype: 'combobox',
                            bind:'{formModel.jointmethod}',
                            fieldLabel: '投资方式',
                            editable:false,//不可编辑
                            emptyText: "--请选择--",
                            store:Ext.create('Ext.data.Store', {
                                fields: ['itemvalue', 'itemname'],
                                proxy: {
                                    type: 'ajax',
                                    method:'GET',
                                    url: 'getjointmethod',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'data.result'
                                    }
                                },
                                autoLoad: true
                            }),
                            displayField: 'itemname',
                            valueField: 'itemvalue'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            bind:'{formModel.longitude}',
                            fieldLabel: '经度'
                        },
                        {
                            xtype: 'textfield',
                            bind:'{formModel.latitude}',
                            fieldLabel: '纬度'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            bind:'{formModel.code}',
                            fieldLabel: '医院编码',
                            blankText : "医院编码不能为空！",
                            allowBlank: false,
                            regex: /^[A-Za-z0-9]+$/,
                            regexText:"请输入数字或字母的医院编码!"
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    bind:'{formModel.address}',
                    fieldLabel: '地址'
                },
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        width:'33.3333333%'
                    },
                    items:[
                        {
                            xtype: 'combobox',
                            id:'provinceAdd',
                            bind:'{formModel.provincecode}',
                            fieldLabel: '所在地区',
                            editable:false,//不可编辑
                            emptyText: "--请选择--",
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
                                        var district = Ext.getCmp('districtAdd');
                                        city.clearValue();
                                        district.clearValue();
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
                            bind:'{formModel.citycode}',
                            fieldLabel: '市',
                            editable:false,//不可编辑
                            emptyText: "--请选择--",
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
                            valueField: 'id',
                            listeners: {
                                select:function(combo,record,index){
                                    try{
                                        var district = Ext.getCmp('districtAdd');
                                        district.clearValue();
                                        district.getStore().getProxy().extraParams.parentId = combo.getValue();
                                        district.getStore().load();
                                    }catch(ex){
                                        alert("数据加载失败！");
                                    }

                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            id:'districtAdd',
                            bind:'{formModel.regioncode}',
                            fieldLabel: '区',
                            editable:false,//不可编辑
                            emptyText: "--请选择--",
                            store:Ext.create('Ext.data.Store', {
                                fields: ['id', 'name'],
                                proxy: {
                                    type: 'ajax',
                                    method:'GET',
                                    extraParams: {},
                                    url: 'getarea',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'data'
                                    }
                                },
                                autoLoad: true
                            }),
                            displayField: 'name',
                            valueField: 'id'
                        }
                    ]
                },
                {
                    //上传图片
                    xtype: 'panel',
                    fieldLabel: '',
                    columnWidth: 1,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '0 0 10'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            fieldLabel: '',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 5 0 0'
                            },
                            items: [
                                {
                                    id:'iamgeCon',
                                    xtype: 'textfield',
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
                            maxWidth:90,
                            margin: '0 0 15 85',
                            style: {
                                'margin': '0 0 0 35px',
                                'border-radius': '3px',
                                'width': '90px',
                                'height': '90px',
                                'border': '1px solid #f6f6f6'
                            },
                            bind: {
                                src: '{logo}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'textareafield',
                    margin:'0 0 15',
                    bind:'{formModel.describe}',
                    fieldLabel: '描述'
                },
                {
                    xtype: 'textareafield',
                    margin:'0 0 15',
                    bind:'{formModel.characteristic}',
                    fieldLabel: '医院特色'
                },
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5
                    },
                    items:[
                        {
                            xtype: 'radiogroup',
                            defaults: {
                                name: 'is_appointment'
                            },
                            columns:4,
                            bind:{
                                value:'{formModel.is_appointment}'
                            },
                            fieldLabel: '是否可以预约',

                            items: [
                                {boxLabel: '是', inputValue: '1'},
                                {boxLabel: '否', inputValue: '2'}
                            ]
                        },
                        {
                            xtype: 'textfield',
                            bind:'{formModel.order_hspt}',
                            fieldLabel: '预约排序',
                            regex: /^[0-9]\d*$/,
                            regexText:"预约排序只能由0-9数字组成！"
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5
                    },
                    items:[
                        {
                            xtype: 'radiogroup',
                            defaults: {
                                name: 'cprt_flag'
                            },
                            columns:4,
                            bind:{
                                value:'{formModel.cprt_flag}'
                            },
                            fieldLabel: '商保合作',
                            items: [
                                {boxLabel: '是', inputValue: '1'},
                                {boxLabel: '否', inputValue: '2'}
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            defaults: {
                                name: 'is_permanent'
                            },
                            columns:4,
                            bind:{
                                value:'{formModel.is_permanent}'
                            },
                            fieldLabel: '常驻',
                            items: [
                                {boxLabel: '是', inputValue: '1'},
                                {boxLabel: '否', inputValue: '2'}
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5
                    },
                    items:[
                        {
                            xtype: 'radiogroup',
                            defaults: {
                                name: 'is_registration'
                            },
                            columns:4,
                            bind:{
                                value:'{formModel.is_registration}'
                            },
                            fieldLabel: '协助预约挂号',
                            items: [
                                {boxLabel: '是', inputValue: '1'},
                                {boxLabel: '否', inputValue: '2'}
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            defaults: {
                                name: 'is_claim'
                            },
                            columns:4,
                            bind:{
                                value:'{formModel.is_claim}'
                            },
                            fieldLabel: '快速报销',
                            items: [
                                {boxLabel: '是', inputValue: '1'},
                                {boxLabel: '否', inputValue: '2'}
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            bind:'{formModel.tel}',
                            fieldLabel: '服务电话'
                        },
                        {
                            xtype: 'textfield',
                            bind:'{formModel.order_cprt}',
                            fieldLabel: '商保排序',
                            regex: /^[0-9]\d*$/,
                            regexText:"商保排序只能由0-9数字组成！"
                        }
                    ]
                },
                {
                    xtype: 'textareafield',
                    bind:'{formModel.registrationremark}',
                    fieldLabel: '预约挂号描述'
                },
                {
                    xtype: 'textareafield',
                    bind:'{formModel.claimremark}',
                    fieldLabel: '快捷报销服务'
                }
            ]
        },
        {
            //上传图片隐藏域
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
    ]
});