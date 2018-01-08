/**
 * Created by apple on 2017/3/30.
 */
Ext.define("NhlApp.view.user.message.messagedetail.MessageDetail", {
    extend: "Ext.panel.Panel",
    alias: 'widget.user_messagedetail',
    requires: [
        'NhlApp.view.user.message.messagedetail.MessageDetailController',
        'NhlApp.view.user.message.messagedetail.MessageDetailModel'
    ],
    controller: 'user_messagedetail',
    viewModel: {
        type: 'user_messagedetail'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：消息发布详情',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            title: '',
            xtype: 'form',
            bodyPadding: '10 10 0',
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
                }
            },
            defaults: {
                xtype: 'label'
            },
            items: [{
                text: '消息标题：'
            }, {
                bind: '{title}'
            }, {
                text: '状态：'
            }, {
                bind: '{status}'
            }, {
                text: '发送范围：'
            }, {
                bind: '{isAllUser}'
            }, {
                text: '发送时间：'
            }, {
                bind: '{publishTime}'
            }, {
                text: '发布时间：'
            }, {
                bind: '{createTime}'
            }, {
                text: '取消时间：'
            }, {
                bind: '{lastModifyTime}'
            }, {
                text: '发布人：'
            }, {
                bind: '{creatorName}'
            }, {
                text: '取消人：'
            }, {
                bind: '{lastModifierName}'
            }, {
                text: ''
            }, {
                bind: ''
            }, {
                text: '消息内容：',
                height: 70,style:"display:block;line-height:70px;"
            }, {
                bind: '好的',
                colspan:5
            }]
        },
        {
            flex:1,
            xtype:'cisgrid',
            isPage:true,//需要分页
            style: {
                border:'1px solid #f6f6f6'
            },
            bind: {
                store: '{gridstore}'
            },
            border:true,
            multiColumnSort:true,//禁止多列排序
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 50,height:30 },//创建序号
                { text: '用户名',flex:1, dataIndex: 'userName'},
                { text: '姓名',width: 100, dataIndex: 'name', align: 'center' },
                { text: '是否送达',width:'60', dataIndex: 'isSucSend', align: 'center',renderer:function (val) {
                    if (val == "1") {
                        return "已送达";
                    } else {
                        return "未送达";
                    }
                } },
                { text: '实际发送时间',width: 140, dataIndex: 'sendTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
                { text: '阅读',width: 50, dataIndex: 'read', align: 'center' ,renderer:function (val) {//转换性别
                    if (val == "1") {
                        return "√";
                    } else {
                        return "";
                    }
                }},
                { text: '阅读时间',width: 140, dataIndex: 'readTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
                { text: '注册时间',width: 140, dataIndex: 'registerTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },

            ],
            buttons: [
                {
                    text: '返回',
                    handler: 'back'
                }
            ]
        }
    ]
});