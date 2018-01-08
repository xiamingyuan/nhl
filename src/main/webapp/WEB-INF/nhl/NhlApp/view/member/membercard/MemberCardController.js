/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.view.member.membercard.MemberCardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.member_membercard',
    requires: [

    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('detail')){
            me.showDetail(record.getId());
        }
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
    },
    showDetail:function (id) {
        Ext.History.add('membercard/detail/?'+id);
    }
});