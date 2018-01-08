/**
 * Created by apple on 2017/3/27.
 */
//重复密码验证
Ext.apply(Ext.form.VTypes, {
    repetition: function(val, field) {     //返回true，则验证通过，否则验证失败
        if (field.repetition) {               //如果表单有使用repetition配置，repetition配置是一个JSON对象，该对象提供了一个名为targetCmpId的字段，该字段指定了需要进行比较的另一个组件ID。
            var cmp = Ext.getCmp(field.repetition.targetCmpId);   //通过targetCmpId的字段查找组件
            if (Ext.isEmpty(cmp)) {      //如果组件（表单）不存在，提示错误
                Ext.MessageBox.show({
                    title: '错误',
                    msg: '发生异常错误，指定的组件未找到',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
                return false;
            }
            if (val == cmp.getValue()) {  //取得目标组件（表单）的值，与宿主表单的值进行比较。
                return true;
            } else {
                return false;
            }
        }
    },
    repetitionText: '两次密码不一致',
    pwd:function (val, field) {
        var reg = /^\w{6,22}$/;
        if(!reg.test(val)) {
            return false;
        }
        return true;
    },
    pwdText: '支持字母、数字、“_”的组合,6-20个字符！'
});

/* ***********************************************
 * author :  XMY&&ZD
 * function: 增加click事件
 * ***********************************************/
Ext.override(Ext.form.Label, {
    clickEvent: 'click',
    onRender: function () {
        var me = this,
            addOnclick,
            btn,
            btnListeners;

        me.callParent(arguments);

        // Set btn as a local variable for easy access
        me.el.on({
            click: me.onClick,
            scope: me
        });
    },
    doPreventDefault: function (e) {
        if (e && (this.preventDefault || (this.disabled && this.getHref()))) {
            e.preventDefault();
        }
    },
    onClick: function (e) {
        var me = this;
        me.doPreventDefault(e);
        // Click may have destroyed the button
        if (me.fireEvent('click', me, e) !== false && !me.destroyed) {
            Ext.callback(me.handler, me.scope, [me, e], 0, me);
        }
    }
});

Ext.define('Nhl.base.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    /**
     * main render后执行
     */
    mainRender: function () {
        var me = this;

        Ext.History.init();
        Ext.History.on('change', function (code) {
            var mid = code;
            if (!mid) {
                mid = 'userlist';
            }
            me.openNewTab(mid);
        });

        var token = Ext.History.getToken();
        if (!token || token.toString() === '0') {
            token = "userlist";
        }

        if (token) {
            var exp = setInterval(function () {
                clearInterval(exp);
                me.openNewTab(token);
            }, 30);
        }
    },

    openNewTab: function (menuId, data) {
        var me = this,
            view = me.getView(),
            menuData,
            main = view.down(me.xtypeStartWith + "-maintab"),
            // treelist = view.down(me.xtypeStartWith + '-mainleft').down('treelist'),
            // store = treelist.getStore(),
            record,className,cmp;
        me.deSelectMenuById(me.lastSelectedRecord);
        if(menuId.indexOf("?") > 0){
            menuId = menuId.split("?")[0];
        }
        for(var i=0;i<viewSet.tree.length;i++){
            if(viewSet.tree[i].id.toString()==menuId.toString()){
                className = viewSet.tree[i].view;
            }
        }

        me.selectMenuById(menuId);
        //改变右侧panel内容
        main.removeAll(true);

        //className = Ext.ClassManager.getNameByAlias('widget.'+menuId);//UumApp.view.sys.suspend.Suspend
        //console.log(className)
        //ViewClass = Ext.ClassManager.get(className);
        //cmp = new ViewClass();
        var cmp = Ext.create(className, {});
        main.add(cmp);
    },

    deSelectMenuById: function (record) {
        var me = this,
            treelist = me.getView().down('treelist');
        if (record) {
            treelist.getItem(record).updateSelected(false);
        }
    },
    selectMenuById: function (mid) {
        var me = this,
            treelist = me.getView().down('treelist'),
            treelistStore = treelist.getStore(),
            record;
        var token = Ext.History.getToken().split('?')[0],
            parentId,routeId;
        for(var i=0;i<viewSet.tree.length;i++){
            if(viewSet.tree[i].id == token){
                parentId = viewSet.tree[i].parentId;
                routeId = viewSet.tree[i].routeId;
            }
        }
        for(var j=0;j<treelistStore.getRootNode().childNodes.length;j++){
            if(treelistStore.getRootNode().childNodes[j].id==parentId){
                treelistStore.getRootNode().childNodes[j].expand();
            }
        }
        record = treelistStore.getAt(treelistStore.findBy(function (record) {
            return record.get('id') == routeId;
        }));
        if (record) {
            treelist.getItem(record).updateSelected(true);
            me.lastSelectedRecord = record;
        }
    },


    /**
     * 左菜单样式切换
     */
    toggleMenu: function (btn,pressed) {
        var me = this,
            treelist = me.getView().down('treelist'),
            ct = treelist.ownerCt;

        if (me.pressed === undefined) {
            me.pressed = false;
        }

        // Ext.suspendLayouts();
        treelist.setMicro(!me.pressed);
        if (pressed) {
            this.oldWidth = ct.width;
            ct.setWidth(44);
            btn.setIconCls('fa fa-list');
        } else {
            ct.setWidth(this.oldWidth);
            btn.setIconCls('fa fa-align-justify');
        }
        // Cookie.set(AppConfig.cookieStartWith + "main-left-panel-micro", !me.pressed, 365);

        me.pressed = !me.pressed;
        if (Ext.isIE8) {
            this.repaintList(treelist, !me.pressed);
        }
        // //触发多分辨率兼容更新
        // Ext.GlobalEvents.fireEvent('resize');
        // Ext.resumeLayouts(true);
    },

    repaintList: function(treelist, microMode) {
        treelist.getStore().getRoot().cascadeBy(function(node) {
            var item, toolElement;

            item = treelist.getItem(node);

            if (item && item.isTreeListItem) {
                if (microMode) {
                    toolElement = item.getToolElement();

                    if (toolElement && toolElement.isVisible(true)) {
                        toolElement.syncRepaint();
                    }
                }
                else {
                    if (item.element.isVisible(true)) {
                        item.iconElement.syncRepaint();
                        item.expanderElement.syncRepaint();
                    }
                }
            }
        });
    },

    /**
     * 主框架大小调整事件
     */
    mainResize: function () {
        Ext.util.CSS.removeStyleSheet('x-treelist-item-floated-height');
        Ext.util.CSS.createStyleSheet(
            '.x-treelist-nav .x-treelist-item-floated .x-treelist-container{max-height:' + (this.getView().getHeight() - 36) + 'px;overflow-y:auto;}',
            'x-treelist-item-floated-height');
        return true;
    }
});

Ext.define("Nhl.ux.button.PermissionButton", {
    extend: "Ext.button.Button",
    alias: "widget.permissionbutton",
    permission:"",
    hidden:false,
    initComponent:function () {
        var p = this.permission;
        for (var key in permission){
            if(p==key){
                this.setHidden(!permission[key])
            }
        }
    }
});

Ext.define("Nhl.ux.button.ImageButton", {
    extend: "Ext.button.Button",
    alias: "widget.imagebutton",
    cls: "",
    iconAlign: "left",
    initRenderTpl: Ext.emptyFn,
    componentLayout: null,
    autoEl: 'img',
    frame: false,
    initComponent: function () {
        this.scale = null;
        this.callParent();
        this.autoEl = {
            tag: 'img',
            role: 'button',
            hidefocus: 'on',
            unselectable: 'on'
        };
        var i;
        if (this.imageUrl) {
            i = new Image().src = this.imageUrl;
        }
        if (this.overImageUrl) {
            i = new Image().src = this.overImageUrl;
        }
        if (this.disabledImageUrl) {
            i = new Image().src = this.disabledImageUrl;
        }
        if (this.pressedImageUrl) {
            i = new Image().src = this.pressedImageUrl;
        }
    },
    getElConfig: function () {
        return Ext.apply(this.callParent(), {
            tag: "img",
            id: this.getId(),
            src: this.imageUrl,
            style: this.getStyle()
        });
    },
    getStyle: function () {
        var style = "border:none;cursor:pointer;";
        if (this.style) {
            style += this.style;
        }
        if (this.height) {
            style += "height:" + this.height + "px;";
        }
        if (this.width) {
            style += "width:" + this.width + "px;";
        }
        return style;
    },
    onRender: function (ct, position) {
        this.imgEl = this.el;
        if (!Ext.isEmpty(this.imgEl.getAttribute("width"), false) || !Ext.isEmpty(this.imgEl.getAttribute("height"), false)) {
            this.imgEl.dom.removeAttribute("width");
            this.imgEl.dom.removeAttribute("height");
        }
        if (this.altText) {
            this.imgEl.dom.setAttribute("alt", this.altText);
        }
        if (this.align && this.align !== "notset") {
            this.imgEl.dom.setAttribute("align", this.align);
        }
        if (this.pressed && this.pressedImageUrl) {
            this.imgEl.dom.src = this.pressedImageUrl;
        }
        if (this.disabled) {
            this.setDisabled(true);
        }
        if (this.tabIndex !== undefined) {
            this.imgEl.dom.tabIndex = this.tabIndex;
        }
        if (this.href) {
            this.on("click",
                function () {
                    if (this.target) {
                        window.open(this.href, this.target);
                    } else {
                        window.location = this.href;
                    }
                },
                this);
        }
        this.callParent(arguments);
        this.btnEl = this.el;
    },
    onMenuShow: function (e) {
        this.ignoreNextClick = 0;
        if (this.pressedImageUrl) {
            this.imgEl.dom.src = this.pressedImageUrl;
        }
        this.fireEvent("menushow", this, this.menu);
    },
    onMenuHide: function (e) {
        this.ignoreNextClick = Ext.defer(this.restoreClick, 250, this);
        this.imgEl.dom.src = (this.monitoringMouseOver) ? this.overImageUrl : this.imageUrl;
        this.fireEvent("menuhide", this, this.menu);
        this.focus();
    },
    getTriggerSize: function () {
        return 0;
    },
    toggle: function (state, suppressEvent, suppressHandler) {
        state = state === undefined ? !this.pressed : !!state;
        if (state != this.pressed) {
            if (state) {
                if (this.pressedImageUrl) {
                    this.imgEl.dom.src = this.pressedImageUrl;
                }
                this.pressed = true;
            } else {
                this.imgEl.dom.src = (this.monitoringMouseOver) ? this.overImageUrl : this.imageUrl;
                this.pressed = false;
            }
            if (!suppressEvent) {
                this.fireEvent("toggle", this, this.pressed);
            }
            if (this.toggleHandler && !suppressHandler) {
                this.toggleHandler.call(this.scope || this, this, state);
            }
        }
        return this;
    },
    setText: Ext.emptyFn,
    setDisabled: function (disabled) {
        this.disabled = disabled;
        if (this.imgEl && this.imgEl.dom) {
            this.imgEl.dom.disabled = disabled;
        }
        if (disabled) {
            if (this.disabledImageUrl) {
                this.imgEl.dom.src = this.disabledImageUrl;
            } else {
                this.imgEl.addCls(this.disabledCls);
            }
            this.imgEl.setStyle({
                cursor: "default"
            });
        } else {
            this.imgEl.dom.src = this.imageUrl;
            this.imgEl.setStyle({
                cursor: "pointer"
            });
            this.imgEl.removeCls(this.disabledCls);
        }
    },
    onMouseOver: function (e) {
        if (!this.disabled) {
            var internal = e.within(this.el.dom, true);
            if (!internal) {
                if (this.overImageUrl && !this.pressed && !this.hasVisibleMenu()) {
                    this.imgEl.dom.src = this.overImageUrl;
                }
                if (!this.monitoringMouseOver) {
                    Ext.getDoc().on("mouseover", this.monitorMouseOver, this);
                    this.monitoringMouseOver = true;
                }
            }
        }
        this.fireEvent("mouseover", this, e);
    },
    monitorMouseOver: function (e) {
        if (e.target != this.el.dom && !e.within(this.el)) {
            if (this.monitoringMouseOver) {
                Ext.getDoc().un('mouseover', this.monitorMouseOver, this);
                this.monitoringMouseOver = false;
            }
            this.onMouseOut(e);
        }
    },
    onMouseEnter: function (e) {
        if (this.overImageUrl && !this.pressed && !this.disabled && !this.hasVisibleMenu()) {
            this.imgEl.dom.src = this.overImageUrl;
        }
        this.fireEvent("mouseover", this, e);
    },
    onMouseOut: function (e) {
        if (!this.disabled && !this.pressed && !this.hasVisibleMenu()) {
            this.imgEl.dom.src = this.imageUrl;
        }
        this.fireEvent("mouseout", this, e);
    },
    onMouseDown: function (e) {
        var me = this;
        if (Ext.isIE) {
            me.getFocusEl().focus();
        }
        if (!me.disabled && e.button === 0) {
            if (me.pressedImageUrl) {
                me.imgEl.dom.src = me.pressedImageUrl;
            }
            Ext.button.Manager.onButtonMousedown(me, e);
        }
    },
    onMouseUp: function (e) {
        if (!this.isDestroyed && e.button === 0 && !this.enableToggle && !this.hasVisibleMenu()) {
            this.imgEl.dom.src = (this.overImageUrl && this.monitoringMouseOver) ? this.overImageUrl : this.imageUrl;
        }
    },
    setImageUrl: function (image) {
        this.imageUrl = image;
        if ((!this.disabled || Ext.isEmpty(this.disabledImageUrl, false)) && (!this.pressed || Ext.isEmpty(this.pressedImageUrl, false))) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    setDisabledImageUrl: function (image) {
        this.disabledImageUrl = image;
        if (this.disabled) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    setOverImageUrl: function (image) {
        this.overImageUrl = image;
        if ((!this.disabled || Ext.isEmpty(this.disabledImageUrl, false)) && (!this.pressed || Ext.isEmpty(this.pressedImageUrl, false))) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    setPressedImageUrl: function (image) {
        this.pressedImageUrl = image;
        if ((!this.disabled || Ext.isEmpty(this.disabledImageUrl, false)) && this.pressed) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    setAlign: function (align) {
        this.align = align;
        if (this.rendered) {
            this.imgEl.dom.setAttribute("align", this.align);
        }
    },
    setAltText: function (altText) {
        this.altText = altText;
        if (this.rendered) {
            this.imgEl.dom.setAttribute("altText", this.altText);
        }
    }
});

Ext.define("Nhl.base.Model", {
    extend: 'Ext.data.Model'
});

/* ***********************************************
 * function: Store基类
 * ***********************************************/
Ext.define("Nhl.base.Store", {
    extend: 'Ext.data.Store',
    outParams: {},
    pageSize: 10,
    autoLoad: false,
    //autoDestroy: true,
    isRequiresPage: true,
    latestTotalCount: 0,
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'IsSuccess',
            messageProperty: 'ErrMsg',
            totalProperty: "TotalCount"
        },
        limitParam: "limit",
        pageParam: "page",
        startParam: 'start',
        timeout: 60000//响应时间
    },
    listeners: {
        beforeload: function (store, opration, opt) {
            var me = this;

            me.lastTotalCount = store.totalCount;
            // if (me.isRequiresPage) {
            //     me.outParams.TotalCount = 0;
            // } else {
            //     try {
            //         me.outParams.TotalCount = store.totalCount || 0;
            //     } catch (e) { }
            // }
            Ext.apply(store.proxy.extraParams, me.outParams);

            setTimeout(function () {
                var proxy = store.getProxy();
                if (proxy) {
                    var getCountUrl = proxy.api.read;
                    if (getCountUrl) {
                        if (me.isRequiresPage) {
                            // store.fireEvent('beforeUpdatePageInfo');
                            Ext.Ajax.request({
                                url: getCountUrl,
                                method: 'POST',
                                callback: function (options, success, response) {
                                    console.log(success)
                                    if (success) {
                                        var responseJson = Ext.JSON.decode(response.responseText);
                                        store.totalCount = responseJson.Result;
                                        store.latestTotalCount = responseJson.Result;
                                        //beforeload load 事件执行完之后都执行这个方法
                                        me.updateTotalCount();
                                        store.fireEvent('updatePageInfo');
                                    }
                                },
                                params: store.proxy.extraParams
                            });
                        } else {
                            store.totalCount = me.lastTotalCount;
                        }
                    }
                }
            }, 1000);
            //store.removeAll();
        },
        load: function (store) {
            var me = this;
            //beforeload load 事件执行完之后都执行这个方法
            var getCountUrl = store.getProxy().api.read;
            if (getCountUrl) {
                me.updateTotalCount();
            }

        }
    },
    /*silent : Boolean (optional)
     Pass true to prevent the clear event from being fired.
     This method is affected by filtering.
     Defaults to: false
     */
    clearAll: function (silent) {
        this.outParams = {};
        this.proxy.extraParams = {};
        this.removeAll(silent || false);
    },

    //beforeload load 事件执行完之后都执行这个方法，更新总数
    updateTotalCount: function () {
        var me = this;

        me.totalCount = me.latestTotalCount;

    }
});


/* ***********************************************
 * function: 分页条 带页码大小下拉框 自定义格式等 用法同pagingtoolbar
 * ***********************************************/
Ext.define('Nhl.ux.CisPagingToolBar', {
    extend: 'Ext.toolbar.Paging',
    xtype: 'cispagingtoolbar',
    alternateClassName: 'Uum.ux.CisPagingToolBar',
    cls: 'cis-pagingtoolbar-panel',
    padding: 0,
    displayInfo: true,
    displayMsg: '显示{0}-{1}&nbsp;共{2}条',
    emptyMsg: '没有数据',
    beforePageText: '第',
    afterPageText: '页&nbsp;共{0}页',
    firstText: '首页',
    prevText: '上一页',
    nextText: '下一页',
    lastText: '最后一页',
    refreshText: '刷新',
    /**
     * 每页大小列表
     */
    pageSizes: '5,10,50,100',
    getPagingItems: function () {
        var me = this,
            inputListeners = {
                scope: me,
                blur: me.onPagingBlur
            };

        //inputListeners[''] = me.onPagingKeyDown;
        inputListeners[Ext.supports.SpecialKeyDownRepeat ? 'keydown' : 'keypress'] = me.onPagingKeyDown;

        var _temp = me.pageSizes.split(',');
        var _data = [];
        for (var i = 0; i < _temp.length; i++) {
            if (_temp[i]) {
                _data[_data.length] = { text: _temp[i].toString(), value: _temp[i] };
            }
        }
        var pagess = Ext.create('Ext.data.Store', {
            fields: ['text', 'value'],
            data: _data
        });

        return [
            "每页",
            {
                itemId: 'pageSizes',
                xtype: "combo",
                store: pagess,
                queryMode: 'local',
                displayField: 'text',
                valueField: 'value',
                width: 65,
                editable: false,
                showClearTriggers: false,
                value: me.store.getPageSize(),
                listeners: {
                    change: function (obj, v) {
                        me.store.setPageSize(v);
                        if (!me._notFireChange) {
                            me.moveFirst();
                        }
                    }
                }
            },
            "条",
            '-', {
                itemId: 'first',
                tooltip: me.firstText,
                overflowText: me.firstText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
                disabled: true,
                handler: me.moveFirst,
                scope: me
            }, {
                itemId: 'prev',
                tooltip: me.prevText,
                overflowText: me.prevText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
                disabled: true,
                handler: me.movePrevious,
                scope: me
            },
            '-',
            me.beforePageText,
            {
                xtype: 'numberfield',
                itemId: 'inputItem',
                name: 'inputItem',
                cls: Ext.baseCSSPrefix + 'tbar-page-number',
                allowDecimals: false,
                minValue: 1,
                hideTrigger: true,
                enableKeyEvents: true,
                keyNavEnabled: false,
                selectOnFocus: true,
                submitValue: false,
                // mark it as not a field so the form will not catch it when getting fields
                isFormField: false,
                width: me.inputItemWidth,
                margin: '-1 2 3 2',
                listeners: inputListeners
            },
            {
                xtype: 'tbtext',
                itemId: 'afterTextItem',
                text: Ext.String.format(me.afterPageText, 1)
            },
            '-',
            {
                itemId: 'next',
                tooltip: me.nextText,
                overflowText: me.nextText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
                disabled: true,
                handler: me.moveNext,
                scope: me
            }, {
                itemId: 'last',
                tooltip: me.lastText,
                overflowText: me.lastText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
                disabled: true,
                handler: me.moveLast,
                scope: me
            },
            '-',
            {
                itemId: 'refresh',
                tooltip: me.refreshText,
                overflowText: me.refreshText,
                iconCls: Ext.baseCSSPrefix + 'tbar-loading',
                disabled: me.store.isLoading(),
                handler: me.doRefresh,
                scope: me
            }];
    },

    initComponent: function () {
        var me = this;
        me.store.on({
            'beforeUpdatePageInfo': {
                fn: me.beforeUpdatePageInfo,
                scope: me
            },
            'updatePageInfo': {
                fn: me.updatePageInfo,
                scope: me
            }
        });
        me.callParent();
    },
    beforeUpdatePageInfo: function () {
        var me = this;
        me.mask('正在更新分页信息...');
    },
    updatePageInfo: function () {
        var me = this;
        me.unmask();
        me.updateBarInfo();
    },

    // @private
    onLoad: function () {
        var me = this,
            pageData,
            currPage,
            pageCount,
            afterText,
            count,
            isEmpty,
            item,
            pageSizes;

        count = me.store.getCount();
        isEmpty = count === 0;
        if (!isEmpty) {
            pageData = me.getPageData();
            currPage = pageData.currentPage;
            pageCount = pageData.pageCount;

            // Check for invalid current page.
            if (currPage > pageCount) {
                //me.store.loadPage(pageCount);
                return;
            }

            afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
        } else {
            currPage = 0;
            pageCount = 0;
            afterText = Ext.String.format(me.afterPageText, 0);
        }

        Ext.suspendLayouts();
        item = me.child('#afterTextItem');
        if (item) {
            item.setText(afterText);
        }
        item = me.getInputItem();
        if (item) {
            item.setDisabled(isEmpty).setValue(currPage);
        }
        item = me.child('#pageSizes');
        if (item) {
            me._notFireChange = true;
            item.setValue(me.store.getPageSize());
            me._notFireChange = false;
        }

        me.setChildDisabled('#first', currPage === 1 || isEmpty);
        me.setChildDisabled('#prev', currPage === 1 || isEmpty);
        me.setChildDisabled('#next', currPage === pageCount || isEmpty);
        me.setChildDisabled('#last', currPage === pageCount || isEmpty);
        me.setChildDisabled('#refresh', false);
        me.setChildDisabled('#go', isEmpty);
        me.updateInfo();
        Ext.resumeLayouts(true);

        if (!me.calledInternal) {
            me.fireEvent('change', me, pageData || me.emptyPageData);
        }
    },

    // @private
    onPagingBlur: function (e) {
        var me = this,
            inputItem = this.getInputItem(),
            pageData = me.getPageData(),
            pageNum;

        if (inputItem) {
            pageNum = me.readPageFromInput(pageData);
            if (pageNum !== false) {
                pageNum = Math.min(Math.max(1, pageNum), pageData.pageCount);
                if (pageNum !== pageData.currentPage && me.fireEvent('beforechange', me, pageNum) !== false) {
                    me.store.loadPage(pageNum);
                }
            }
            //curPage = this.getPageData().currentPage;
            //inputItem.setValue(curPage);
        }
    }
});

/* ***********************************************
 * function: 表格基类
 * ***********************************************/
Ext.define("Nhl.base.Grid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cisgrid',
    requires: [
        'Uum.ux.CisPagingToolBar'
    ],
    isPage: true,
    pageSizes: null,
    loadMask: false,
    multiColumnSort: true,
    viewConfig:{
        enableTextSelection:true
    },
    initComponent: function () {
        var me = this,
            vm,
            bindStoreName,
            store;

        //增加页码条默认功能
        if (me.isPage) {
            try {
                try {
                    store = me.store || me.getBind().store.getValue();
                } catch (e) { }

                if (!store || store.isEmptyStore) {
                    if (me.config.bind && me.config.bind.store) {
                        bindStoreName = Ext.String.trim(me.config.bind.store).replace('{', '').replace('}', '');
                        vm = me.getViewModel();
                        store = vm.getStore(bindStoreName);
                    }
                }
                if (me.buttons && me.buttons.length > 0) {
                    Ext.apply(this, {
                        dockedItems: {
                            xtype: 'panel',
                            dock: 'bottom',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {
                                        width: '100%',
                                        background:'#ececec'
                                    }
                                }
                            },
                            items: [{
                                    xtype: 'panel',
                                    colspan: 1,
                                    items: [
                                        new Uum.ux.CisPagingToolBar({
                                            displayInfo: true,
                                            displayMsg: '显示{0}-{1}&nbsp;共{2}条',
                                            store: store,
                                            pageSizes: me.pageSizes || '5,10,50,100'
                                        })
                                    ]
                                },{
                                    xtype: 'panel',
                                    colspan: 1,
                                    buttons: me.buttons
                                }

                            ]
                        }
                    });
                    me.buttons = undefined;
                } else {
                    Ext.apply(this, {
                        bbar: new Uum.ux.CisPagingToolBar({
                            displayInfo: true,
                            displayMsg: '显示{0}-{1}&nbsp;共{2}条',
                            store: store,
                            pageSizes: me.pageSizes || '5,10,50,100'
                        })
                    });
                }
            } catch (e) {
                Ext.log.error(e.stack);
            }
        }
        me.viewConfig = Ext.apply({
            loadMask: me.loadMask,
            //增加行样式设置功能
            getRowClass: function (record, rowIndex, rowParams, store) {
                var css = '';
                if (record.data._isDisabled) {
                    css = 'x-grid-disabled ';
                }
                if (record._rowclass || record.data._rowclass) {
                    css += (record._rowclass || record.data._rowclass);
                }
                if (css) {
                    return css;
                }
            }
        }, me.viewConfig);

        me.callParent(arguments);
    }
});

