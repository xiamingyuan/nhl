/**
 * Created by apple on 2017/3/30.
 */
Ext.define('NhlApp.store.user.message.MessageDetail', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_user_messagedetail',
    model: 'NhlApp.model.user.message.MessageDetail',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.user.message.MessageDetail'
    ],
    data:[
        {
            "isSucSend":"1",
            "level":null,
            "name":"医生·姓名·1",
            "personNum":null,
            "read":"0",
            "readTime":null,
            "registerTime":1486973034000,
            "sendTime":1487841964000,
            "userID":"74a80038-11dd-4baf-87ab-dd8f7a120017",
            "userName":"18610810518"
        },
        {
            "isSucSend":"1",
            "level":null,
            "name":"测医姓名",
            "personNum":null,
            "read":"0",
            "readTime":null,
            "registerTime":1486865183000,
            "sendTime":1487841964000,
            "userID":"24ba7fbb-2ece-446c-91f5-9ec46134b078",
            "userName":"18610810519"
        }
    ]
    // proxy: {
    //     type: 'ajax',
    //     url: 'getmsgplan',
    //     method: 'GET',
    //     extraParams: {
    //         beginDate:'',
    //         creatorName:'',
    //         endDate:'',
    //         receivePerson:'',
    //         sendBeginDate:'',
    //         sendEndDate:'',
    //         title:''
    //     },
    //     reader: {
    //         type: 'json',
    //         rootProperty: 'data.datas',//返回数据字段
    //         totalProperty : 'data.totalCount'
    //     }
    // },
    // sorters: [{//排序
    //     property: 'default',
    //     direction: 'default'
    // }]
});