/**
 * Created by apple on 2017/3/28.
 */
Ext.define('blacklist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'reason', type: 'string'},
        {name: 'operType',  type: 'string'},
        {name: 'operator_name', type: 'string'},
        {name: 'createTime',type: 'date',dateFormat : 'time'}
    ]
});
Ext.define('suggestlist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'content', type: 'string'},
        {name: 'createTime',type: 'date',dateFormat : 'time'}
    ]
});
Ext.define("NhlApp.view.user.userlist.userdetail.UserDetail", {
    extend: "Ext.tab.Panel",
    alias: 'widget.user_userdetail',
    requires: [
        'NhlApp.view.user.userlist.userdetail.UserDetailController',
        'NhlApp.view.user.userlist.userdetail.UserDetailModel'
    ],
    controller: 'user_userdetail',
    viewModel: {
        type: 'user_userdetail'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：用户详情',
    defaults: {
        bodyPadding:'10 15',
        xtype: 'panel',
        scrollable: 'y'
    },
    items: [
        {
            title: '基本信息',
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
                        },
                        tdAttrs: {　　//控制td标签的属性，以上用法都是在ext的api中查到，同样的方式可以给tr添加属性
                            // width: '100px',
                            // height: '40px',
                            // style: "padding:5px",
                            // valign: 'middle'
                        }
                    },
                    defaults: {
                        xtype: 'label'
                    },
                    items: [{
                        text: '用户名：'
                    }, {
                        bind: '{loginName}'
                    }, {
                        text: '姓名：'
                    }, {
                        bind: '{realName}'
                    }, {
                        text: '生日：'
                    }, {
                        bind: '{birthdayF}'
                    }, {
                        text: '头像：',
                        rowspan: 3
                    }, {
                        xtype:'image',
                        width: 90,
                        height: 90,
                        bind:{
                            src: '{avatarF}'
                        },
                        rowspan: 3
                    }, {
                        text: '年龄：'
                    }, {
                        bind: '{ageF}'
                    }, {
                        text: '性别：'
                    }, {
                        bind: '{genderF}'
                    }, {
                        text: '手机号：'
                    }, {
                        bind: '{mobilePhone}'
                    }, {
                        text: '邮箱：'
                    }, {
                        bind: '{email}'
                    }, {
                        text: '注册时间：'
                    }, {
                        bind: '{registerTimeF}'
                    }, {
                        text: '黑名单用户：'
                    }, {
                        bind: '{isBlackF}'
                    }]
                },
                {
                    title: '黑名单记录',
                    hidden:!permission.userblacklistList,
                    iconCls: 'fa fa-table',
                    margin: '0 0 10 0',
                    xtype:'grid',
                    id:'blackGrid',
                    columnLines: true,
                    emptyText:'暂无数据',
                    columns: [
                        { text: '序号', xtype: 'rownumberer', align: 'center', width: 50 },//创建序号
                        { text: '原因', sortable: false, dataIndex: 'reason', flex: 1 },
                        { text: '操作类型',sortable: false, dataIndex: 'operType',align: 'center', width: 100,renderer:function (val) {
                            if(val=="0"){
                                return "加入";
                            }else if(val=="1"){
                                return "移出";
                            }else {
                                return "";
                            }
                        } },
                        { text: '处理人',sortable: false, dataIndex: 'operator_name', width: 100 },
                        { text: '操作时间',sortable: false, dataIndex: 'createTime', width: 140 ,align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')}
                    ],
                    store: Ext.create('Ext.data.Store', {
                        model: 'blacklist',
                        proxy: {
                            type: 'ajax',
                            method:'GET',
                            extraParams: {
                                id: ''
                            },
                            url: 'getblacklistbyuserid',
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        },
                        autoLoad: true
                    })
                },
                {
                    title: '意见反馈',
                    hidden:!permission.userfeedbackList,
                    iconCls: 'fa fa-table',
                    margin: '0 0 10 0',
                    xtype:'grid',
                    id:'suggestGrid',
                    columnLines: true,
                    emptyText:'暂无数据',
                    columns: [
                        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },//创建序号
                        { text: '反馈内容', sortable: false, dataIndex: 'content', flex: 1 },
                        { text: '操作时间',sortable: false, dataIndex: 'createTime', width: 140 ,align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')}
                    ],
                    store: Ext.create('Ext.data.Store', {
                        model: 'suggestlist',
                        proxy: {
                            type: 'ajax',
                            method:'GET',
                            extraParams: {
                                id: ''
                            },
                            url: 'getsuggestlistbyuserid',
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        },
                        // autoLoad: true
                    })
                }
            ]

        },
        {
            title: '扩展信息',
            items: [
                {
                    xtype: 'form',
                    cls:'detailsForm',
                    margin: '0 0 10 0',
                    layout: {
                        type: 'table',
                        columns: 6,
                        tableAttrs: {　　//在这儿控制table标签中的Attrs属性
                            border: 0,
                            width: '100%',
                            align: 'center',
                            style: "border-collapse:collapse;margin:0 auto;"
                        }
                    },
                    defaults: {
                        xtype: 'label'
                    },
                    items:[
                        {text: '医院名称：'},
                        {bind: '{hospitalName}'},
                        {text: '医院科室：'},
                        {bind: '{hospitalDepartName}',colspan:3},
                        {text: '职称：'},
                        {bind: '{title}'},
                        {text: '职务：'},
                        {bind: '{duty}'},
                        {text: '学历：'},
                        {bind: '{educationLevel}'},
                        {text: '擅长：',height: 70,style:"display:block;line-height:70px;"},
                        {bind: '{specialty}',colspan:5},
                        {text: '简介：',height: 70,style:"display:block;line-height:70px;"},
                        {bind: '{introduction}',colspan:5},
                        {text: '执业经历：',height: 70,style:"display:block;line-height:70px;"},
                        {bind: '{professional}',colspan:5}
                    ]
                }
            ]
        }
    ],
    buttons: [
        {
            xtype:'permissionbutton',
            permission:'userResetpwd',
            text: '重置密码',
            handler: 'resetPswd'
        },
        {
            xtype:'permissionbutton',
            permission:'userblacklistAdd',
            text: '加入黑名单',
            handler: 'addBlack',
            bind:{
                hidden:'{isBlack}'
            }
        },
        {
            xtype:'permissionbutton',
            permission:'userblacklistRemove',
            text: '移除黑名单',
            handler: 'addBlack',
            bind:{
                hidden:'{!isBlack}'
            }
        },'->',
        {
            text: '返回',
            handler: 'back'
        }
    ],
    listeners: {
        afterrender:'afterrender'
    }
});