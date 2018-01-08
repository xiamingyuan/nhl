/**
 * Created by localadmin on 17/4/10.
 */
Ext.define('departListModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'description',  type: 'string'},
        {name: 'medicalDepartName', type: 'string'}
    ]
});
Ext.define("NhlApp.view.system.hospitaldepartment.hospitaldepartmentdetail.HospitalDepartmentDetail", {
    extend: "Ext.panel.Panel",
    alias: 'widget.hospitaldepartment_hospitaldepartmentdetail',
    requires: [
        'NhlApp.view.system.hospitaldepartment.hospitaldepartmentdetail.HospitalDepartmentDetailController',
        'NhlApp.view.system.hospitaldepartment.hospitaldepartmentdetail.HospitalDepartmentDetailModel'
    ],
    controller: 'hospitaldepartment_hospitaldepartmentdetail',
    viewModel: {
        type: 'hospitaldepartment_hospitaldepartmentdetail'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：医院及科室详情',
    defaults: {
        bodyPadding: 10,
        scrollable: 'y'
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
                        bind: '{name}'
                    }, {
                        text: '医院简称：'
                    }, {
                        bind: '{shortname}'
                    }, {
                        text: '医院级别：'
                    }, {
                        bind: '{level_F}'
                    }, {
                        text: '医院类型：'
                    }, {
                        bind: '{typeF}'
                    }, {
                        text: '医院电话：'
                    }, {
                        bind: '{phone}'
                    }, {
                        text: '医院网址：'
                    }, {
                        bind: '{url}'
                    }, {
                        text: '海虹合作：'
                    }, {
                        bind: '{ispartnerF}'
                    }, {
                        text: '投资方式：'
                    }, {
                        bind: '{jointmethodF}'
                    }, {
                        text: '经度：'
                    }, {
                        bind: '{longitude}'
                    }, {
                        text: '纬度：'
                    }, {
                        bind: '{latitude}'
                    }, {
                        text: '医院编码：'
                    }, {
                        bind: '{code}'
                    }, {
                        text: '医院logo：',
                        rowspan: 4
                    }, {
                        xtype:'image',
                        width: 100,
                        height: 100,
                        bind:{
                            src: '{logoF}'
                        },
                        rowspan: 4
                    }, {
                        text: '医院地址：'
                    }, {
                        bind: '{address}',
                        colspan:3
                    }, {
                        text: '所在地区：'
                    }, {
                        bind: '{provincename}{cityname}{districtname}'
                    }, {
                        text: '描述：'
                    }, {
                        bind: '{describe}',
                        colspan:5
                    }, {
                        text: '医院特色：'
                    }, {
                        bind: '{characteristic}',
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
                        text: '是否可以预约：'
                    }, {
                        bind: '{is_appointmentF}'
                    }, {
                        text: '预约排序：'
                    }, {
                        bind: '{order_hspt}'
                    }, {
                        text: '协助预约挂号：'
                    }, {
                        bind: '{is_registrationF}'
                    }, {
                        text: '预约挂号描述：'
                    }, {
                        bind: '{registrationremark}',
                        colspan:5
                    }, {
                        text: '服务电话：'
                    }, {
                        bind: '{tel}',
                        colspan:5
                    }, {
                        text: '快速报销：'
                    }, {
                        bind: '{is_claimF}'
                    }, {
                        text: '商保合作：'
                    }, {
                        bind: '{cprt_flagF}'
                    }, {
                        text: '常驻：'
                    }, {
                        bind: '{is_permanentF}'
                    }, {
                        text: '快捷报销服务：'
                    }, {
                        bind: '{claimremark}',
                        colspan:5
                    }, {
                        text: '商保排序：'
                    }, {
                        bind: '{order_cprt}',
                        colspan:5
                    }]
                }
            ]
        },
        {
            items:[
                {
                    xtype:'grid',
                    id:'departList',
                    columnLines: true,
                    emptyText:'暂无数据',
                    columns: [
                        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40},//创建序号
                        { text: '名称', sortable: false, dataIndex: 'name', width: 200 },
                        { text: '描述',sortable: false, dataIndex: 'description', flex: 1, align: 'center'},
                        { text: '专业科室',sortable: false, dataIndex: 'medicalDepartName', width: 200, align: 'center' }
                    ],
                    store: Ext.create('Ext.data.Store', {
                        model: 'departListModel',
                        proxy: {
                            type: 'ajax',
                            method:'GET',
                            // extraParams: {
                            //     id: Ext.History.getToken().split("?")[1]
                            // },
                            url: 'queryhospitaldepartlist',
                            reader: {
                                type: 'json',
                                rootProperty: 'data.result'
                            }
                        },
                        autoLoad: true
                    })
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
        afterrender: 'afterrender'
    }
});