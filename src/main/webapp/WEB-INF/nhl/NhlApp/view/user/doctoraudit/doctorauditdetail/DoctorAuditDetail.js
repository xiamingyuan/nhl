/**
 * Created by apple on 2017/3/31.
 */
Ext.define("NhlApp.view.user.doctoraudit.doctorauditdetail.DoctorAuditDetail", {
    extend: "Ext.panel.Panel",
    alias: 'widget.user_doctorauditdetail',
    requires: [
        'NhlApp.view.user.doctoraudit.doctorauditdetail.DoctorAuditDetailController',
        'NhlApp.view.user.doctoraudit.doctorauditdetail.DoctorAuditDetailModel'
    ],
    controller: 'user_doctorauditdetail',
    viewModel: {
        type: 'user_doctorauditdetail'
    },
    width : '100%',
    iconCls:"fa fa-home",
    bodyPadding: 10,
    scrollable:'y',
    title: '当前位置：医生审核详情',
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
                height:240
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
                //         },
                //         {
                //             xtype: 'displayfield',
                //             fieldLabel: '身份证号',
                //             bind: '{doctor_IdNumber}',
                //             text: '身份证号：',
                //             height:30
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
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '医师执业证号',
                            bind: '{doctor_Practicecert_Num}',
                            height:30
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
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '资格证号',
                            bind: '{doctor_Titlecert_Num}',
                            height:30
                        }
                    ]
                }
            ]
        },
        {
            title: '',
            xtype: 'form',
            cls:'detailsForm',
            margin: '0 0 10 0',
            layout: {
                type: 'table',
                columns: 6,
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
                text: '审核人：'
            }, {
                bind: '{auditor}'
            }, {
                text: '审核时间：'
            }, {
                bind: '{audittimeF}'
            },{
                text: '审核状态：'
            }, {
                bind: '{authenstatusF}'
            },{
                text: '拒绝原因：'
            }, {
                bind: '{reason}',
                colspan:5
            },{
                text: '审核说明：'
            }, {
                bind: '{note}',
                colspan:5
            }]
        }
    ],
    buttons: [
        '->',
        {
            text: '返回',
            handler: 'back'
        }
    ],
    listeners: {
        afterrender:'afterrender'
    }
});