/* ***********************************************
 * function: 解决CheckboxGroup和RadioGroup的绑定格式问题
 * ***********************************************/
Ext.override(Ext.form.CheckboxGroup, {
    twoWayBindable: ['value'],
    defaultBindProperty: 'value',
    valuePublishEvent: 'updatebindvalue',
    getValue: function () {
        var values = [],
            boxes = this.getBoxes(),
            box,
            inputValue;

        for (var b = 0; b < boxes.length; b++) {
            box = boxes[b];
            inputValue = box.inputValue;
            if (box.getValue()) {
                values.push(inputValue);
            }
        }

        return values;
    },
    checkChange: function (box, newValue) {
        this.fireEvent('updatebindvalue');
        //this.callParent(arguments);
    },
    setValue: function (value) {
        if (value === null || value === undefined || !Ext.isArray(value)) {
            return;
        }

        var me = this,
            boxes = me.getBoxes(),
            values = me.values,
            b,
            bLen = boxes.length,
            box, name,
            cbValue;

        me.batchChanges(function () {
            Ext.suspendLayouts();
            for (b = 0; b < bLen; b++) {
                box = boxes[b];
                cbValue = false;

                if (value) {
                    if (Ext.isArray(value)) {
                        cbValue = Ext.Array.contains(value, box.inputValue);
                    } else {
                        cbValue = value;
                    }
                }
                box.setValue(cbValue);
            }
            Ext.resumeLayouts(true);
        });

        return me;
    }
});

Ext.override(Ext.form.RadioGroup, {
    valuePublishEvent: 'updatebindvalue',
    checkChange: function () {
        this.fireEvent('updatebindvalue');
        //var value = this.getValue(),
        //    key = Ext.Object.getKeys(value)[0];
        //// If the value is an array we skip out here because it's during a change
        //// between multiple items, so we never want to fire a change
        //if (Ext.isArray(value[key])) {
        //    return;
        //}
        //this.callParent(arguments);
    },
    getValue: function () {
        var value = null,
            boxes = this.getBoxes(),
            box,
            inputValue;

        for (var b = 0; b < boxes.length; b++) {
            box = boxes[b];
            inputValue = box.inputValue;
            if (box.getValue() === true) {
                value = inputValue;
            }
        }

        return value;
    },
    setValue: function (value) {
        if (value === null || value === undefined) {
            return;
        }
        var me = this,
            radios = me.getBoxes(),
            radio;

        Ext.suspendLayouts();
        for (var i = 0; i < radios.length; ++i) {
            radio = radios[i];
            if (value === radio.inputValue) {
                radio.setValue(true);
            } else {
                radio.setValue(false);
            }
        }
        Ext.resumeLayouts(true);

        return me;
    }
});