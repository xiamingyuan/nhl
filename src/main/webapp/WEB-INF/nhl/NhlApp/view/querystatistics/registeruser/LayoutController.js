/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.querystatistics.registeruser.LayoutController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pivotlayout',
    init:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore();
    },
    subtotalsHandler: function(button, checked){
        if(!checked) {
            return;
        }

        // reconfigure the pivot grid with new settings
        this.getView().reconfigurePivot({
            rowSubTotalsPosition: button.text.toLowerCase(),
            colSubTotalsPosition: button.text.toLowerCase()
        });
    },

    totalsHandler: function(button, checked){
        if(!checked) {
            return;
        }

        // reconfigure the pivot grid with new settings
        this.getView().reconfigurePivot({
            rowGrandTotalsPosition: button.text.toLowerCase(),
            colGrandTotalsPosition: button.text.toLowerCase()
        });
    },

    expandAll: function(){
        this.getView().expandAll();
    },

    collapseAll: function(){
        this.getView().collapseAll();
    }
});