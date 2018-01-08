/**
 * Created by localadmin on 17/3/30.
 */
Ext.define('blacklistmember', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'reason', type: 'string'},
        {name: 'operType',  type: 'string'},
        {name: 'operator_name', type: 'string'},
        {name: 'createTime',type: 'date',dateFormat : 'time'}
    ]
});
Ext.define('suggestmemberlist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'content', type: 'string'},
        {name: 'createTime',type: 'date',dateFormat : 'time'}
    ]
});

Ext.define("NhlApp.view.member.memberlist.memberdetail.MemberDetail", {
    extend: "Ext.tab.Panel",
    alias: 'widget.member_memberdetail',
    requires: [
        'NhlApp.view.member.memberlist.memberdetail.MemberDetailController',
        'NhlApp.view.member.memberlist.memberdetail.MemberDetailModel'
    ],
    controller: 'member_memberdetail',
    viewModel: {
        type: 'member_memberdetail'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：用户详情',
    defaults: {
        bodyPadding:'10 15',
        scrollable: 'y'
    },
    items: [
        {
            title: '基本信息',
            xtype: 'panel',
            items: [
                {
                    title: '基本信息',
                    iconCls:'fa fa-table',
                    xtype: 'form',
                    cls:'detailsForm',
                    margin: '0 0 10 0',
                    layout: {
                        type: 'table',
                        columns: 6,
                        tableAttrs: {　　//在这儿控制table标签中的Attrs属性
                            border: 0,
                            cellpadding: 5,
                            cellspacing: 1,
                            width: '100%',
                            align: 'center',
                            style: "border-collapse:collapse;margin:0 auto;"
                        },
                        tdAttrs: {}
                    },
                    defaults: {
                        xtype: 'label'
                    },
                    items: [{
                        text: '用户名/手机号：'
                    }, {
                        bind: '{loginName}'
                    }, {
                        text: '性别：'
                    }, {
                        bind: '{genderF}'
                    }, {
                        text: '身份证号：'
                    }, {
                        bind: '{idNumberF}'
                    },
                    //     {
                    //     text: '实名认证：'
                    // }, {
                    //     bind: '{authenstatusF}'
                    // },  {
                    //     text: '医保绑定：'
                    // }, {
                    //     bind: '{insuranceStatusF}'
                    // },
                        {
                        text: '出生日期：'
                    }, {
                        bind: '{birthdayF}'
                    }, {
                        text: '注册日期：'
                    }, {
                        bind: '{registerTimeF}'
                    }, {
                        text: '黑名单标志：'
                    }, {
                        bind: '{isBlackF}'
                    }]
                },
                {
                    title: '实名信息',
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
                        }
                    },
                    defaults: {
                        xtype: 'label'
                    },
                    items: [{
                        text: '姓名：'
                    }, {
                        bind: '{realName}'
                    }, {
                        text: '身份证号：'
                    }, {
                        bind: '{idNumberF}'
                    }, {
                        text: '性别：'
                    }, {
                        bind: '{genderF}'
                    },  {
                        text: '审核人：'
                    }, {
                        bind: '{auditor}'
                    }]
                },
                // {
                //     title: '医保绑定',
                //     iconCls: 'fa fa-table',
                //     margin: '0 0 10 0',
                //     xtype:'grid',
                //     emptyText:'暂无数据',
                //     columns: [
                //         { text: '医保卡号', sortable: false, dataIndex: 'insuranceId', flex: 1 },
                //         { text: '申请时间',sortable: false, dataIndex: 'reqTime', width: 100 },
                //         { text: '审核时间',sortable: false, dataIndex: 'audittime', width: 100 },
                //         { text: '审核结果',sortable: false, dataIndex: 'authenstatus', width: 100 },
                //         { text: '审核人',sortable: false, dataIndex: 'auditor', width: 140 ,align: 'center'}
                //     ]
                // },
                //暂时注释2017-4-10
                {
                    title: '黑名单记录',
                    hidden:!permission.memberblacklistList,
                    iconCls: 'fa fa-table',
                    margin: '0 0 10 0',
                    xtype:'grid',
                    id:'blackGrId',
                    emptyText:'暂无数据',
                    columns: [
                        { text: '序号', xtype: 'rownumberer', align: 'center', width: 50 },//创建序号
                        { text: '原因', sortable: false, dataIndex: 'reason', flex: 1 },
                        { text: '操作类型',sortable: false, dataIndex: 'operType', width: 100, align: 'center' ,renderer:function (val) {
                            if(val == '0'){
                                return "加入";
                            }else if(val == '1'){
                                return "移出";
                            }else {
                                return "";
                            }
                        }},
                        { text: '处理人',sortable: false, dataIndex: 'operator_name', width: 100, align: 'center' },
                        { text: '操作时间',sortable: false, dataIndex: 'createTime', width: 140 ,align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')}
                    ],
                    store: Ext.create('Ext.data.Store', {
                        model: 'blacklistmember',
                        proxy: {
                            type: 'ajax',
                            method:'GET',
                            // extraParams: {
                            //     id: Ext.History.getToken().split("?")[1]
                            // },
                            url: 'getblacklistbymemberid',
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
                    hidden:!permission.memberfeedbackList,
                    id:'suggestlistId',
                    iconCls: 'fa fa-table',
                    margin: '0 0 10 0',
                    xtype:'grid',
                    columnLines: true,
                    emptyText:'暂无数据',
                    columns: [
                        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },//创建序号
                        { text: '反馈内容', dataIndex: 'content', flex: 1 },
                        { text: '操作时间', dataIndex: 'createTime', width: 140 ,align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')}
                    ],
                    store: Ext.create('Ext.data.Store', {
                        model: 'suggestmemberlist',
                        proxy: {
                            type: 'ajax',
                            method:'GET',
                            // extraParams: {
                            //     id: Ext.History.getToken().split("?")[1]
                            // },
                            url: 'getsuggestlistbymemberid',
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        },
                        autoLoad: true
                    })
                }
            ]
        },
        // {
            // title: '实名认证',
            // xtype: 'panel',
            // bodyPadding:'10 15',
            // items:[
            //     {
            //         xtype: 'dataview',
            //         emptyText:'暂无数据',
            //         tpl: [
            //             // '<tpl for=".">',
            //
            //             '<div class="family-content clearfloat">',
            //                 '<div class="texts shimingrenzheng">',
            //                     '<ul class="approve">',
            //                         '<li style="overflow: hidden"><span class="colors">申请时间：</span><span>2017-01-21 19:04</span></li>',
            //                         '<li style="overflow: hidden"><span class="colors">审核时间：</span><span>2017-01-21 19:28</span></li>',
            //                         '<li style="overflow: hidden"><span class="colors">审核结果：</span><span>已认证</span></li>',
            //                         '<li style="overflow: hidden"><span class="colors">审核人：</span><span>klh-test</span></li>',
            //                         '<li style="overflow: hidden"><span class="colors">审核详情：</span><span>--</span></li>',
            //                     '</ul>',
            //                 '</div>',
            //                 '<div class="pics">',
            //                     '<div class=" center">',
            //                         '<span class="profile-picture">',
            //                             '<a href="downloadfile?dfsFile=group1/M00/00/D2/CnWCKViEiw-AZ6j-AABRo9oDoX4650.jpg&amp;userid=" target="_blank">',
            //                                 '<img src="downloadfile?dfsFile=group1/M00/00/D2/CnWCKViEiw-AZ6j-AABRo9oDoX4650.jpg&amp;userid=">',
            //                             '</a>',
            //                         '</span>',
            //                         '<span class="profile-picture">',
            //                             '<a href="downloadfile?dfsFile=group1/M00/00/D2/CnWCKViEiw-AOgFGAABZd5ZNKv4632.jpg&amp;userid=" target="_blank">',
            //                              '<img src="downloadfile?dfsFile=group1/M00/00/D2/CnWCKViEiw-AOgFGAABZd5ZNKv4632.jpg&amp;userid=">',
            //                             '</a>',
            //                         '</span>',
            //                     '</div>',
            //                 '</div>',
            //             '</div>',
            //             // '</tpl>'
            //         ],
            //         itemSelector: 'span.thumb-wrap'
            //     }
            // ]
            // hidden:true
            //暂时注释2017-4-10
        // },
        // {
            // title: '医保绑定',
            // xtype: 'panel',
            // bodyPadding:'10 15',
            // items:[
            //     {
            //         xtype: 'dataview',
            //         emptyText:'暂无数据',
            //         id:'auditCards',
            //         tpl: [
            //             '<tpl for=".">',
            //
            //             '<div class="family-content clearfloat">',
            //                 '<div class="texts shimingrenzheng">',
            //                     '<ul class="approve">',
            //                         '<li style="overflow: hidden"><span class="colors">医保卡号：</span><span>{name}</span></li>',
            //                         '<li style="overflow: hidden"><span class="colors">申请时间：</span><span>{reqTime}</span></li>',
            //                         '<li style="overflow: hidden"><span class="colors">审核时间：</span><span>{audittime}</span></li>',
            //                         '<li style="overflow: hidden"><span class="colors">审核结果：</span><span>{authenstatus}</span></li>',
            //                         '<li style="overflow: hidden"><span class="colors">审核人：</span><span>{auditor}</span></li>',
            //                         '<li style="overflow: hidden"><span class="colors">审核详情：</span><span>{authenstatus}</span></li>',
            //                     '</ul>',
            //                 '</div>',
            //                 '<div class="pics">',
            //                     '<div class=" center">',
            //                         '<span class="profile-picture">',
            //                             '<a href="downloadfile?dfsFile=group1/M00/00/D2/CnWCKViEiw-AZ6j-AABRo9oDoX4650.jpg&amp;userid=" target="_blank">',
            //                                 '<img src="downloadfile?dfsFile=group1/M00/00/D2/CnWCKViEiw-AZ6j-AABRo9oDoX4650.jpg&amp;userid=">',
            //                             '</a>',
            //                         '</span>',
            //                         '<span class="profile-picture">',
            //                             '<a href="downloadfile?dfsFile=group1/M00/00/D2/CnWCKViEiw-AOgFGAABZd5ZNKv4632.jpg&amp;userid=" target="_blank">',
            //                                 '<img src="downloadfile?dfsFile=group1/M00/00/D2/CnWCKViEiw-AOgFGAABZd5ZNKv4632.jpg&amp;userid=">',
            //                             '</a>',
            //                         '</span>',
            //                     '</div>',
            //                 '</div>',
            //             '</div>',
            //             '</tpl>'
            //         ],
            //         itemSelector: 'div.family-content',
            //         // store: role.store
            //     }
            // ]
            // hidden:true
            //暂时注释2017-4-10
        // },
        {
            title: '绑定信息',
            xtype: 'panel',
            items:[
                {
                    xtype:'grid',
                    emptyText:'暂无数据',
                    id:'clientBindsList',
                    columns: [
                        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },//创建序号
                        { text: '保险公司', sortable: false, dataIndex: 'insuranceCorp', flex: 1 },
                        { text: '保险产品名称',sortable: false, dataIndex: 'insuranceProductName', width: 300 },
                        { text: '会员',sortable: false, dataIndex: 'realName', width: 120 },
                        { text: '电话',sortable: false, dataIndex: 'mobilePhone', width: 120 },
                        { text: '身份证号',sortable: false, dataIndex: 'idNumber', width: 220 ,align: 'center'},
                        { text: '绑定状态',sortable: false, dataIndex: 'status', width: 120 ,align: 'center'}
                    ],
                    store: Ext.create('Ext.data.Store', {
                        fields: [
                            {name: 'insuranceCorp',type: 'string'},
                            {name: 'insuranceProductName',type: 'string'},
                            {name: 'realName',type: 'string'},
                            {name: 'mobilePhone',type: 'string'},
                            {name: 'idNumber',type: 'string'},
                            {name: 'status',type: 'int'}
                        ]
                    })
                }
            ]
            // hidden:true
        }
    ],
    buttons: [
        {
            xtype:'permissionbutton',
            permission:'memberResetpwd',
            text: '重置密码',
            handler: 'resetPswd'
        },
        {
            xtype:'permissionbutton',
            permission:'memberblacklistAdd',
            text: '加入黑名单',
            handler: 'addBlack',
            bind:{
                hidden:'{isBlack}'
            }
        },
        {
            xtype:'permissionbutton',
            permission:'memberblacklistRemove',
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
        afterrender: 'afterrender'
    }
});