define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("cisHttp", ["$http", function ($http) {
        return function (url, pars, method) {
            return $http({
                url: url,
                params: pars || {},
                method: method || "post"
            });
        }
    }]).factory("CommHttp", ["cisHttp", function (cisHttp) {
        //公共http服务
        return {
            //服务端action
            getMenus: function () { return cisHttp("/partialviews/getmymenus"); },
            getBaseInfo: function () { return cisHttp("/partialviews/GetBaseInfo"); },
            getSeatMonitoring: function () { return cisHttp("/Settings/GetSeatMonitoring"); },
            Heartbeat: function () { return cisHttp("/home/Heartbeat"); },
            ChangePwd: function (pars) { return cisHttp("/Account/ChangePwd", pars); },
            ChangeStatus: function (pars) { return cisHttp("/account/ChangeStatus", pars); }
        };
    }]).factory("hospitalServices", ['cisHttp', function (cisHttp) {
        //定点医院管理
        return {
            query: function (pars) {
                return cisHttp("/partialviews/getmymenus", pars);
            }
        };
    }]).factory("strUtils", ['cisHttp','$http', function () {
        //字符串处理
        return {
            //字符串值，值为：undefined，null,或空字符串时，返回空串，否则返回该数据
            strIsEmpty: function (str) {
                if ((str == undefined || str == null) && (typeof (str) != 'string' || str.replace(/\s+/g, '').length == 0)) {
                    return '';
                } else {
                    return str;
                }
            },
            //查询条件搜索 类型转换方法
            queryValueTransformation: function (str) {
                if ((str == undefined || str == null) && (typeof (str) != 'string' || str.replace(/\s+/g, '').length == 0)) {
                    return '';
                } else {
                    return str;
                }
            },
            toBoolean: function (value) {
                if (typeof value === 'function') {
                    value = true;
                } else if (value && value.length !== 0) {
                    var v = this.lowercase("" + value);
                    value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
                } else {
                    value = false;
                }
                return value;
            },
            isString: function (value) { return typeof value === 'string'; },
            lowercase: function (string) { return this.isString(string) ? string.toLowerCase() : string; },
            isEmptyArr: function (value) {
                return value != undefined && value.length == 0 ? true : false;
            },
            //格式化xml
            getPrefix:function(prefixIndex) {
                var span = '    ';
                var output = [];
                for(var i = 0 ; i < prefixIndex; ++i)
                {
                    output.push(span);
                }

                return output.join('');
            },
            formatXml:function (text) {
                var me = this;
                //去掉多余的空格
                text = '\n' + text.replace(/(<\w+)(\s.*?>)/g,function($0, name, props)
                    {
                        return name + ' ' + props.replace(/\s+(\w+=)/g," $1");
                    }).replace(/>\s*?</g,">\n<");

                //把注释编码
                text = text.replace(/\n/g,'\r').replace(/<!--(.+?)-->/g,function($0, text)
                {
                    var ret = '<!--' + escape(text) + '-->';
                    //alert(ret);
                    return ret;
                }).replace(/\r/g,'\n');

                //调整格式
                var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
                var nodeStack = [];
                var output = text.replace(rgx,function($0,all,name,isBegin,isCloseFull1,isCloseFull2 ,isFull1,isFull2){
                    var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/' ) || (isFull1 == '/') || (isFull2 == '/');
                    var prefix = '';
                    if(isBegin == '!')
                    {
                        prefix = me.getPrefix(nodeStack.length);
                    }
                    else
                    {
                        if(isBegin != '/')
                        {
                            prefix = me.getPrefix(nodeStack.length);
                            if(!isClosed)
                            {
                                nodeStack.push(name);
                            }
                        }
                        else
                        {
                            nodeStack.pop();
                            prefix = me.getPrefix(nodeStack.length);
                        }

                    }
                    var ret =  '\n' + prefix + all;
                    return ret;
                });
                var outputText = output.substring(1);
                //把注释还原并解码，调格式
                outputText = outputText.replace(/\n/g,'\r').replace(/(\s*)<!--(.+?)-->/g,function($0, prefix,  text)
                {
                    if(prefix.charAt(0) == '\r')
                        prefix = prefix.substring(1);
                    text = unescape(text).replace(/\r/g,'\n');
                    var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix ) + '-->';
                    return ret;
                });
                return outputText.replace(/\s+$/g,'').replace(/\r/g,'\r\n');
              }
        };
    }]).factory("provinceServices", ['cisHttp', function (cisHttp) {
        //获取城市列表
        return {
            query: function (pars) {
                return cisHttp("getprovincebyname", pars,"get");
            }
        };
    }])
});
