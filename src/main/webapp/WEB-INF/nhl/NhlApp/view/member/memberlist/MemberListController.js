/**
 * Created by zd on 17/3/30.
 */
Ext.define('messagelist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'content', type: 'string'},
        {name: 'createTime',type: 'date',dateFormat : 'time'}
    ]
});

Ext.define('NhlApp.view.member.memberlist.MemberListController', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.member_memberlist',
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            ele = Ext.get(e.getTarget()),
            id = ele.getId();
        if(ele.hasCls('news')){
            me.news(record.getId());
        }else if(ele.hasCls('detail')){
            me.showDetail(record.getId());
        }
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        var queryKey = Ext.getCmp("queryKey").getValue();
        var sdate = Ext.getCmp("sdate").getValue();
        var edate = Ext.getCmp("edate").getValue();
        store.getProxy().extraParams = {
            queryKey: queryKey,
            sdate: sdate,
            edate: edate
        };
        store.loadPage(1);
    },
    news:function (id) {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        Ext.create('Ext.window.Window', {
            ghost:false,//弹层背景透明默认true
            id:'newsWin',
            autoShow: true,
            draggable : true,//禁止拖动
            resizable : false,//禁止缩放
            title: '发送消息',
            width: 650,
            height: 500,
            layout: 'fit',
            plain:true,
            modal:true,
            defaults: {
                scrollable: true
            },
            items: [
                {
                    xtype: 'panel',
                    items: [
                        {
                            margin: '0 0 10 0',
                            height:300,
                            xtype:'cisgrid',
                            isPage:true,//是否需要分页,
                            columnLines: true,
                            columns: [
                                { text: '序号', xtype: 'rownumberer', align: 'center', width: 50 },//创建序号
                                { text: '原因', sortable: false, dataIndex: 'content', flex: 1,renderer:function (val) {
                                    return Ext.decode(val).content;
                                }},
                                { text: '发送时间',sortable: false, dataIndex: 'createTime', width: 140 ,align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')}
                            ],
                            store: Ext.create('Ext.data.Store', {
                                model: 'messagelist',
                                proxy: {
                                    type: 'ajax',
                                    method:'GET',
                                    url: 'getmessage',
                                    extraParams: {
                                        receiverId: id,
                                        receiverType:"1",
                                        topicID:"v3_"+id,
                                        readStatus:""
                                    },
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'data.datas'
                                    }
                                },
                                autoLoad: true
                            })
                        },
                        {
                            xtype: 'form',
                            id:'newsForm',
                            cls:'detailsForm',
                            margin: '0 0 10 0',
                            defaults: {
                                xtype: 'form',
                                labelWidth:80,
                                labelAlign:'right'
                            },
                            items: [
                                {
                                    width:450,
                                    xtype: 'textfield',
                                    id:'newsText',
                                    name: 'newsText',
                                    fieldLabel: '消息标题',
                                    blankText : "消息标题不能为空！",
                                    allowBlank: false
                                },
                                {
                                    width:450,
                                    height:50,
                                    xtype: 'textareafield',
                                    id:'newsTextarea',
                                    name: 'newsTextarea',
                                    fieldLabel: '消息内容',
                                    blankText : "消息内容不能为空！",
                                    allowBlank: false,
                                    msgTarget: 'qtip'
                                }
                            ]
                        }
                    ]

                }
            ],
            buttons: [
                '->',
                {
                    text: '确定',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var newsText = Ext.getCmp('newsText').getValue(),
                            newsTextarea = Ext.getCmp('newsTextarea').getValue(),
                            window = Ext.getCmp('newsWin'),
                            form = Ext.getCmp('newsForm').getForm();
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'sendmessage',
                                    params: {userId: id,title:newsText,content:newsTextarea},
                                    method: 'GET',
                                    success: function (response, options) {
                                        if(response.status==200){
                                            window.close();
                                        }
                                    }
                                });
                            }
                        }
                    }
                },
                {
                    text: '取消',
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('newsWin');
                            window.close();
                        }
                    }
                }
            ]
        }).show();
    },
    showDetail:function (id) {
        Ext.History.add('memberlist/detail/?'+id);

    }
});