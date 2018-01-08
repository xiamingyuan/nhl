/**
 * Created by apple on 2017/3/20.
 */
Ext.define('NhlApp.view.sys.suspend.Suspend', {
    extend: 'Ext.container.Container',
    requires: [
        'NhlApp.view.sys.suspend.SuspendController',
        'NhlApp.view.sys.suspend.SuspendModel'
    ],
    alias: 'widget.fmsys_suspend',
    controller: 'fmsys_suspend',
    viewModel: 'fmsys_suspend',
    layout: 'column',
    width: 120,
    defaults: {
        width: '100%',
        labelWidth: 30,
        labelAlign: 'right',
        padding: '6 0 0 0',
        height: 29
    },
    showModifyPwd: true,//是否显示修改密码
    showHelpDoc: false,//是否显示帮助文档
    initComponent: function () {
        var me = this;

        me.items = [];
        if (me.showModifyPwd) {
            me.items.push({
                xtype: 'label',
                html: '<i class="fa fa-pencil"></i>修改密码',
                cls: 'x_single_listitem x-panel-split-bottom',
                handler: 'modifyPwd'
            });
        }
        me.items.push({
            xtype: 'label',
            html: '<a href="logout"><i class="fa fa-sign-out"></i>注销</a>',
            cls: 'x_single_listitem x-panel-split-bottom loginOut'
        });
        me.callParent(arguments);
    }
});
