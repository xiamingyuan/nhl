/**
 * Created by localadmin on 17/4/10.
 */
Ext.define("NhlApp.view.system.doctorgroup.doctorgroupdetail.DoctorGroupDetail", {
    extend: "Ext.panel.Panel",
    alias: 'widget.doctorgroup_doctorgroupdetail',
    requires: [
        'NhlApp.view.system.doctorgroup.doctorgroupdetail.DoctorGroupDetailController',
        'NhlApp.view.system.doctorgroup.doctorgroupdetail.DoctorGroupDetailModel'
    ],
    controller: 'doctorgroup_doctorgroupdetail',
    viewModel: {
        type: 'doctorgroup_doctorgroupdetail'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：医院及科室详情',
    defaults: {
        bodyPadding: 10
    },
    scrollable: 'y',
    items:[
        {
            items: [
                {
                    xtype: 'form',
                    cls:'detailsForm',
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
                        text: '医院名称：'
                    }, {
                        bind: '{loginName}'
                    }, {
                        text: '医院简称：'
                    }, {
                        bind: '{realName}'
                    }, {
                        text: '医院级别：'
                    }, {
                        bind: '{birthday}'
                    }, {
                        text: '医院类型：'
                    }, {
                        bind: '{ageF}'
                    }, {
                        text: '医院电话：'
                    }, {
                        bind: '{genderF}'
                    }, {
                        text: '医院网址：'
                    }, {
                        bind: '{mobilePhone}'
                    }, {
                        text: '海虹合作：'
                    }, {
                        bind: '{email}'
                    }, {
                        text: '投资方式：'
                    }, {
                        bind: '{registerTimeF}'
                    }, {
                        text: '经度：'
                    }, {
                        bind: '{loginName}'
                    }, {
                        text: '纬度：'
                    }, {
                        bind: '{realName}'
                    }, {
                        text: '医院编码：'
                    }, {
                        bind: '{birthday}'
                    }, {
                        text: '医院logo：',
                        rowspan: 4
                    }, {
                        xtype:'image',
                        width: 90,
                        height: 90,
                        bind:{
                            src: '{avatarF}'
                        },
                        rowspan: 4
                    }, {
                        text: '医院地址：'
                    }, {
                        bind: '{genderF}',
                        colspan:3
                    }, {
                        text: '所在地区：'
                    }, {
                        bind: '{email}'
                    }, {
                        text: '描述：'
                    }, {
                        bind: '{loginName}',
                        colspan:5
                    }, {
                        text: '医院特色：'
                    }, {
                        bind: '{genderF}',
                        colspan:5
                    }]
                }
            ]
        },
        {
            items: [
                {
                    xtype: 'form',
                    cls:'detailsForm',
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
                        text: '是否可以预约：'
                    }, {
                        bind: '{loginName}'
                    }, {
                        text: '预约排序：'
                    }, {
                        bind: '{realName}'
                    }, {
                        text: '协助预约挂号：'
                    }, {
                        bind: '{birthday}'
                    }, {
                        text: '预约挂号描述：'
                    }, {
                        bind: '{birthday}',
                        colspan:5
                    }, {
                        text: '服务电话：'
                    }, {
                        bind: '{ageF}',
                        colspan:5
                    }, {
                        text: '快速报销：'
                    }, {
                        bind: '{email}'
                    }, {
                        text: '商保合作：'
                    }, {
                        bind: '{registerTimeF}'
                    }, {
                        text: '常驻：'
                    }, {
                        bind: '{isBlackF}'
                    }, {
                        text: '快捷报销服务：'
                    }, {
                        bind: '{isBlackF}',
                        colspan:5
                    }, {
                        text: '商保排序：'
                    }, {
                        bind: '{email}',
                        colspan:5
                    }]
                }
            ]
        },
        {
            items: [
                {
                    xtype: 'form',
                    cls:'detailsForm',
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
                        text: '名称：'
                    }, {
                        bind: '{loginName}'
                    }, {
                        text: '描述：'
                    }, {
                        bind: '{realName}'
                    }, {
                        text: '专业科室：'
                    }, {
                        bind: '{birthday}'
                    }]
                }
            ]
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

    }
});