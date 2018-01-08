/**
 * Created by localadmin on 17/4/12.
 */
Ext.define('detailMajorListModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'description',  type: 'string'}
    ]
});
Ext.define("NhlApp.view.system.schoolspecialty.schoolspecialtydetail.SchoolSpecialtyDetail", {
    extend: "Ext.panel.Panel",
    alias: 'widget.schoolspecialty_schoolspecialtydetail',
    requires: [
        'NhlApp.view.system.schoolspecialty.schoolspecialtydetail.SchoolSpecialtyDetailController',
        'NhlApp.view.system.schoolspecialty.schoolspecialtydetail.SchoolSpecialtyDetailModel'
    ],
    controller: 'schoolspecialty_schoolspecialtydetail',
    viewModel: {
        type: 'schoolspecialty_schoolspecialtydetail'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：学校及专业详情',
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
                        columns: 4,
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
                        text: '学校名称：'
                    }, {
                        bind: '{name}'
                    }, {
                        text: '学校电话：'
                    }, {
                        bind: '{phone}'
                    }, {
                        text: '所在地区：'
                    }, {
                        bind: '{province_name}{city_name}{district_name}'
                    }, {
                        text: '学校地址：'
                    }, {
                        bind: '{address}'
                    }, {
                        text: '描述：'
                    }, {
                        bind: '{description}',
                        colspan:3
                    }]
                }
            ]
        },
        {
            items:[
                {
                    xtype:'grid',
                    id:'detailMajorList',
                    emptyText:'暂无数据',
                    columnLines: true,
                    columns: [
                        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },//创建序号
                        { text: '专业名称', sortable: false, dataIndex: 'name', width: 200 },
                        { text: '专业描述',sortable: false, dataIndex: 'description', flex: 1}
                    ],
                    store: Ext.create('Ext.data.Store', {
                        model: 'detailMajorListModel',
                        proxy: {
                            type: 'ajax',
                            method:'GET',
                            // extraParams: {
                            //     id: Ext.History.getToken().split("?")[1]
                            // },
                            url: 'queryschooldepartlist',
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