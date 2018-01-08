/**
 * Created by apple on 2017/3/25.
 */
Ext.define('NhlApp.view.main.TreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tree-list',
    stores: {
        navItems: {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: '医略用户',
                    id:'user',
                    iconCls: 'fa fa-user-o',
                    children: [
                        {
                            text: '用户列表',
                            id: 'userlist',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '在线用户',
                            id: 'online',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '黑名单',
                            id: 'userblacklist',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '意见反馈',
                            id: 'userfeedback',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '消息发布',
                            id: 'message',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '医生审核',
                            id: 'doctoraudit',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        }
                    ]
                },{
                    text: '新健康用户',
                    id:'member',
                    iconCls: 'fa fa-user',
                    children: [
                        {
                            text: '用户列表',
                            id: 'memberlist',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        // {
                        //     text: '实名认证',
                        //     id: 'certification',
                        //     leaf: true,
                        //     iconCls: 'fa fa-angle-right'
                        // },
                        // {
                        //     text: '医保绑定',
                        //     id: 'micardbind',
                        //     leaf: true,
                        //     iconCls: 'fa fa-angle-right'
                        // },
                        {
                            text: '会员卡管理',
                            id: 'membercard',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '黑名单管理',
                            id: 'blacklist',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '意见反馈',
                            id: 'feedback',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        }
                    ]
                },{
                    text: '业务管理',
                    id:'business',
                    iconCls: 'fa fa-database',
                    children: [
                        {
                            text: '签约科室',
                            id: 'signdepart',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        }
                    ]
                },{
                    text: '基础信息',
                    id:'basicinfor',
                    iconCls: 'fa fa-info-circle',
                    children: [
                        {
                            text: '药品信息',
                            id: 'druginformation',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '话术管理',
                            id: 'sessionmanager',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        }
                    ]
                },{
                    text: '系统管理',
                    id:'system',
                    iconCls: 'fa fa-cogs',
                    children: [
                        {
                            text: '医院及科室维护',
                            id: 'hospitaldepartment',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        // {
                        //     text: '医生集团维护',
                        //     id: 'doctorgroup',
                        //     leaf: true,
                        //     iconCls: 'fa fa-angle-right'
                        // },
                        {
                            text: '专业系统维护',
                            id: 'specialtysystem',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '专业科室维护',
                            id: 'specialtydepartment',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '学校及专业维护',
                            id: 'schoolspecialty',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '城市维护',
                            id: 'citymaintenance',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '疾病查询',
                            id: 'disease',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '疾病分组',
                            id: 'diseasegroup',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        },
                        {
                            text: '字典数据维护',
                            id: 'dictionarydata',
                            leaf: true,
                            iconCls: 'fa fa-angle-right'
                        }
                    ]
                // },{
                //     text: '查询统计',
                //     id:'querystatistics',
                //     iconCls: 'fa fa-pie-chart',
                //     children: [
                //         {
                //             text: '注册用户统计',
                //             id: 'registeruserstatistics',
                //             leaf: true,
                //             iconCls: 'fa fa-angle-right'
                //         },
                //         {
                //             text: '医保认证统计',
                //             id: 'medicalinsurancestatistics',
                //             leaf: true,
                //             iconCls: 'fa fa-angle-right'
                //         }
                //     ]
                }]
            }
        }
    }
});