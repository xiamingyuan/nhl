/**
 * Created by localadmin on 17/3/20.
 */
Ext.define('NhlApp.view.main.MainController', {
    extend: 'Nhl.base.MainController',

    alias: 'controller.main',
    xtypeStartWith: 'NhlApp',
    /**
     * 左菜单点击
     */
    leftMenuItemClick: function (view, record) {
        var me = this,
            treelist = view,
            record = record.get ? record : record.item.getNode();

        var _isLeaf = record.get('leaf') || false;
        if (_isLeaf) {
            Ext.History.add(record.get('id'));
        }
    }
});