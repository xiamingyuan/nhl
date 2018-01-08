/**
 * Created by localadmin on 17/3/29.
 */
Ext.define('NhlApp.view.user.doctoraudit.DoctorAuditListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_doctoraudit',
    requires: [

    ],
    afterrender:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        me.taskNum = '';
        me.unCertCount = '';
        me.idList = [];
        Ext.Ajax.request({//获取当前任务数
            url: 'gettaskcount',
            params: {},
            method: 'GET',
            success: function (response, options) {
                if(response.status==200){
                    me.taskNum = JSON.parse(response.responseText).data;
                    vm.setData({taskNum:me.taskNum});
                }
            }
        });
        Ext.Ajax.request({//获取未审核数目
            url: 'getnotauthencount',
            params: {},
            method: 'GET',
            success: function (response, options) {
                if(response.status==200){
                    me.unCertCount = JSON.parse(response.responseText).data;
                    vm.setData({unCertCount:me.unCertCount});
                }
            }
        });
    },
    filter:function () {//查询列表
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
    },
    select:function (ele , record , The , eOpts) {//选中行
        var me = this,
            id = record.get('id'),
            len = me.idList.length,
            num = 0;
        if(len>0){
            for(var i=0; i<len; i++) {
                if(me.idList[i] != id) {
                    num++;
                }
            }
            if(num==len)
                me.idList.push(id);
        }else {
            me.idList.push(id);
        }
    },
    deselect:function (ele , record , The , eOpts) {//取消选中行
        var me = this,
            id = record.get('id');
        for(var i=0; i<me.idList.length; i++) {
            if(me.idList[i] == id) {
                me.idList.splice(i, 1);
                break;
            }
        }
    },
    CertCountChange:function () {//设置提取按钮是否禁用
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        var v = Ext.getCmp('CertCount').getValue();
        if(v>vm.getData().unCertCount||v==0){
            vm.setData({'unCertCountF':true})
        }else{
            vm.setData({'unCertCountF':false})
        }
    },
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this;
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('detail')){
            me.showDetail(record.getId());
        }
    },
    showDetail:function (id) {//详情页
        Ext.History.add('doctoraudit/detail/?'+id);
    },
    getextract:function () { //提取
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore(),
            extraParams = store.getProxy().extraParams,
            ids,count,prarms = {};
        ids = me.idList.join();
        var extractnum = Ext.getCmp('CertCount').getValue();

        if (extractnum != 0) {
            count = extractnum;
        }
        if (me.idList.length != 0 && me.idList != undefined) {
            count = me.idList.length;
        }
        if (count == 0) {
            Ext.MessageBox.alert('提示', '请勾选要提取的记录或者输入提取数量！');
            return;
        }
        prarms.ids = ids;
        prarms.extractednum = extractnum;
        prarms.loginName = extraParams.loginName;
        prarms.realName = extraParams.realName;
        prarms.hospital = extraParams.hospital;

        console.log(prarms)
        store.getSorters().each(function(sorter) {//获取排序信息
            prarms.tableOrderName = sorter.getProperty()=="default"?"":sorter.getProperty();
            prarms.tableOrderSort = sorter.getDirection()=="default"?"":sorter.getDirection();
        });
        Ext.MessageBox.confirm('提示', '确定提取' + count + '个任务开始处理？', function (btn) {
            if(btn=='yes'){
                if(me.idList.length>0){
                    Ext.Ajax.request({//获取当前任务数
                        url: 'getcertishandledcount',
                        params: {id: ids},
                        method: 'GET',
                        success: function (response, options) {
                            if(response.status==200){
                                var data = JSON.parse(response.responseText);
                                var isHandledCount = data.count;
                                if (isHandledCount > 0) {
                                    if (isHandledCount == me.idList.length) {
                                        Ext.MessageBox.alert('提示', '所选记录已被另一用户提取！');
                                        me.idList.idList = [];
                                        store.loadPage(1);
                                        return;
                                    } else {
                                        Ext.MessageBox.alert('提示', isHandledCount + '个任务已在处理中，提取' + (me.idList.length - isHandledCount) + '个任务');
                                    }
                                }
                                me.certextracted(prarms);
                            }
                        }
                    });
                }else{
                    me.certextracted(prarms);
                }
            }
        });
    },
    certextracted:function (prarms) {
        Ext.Ajax.request({
            url: 'extracted',
            params: prarms,
            method: 'POST',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    Ext.History.add('doctoraudit/check');
                }
            }
        });
    },
    jumphandle:function () {
        Ext.History.add('doctoraudit/check');
    }
});