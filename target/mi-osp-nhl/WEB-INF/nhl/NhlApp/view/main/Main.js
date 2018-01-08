/**
 * Created by localadmin on 17/3/20.
 */
Ext.define('NhlApp.view.main.Top', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
        'NhlApp.view.sys.suspend.Suspend'
    ],
    xtype: 'NhlApp-top',
    border: false,
    frame: false,
    height: 48,
    padding: 0,
    cls: 'cisapp-main-top',
    defaults: {
        style: {
            backgroundColor: 'transparent'
        },
        focusable: false,
        border: 0,
        listeners: {
            mouseover: function () {
                if (this.menu && this.menu.hidden) {
                    this.showMenu();
                }
            }
        }
    },
    items: [{
        xtype: 'label',
        html: [
            '<span class="main-top-span">',
            // '<div class="main-top-logo">',
            // '<img src="image/logo.png" width="30" height="30" style="margin-top: 2px;" alt="logo" />',
            // '</div>',
            '<div class="main-top-title">新健康后台管理系统</div>',
            '</span>'
        ]
    },
    '->',
    {
        xtype: 'button',
        cls:'suspendBtn',
        text: '<i class="fa fa-user-o"></i>&nbsp您好,'+Ext.getDom('username').value,
        menu: {
            xtype: 'menu',
            items: [
                {
                    xtype: 'fmsys_suspend'
                }
            ],
            listeners: {
                mouseleave: function () {
                    this.hide();
                }
            }
        }
    },
     {
        xtype: 'button',
        enableToggle: true,
        toggleHandler: 'toggleMenu',
        scale: 'medium',
        width: 30,
        cls: 'main-left-panel-togglemenu',
        iconCls:'fa fa-align-justify',
        overCls: '',
        focusCls: ''
    }]
});

Ext.define('NhlApp.view.main.Left', {
    extend: 'Ext.panel.Panel',
    xtype: 'NhlApp-mainleft',
    requires: [

    ],
    padding: 0,
    title:'',
    border: false,
    scrollable: 'y',
    collapsible: false,
    cls: 'main-left-panel',
    width: 190,
    items: [{
        xtype: 'treelist',
        store: Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: 'navitems',
                method: 'GET'
            },
            autoLoad:true
        }),
        ui: "nav",
        singleExpand: true,
        expanderOnly: false,
        micro:false,
        listeners: {
            itemclick: 'leftMenuItemClick'
        },
        defaults: {
            xtype: 'treelistitem',
            isSelectionEvent: function (e) {
                var me = this,
                    owner = this.getOwner();

                owner.fireEvent('itemclick', owner, me.getNode());
                return false;
            }
        }
        // floatItem: function (item, byHover) {
        //     var me = this,
        //         floater;
        //
        //     if (item.getFloated()) {
        //         return;
        //     }
        //
        //     me.unfloatAll();
        //
        //     me.activeFloater = floater = item;
        //     me.floatedByHover = byHover;
        //
        //     item.setFloated(true);
        //
        //     if (byHover) {
        //         item.getToolElement().on('mouseleave', me.checkForMouseLeave, me);
        //         floater.element.on('mouseleave', me.checkForMouseLeave, me);
        //     } else {
        //         Ext.on('mousedown', me.checkForOutsideClick, me);
        //     }
        //
        //     //修正IE下不影藏浮动菜单的问题
        //     //if (Ext.isIE()) {
        //     floater.element.on('mouseout', me.checkForMouseLeave, me);
        //     //}
        // }
    }]
});
//
Ext.define("NhlApp.view.main.con", {
    extend: 'Ext.panel.Panel',
    xtype: 'NhlApp-maintab',
    id: "ViewPortCoreTab",
    autoScroll: false,
    //分辨率不能低于1024
    minWidth: 800,
    //tabPosition: "left",
    cls: 'NhlApp-maincon',
    //ui: "cis",
    layout:'fit',
    items: [
        {
            id: 'main_con',
            menuId: 0,
            title: "123",
            xtype: 'container',
            border: false,
            frame: false,
            hidden: true
        }
    ]
});

Ext.define('NhlApp.view.main.Bottom', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'NhlApp-mainbottom',
    border: 0,
    frame: false,
    items: [{
        xtype: 'label',
        style: {
            'font-size': '12px',
            'text-align': 'center',
            'line-height': '30px',
            'color':'#999',
            'width':'100%'
        },
        text: 'Copyright©2016 www.cis.com.cn All rights reserved.'
    }]
});


Ext.define('NhlApp.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        "NhlApp.view.main.MainController",
        "NhlApp.view.main.MainModel"
    ],
    xtype: 'NhlApp-main',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: {
        type: 'border'
    },
    listeners: {
        afterRender: 'mainRender',
        resize: 'mainResize'
    },
    items: [{
        xtype: 'NhlApp-top',
        region: 'north',
        split: false
    },
    {
        xtype: 'NhlApp-mainleft',
        region: 'west',
        split: false
    }, {
        xtype: 'NhlApp-maintab',
        id:"NhlApp-maintab",
        region: "center"
    }, {
        xtype: 'NhlApp-mainbottom',
        region: 'south',
        border: 1,
        style:{
            'border-color': '#b2b2b2',
            background: '#cccccc'
        }
    }]
});
