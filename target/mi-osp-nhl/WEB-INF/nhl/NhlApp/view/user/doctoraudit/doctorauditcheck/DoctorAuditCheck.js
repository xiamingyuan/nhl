/**
 * Created by apple on 2017/3/31.
 */
/**
 * Created by apple on 2017/3/31.
 */
Ext.define("NhlApp.view.user.doctoraudit.doctorauditcheck.DoctorAuditCheck", {
    extend: "Ext.panel.Panel",
    alias: 'widget.user_doctorauditcheck',
    requires: [
        'NhlApp.view.user.doctoraudit.doctorauditcheck.DoctorAuditCheckController',
        'NhlApp.view.user.doctoraudit.doctorauditcheck.DoctorAuditCheckModel'
    ],
    controller: 'user_doctorauditcheck',
    viewModel: {
        type: 'user_doctorauditcheck'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：医生审核处理',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype:'cisgrid',
            id:'doctorauditcheck',
            width:380,
            isPage:false,
            columnLines: true,
            multiColumnSort:true,//禁止多列排序
            bind: {
                store: '{gridstore}'
            },
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                { text: '用户名',width: 100, dataIndex: 'loginname',align:'center'},
                { text: '姓名',width: 100, dataIndex: 'doctor_RealName', align: 'center' },
                { text: '申请时间',width: 140, dataIndex: 'createTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') }
            ],
            listeners:{
                select:'select'
            }
        },
        {
            xtype:'panel',
            flex:1,
            margin: '0 0 0 10',
            scrollable:'y',
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    title: '',
                    xtype: 'form',
                    cls:'detailsForm',
                    margin: '0 0 10 0',
                    layout: {
                        type: 'table',
                        columns: 8,
                        tableAttrs: {　　//在这儿控制table标签中的Attrs属性
                            border: 0,
                            cellpadding: 5,
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
                        bind: '{doctor_RealName}'
                    }, {
                        text: '性别：'
                    }, {
                        bind: '{doctor_GenderF}'
                    },{
                        text: '年龄：'
                    }, {
                        bind: '{doctor_AgeF}'
                    },{
                        text: '电话号：'
                    }, {
                        bind: '{loginname}'
                    }, {
                        text: '职称：'
                    }, {
                        bind: '{doctor_Title}'
                    }, {
                        text: '申请时间：'
                    }, {
                        bind: '{createTimeF}'
                    }, {
                        text: '医院：'
                    }, {
                        bind: '{doctor_Hospital_Name}'
                    }, {
                        text: '科室：'
                    }, {
                        bind: '{doctor_Depart_Name}'
                    }, {
                        text: '简介：'
                    }, {
                        bind: '{doctor_Introduction}',
                        colspan:7
                    }, {
                        text: '擅长：'
                    }, {
                        bind: '{doctor_Specialty}',
                        colspan:7
                    }]
                },
                {
                    title: '',
                    margin: '0 0 10 0',
                    layout: 'column',
                    defaults: {
                        margin: '0 10 0 0',
                        xtype:'form',
                        columnWidth: 0.25,
                        layout: {
                            type: 'vbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        width: '100%',
                        height:200
                    },
                    items: [
                        // {
                        //     items: [
                        //         {
                        //             xtype: 'label',
                        //             text: '身份证',
                        //             height:20
                        //         },
                        //         {
                        //             xtype: 'image',
                        //             height: 180,
                        //             bind:{
                        //                 src: '{idcard_imgF}'
                        //             }
                        //         }
                        //     ]
                        // },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    text: '医师执业证',
                                    height:20
                                },
                                {
                                    xtype: 'image',
                                    height: 180,
                                    bind:{
                                        src: '{practiceCertF}'
                                    }
                                }
                            ]
                        },
                        // {
                        //     items: [
                        //         {
                        //             xtype: 'label',
                        //             text: '医师执业证变更页',
                        //             height:20
                        //         },
                        //         {
                        //             xtype: 'image',
                        //             height: 180,
                        //             bind:{
                        //                 src: '{practice_change_imgF}'
                        //             }
                        //         }
                        //     ]
                        // },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    text: '资格证',
                                    height:20
                                },
                                {
                                    xtype: 'image',
                                    height: 180,
                                    bind:{
                                        src: '{qualificationCertF}'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '',
                    xtype: 'panel',
                    // margin: '0 0 10 0',
                    defaults: {
                        xtype: 'form',
                        labelWidth:55,
                        width:415,
                        labelAlign:'right'
                    },
                    items: [
                        // {
                        //     xtype: 'textfield',
                        //     name: 'textfield1',
                        //     fieldLabel: '身份证号',
                        //     bind:'{idNumber}'
                        // },
                        // {//暂时先隐藏 后续加上
                        //     xtype: 'textfield',
                        //     name: 'textfield1',
                        //     fieldLabel: '执业证号',
                        //     bind:'{practicecert_num}'
                        // },
                        // {
                        //     xtype: 'textfield',
                        //     name: 'textfield1',
                        //     fieldLabel: '资格证号',
                        //     bind:'{titlecert_num}'
                        // },
                        {
                            xtype: 'textareafield',
                            name: 'textfield1',
                            bind:'{note}',
                            height:80,
                            fieldLabel: '审核意见'
                        }
                        // {
                        //     xtype: 'checkbox',
                        //     id:'msgNotice',
                        //     name: 'checkbox',
                        //     checked:true,
                        //     fieldLabel: '短信通知'
                        // }
                        // {
                        //     xtype: 'checkboxfield',
                        //     name: 'checkbox',
                        //     value: '',
                        //     fieldLabel: '是否管理员'
                        // }
                    ]
                }
            ],
            buttons: [
                '->',
                {
                    xtype:'permissionbutton',
                    permission:'doctorauditDeal',
                    text: '通过',
                    handler: 'updateauthenstatusSucc'
                },
                {
                    xtype:'permissionbutton',
                    permission:'doctorauditDeal',
                    text: '拒绝',
                    handler: 'updateauthenstatusFail'
                },
                {
                    xtype:'permissionbutton',
                    permission:'doctorauditDeal',
                    text: '放弃任务',
                    handler: 'giveUpTask'
                }
            ]

        }
    ],
    buttons: [
        {
            xtype: 'label',
            bind:"总计：{tasknum} 条"
        },
        '->',
        {
            xtype:'permissionbutton',
            permission:'doctorauditDeal',
            text: '放弃全部',
            handler: 'giveUpAllTask'
        },
        {
            text: '返回',
            handler: 'back'
        }
    ],
    listeners: {
        afterrender:'afterrender'
    }
});