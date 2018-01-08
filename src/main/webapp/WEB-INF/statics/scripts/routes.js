/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
    'use strict';
    return app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        // Enables Request.IsAjaxRequest()
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        // Disable IE ajax request caching
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        $routeProvider.when('/userlist', {
            //医略-用户列表
            templateUrl: 'userlist/list',
            controller: 'userListController'
        }).when('/userlist/detail/:id', {
            //医略-用户列表详情
            templateUrl: 'userlist/detail',
            controller: 'userDetailController'
        }).when('/online', {
            //医略-在线用户
            templateUrl: 'online/list',
            controller: 'onlineListController'
        }).when('/userblacklist', {
            //医略-黑名单
            templateUrl: 'blacklistlist/list',
            controller: 'blacklistListController'
        }).when('/userfeedback', {
            //医略-意见反馈
            templateUrl: 'feedbacklist/list',
            controller: 'feedbackSmartController'
        }).when('/message', {
            //医略-消息发布
            templateUrl: 'message/list',
            controller: 'messageListController'
        }).when('/message/messagepub', {
            //医略-消息发布新增
            templateUrl: 'message/messagepub',
            controller: 'messagePubController'
        }).when('/message/edit/:id/:count', {
            //医略-消息编辑
            templateUrl: 'message/edit',
            controller: 'messageEditController'
        }).when('/message/messagedetail/:id', {
            //医略-消息发布详情
            templateUrl: 'message/messagedetail',
            controller: 'messageDetailController'
        }).when('/doctoraudit', {
            //医略-医生审核
            templateUrl: 'doctoraudit/list',
            controller: 'certListController'
        }).when('/doctoraudit/scheduleextract', {
            //医略-医生审核处理
            templateUrl: 'doctoraudit/scheduleextract',
            controller: 'certExtractController'
        }).when('/doctoraudit/detail/:id', {
            //医略-医生审核详情
            templateUrl: 'doctoraudit/detail',
            controller: 'certDetailController'
        }).when('/memberlist', {
            //新健康-用户列表
            templateUrl: 'memberlist/list',
            controller: 'memberListController'
        }).when('/memberlist/detail/:id', {
            //新健康-用户详情
            templateUrl: 'memberlist/detail',
            controller: 'memberListDetailController'
        }).when('/certification', {
            //新健康-实名认证
            templateUrl: 'certification/list',
            controller: 'certificationListController'
        }).when('/micardbind', {
            //新健康-医保绑定
            templateUrl: 'micardbind/list',
            controller: 'micardBindListController'
        }).when('/membercard', {
            //新健康-会员卡管理
            templateUrl: 'membercard/list',
            controller: 'memberCardListController'
        }).when('/membercard/detail/:id', {
            //新健康-会员卡详情
            templateUrl: 'membercard/detail',
            controller: 'memberCardDetailController'
        }).when('/blacklist', {
            //新健康-黑名单列表
            templateUrl: 'blacklist/list',
            controller: 'blackListController'
        }).when('/feedback', {
            //新健康-意见反馈列表
            templateUrl: 'feedback/list',
            controller: 'feedBackListController'
        }).when('/insuranceproducts', {
            //新健康一号-保险产品列表
            templateUrl: 'insuranceproducts/list',
            controller: 'insuranceProductsListController'
        }).when('/insuranceproducts/edit/:id', {
            //新健康一号-保险产品編輯
            templateUrl: 'insuranceproducts/edit',
            controllerAs: 'insuranceProductsEditController'
        }).when('/insuranceproducts/add', {
            //新健康一号-保险产品新增
            templateUrl: 'insuranceproducts/add',
            controllerAs: 'insuranceProductsAddController'
        }).when('/insurancepolicy', {
            //新健康一号-保单管理列表
            templateUrl: 'insurancepolicy/list',
            controller: 'insurancePolicyListController'
        }).when('/drugdirectory', {
            //新健康一号-药品目录列表
            templateUrl: 'drugdirectory/list',
            controller: 'drugDirectoryListController'
        }).when('/drugdirectory/add', {
            //新健康一号-药品目录添加
            templateUrl: 'drugdirectory/add',
            controller: 'drugDirectoryAddController'
        }).when('/drugdirectory/edit/:id', {
            //新健康一号-药品目录编辑
            templateUrl: 'drugdirectory/edit',
            controller: 'drugDirectoryEditController'
        }).when('/reimbursementquery', {
            //新健康一号-报销查询列表
            templateUrl: 'reimbursementquery/list',
            controller: 'reimbursementQueryListController'
        }).when('/reimbursementaudit', {
            //新健康一号-报销审核列表
            templateUrl: 'reimbursementaudit/list',
            controller: 'reimbursementAuditListController'
        }).when('/reimbursementmanage', {
            //新健康一号-报销管理列表
            templateUrl: 'reimbursementmanage/list',
            controller: 'reimbursementManageListController'
        }).when('/financeaudit', {
            //新健康一号-财务审核列表
            templateUrl: 'financeaudit/list',
            controller: 'financeAuditListController'
        }).when('/settlementquery', {
            //新健康一号-结算查询列表
            templateUrl: 'settlementquery/list',
            controller: 'settlementQueryListController'
        }).when('/invoicepost', {
            //新健康一号-发票邮寄管理
            templateUrl: 'invoicepost/list',
            controller: 'invoicePostListController'
        }).when('/invoicelogistics', {
            //新健康一号-发票物流查询
            templateUrl: 'invoicelogistics/list',
            controller: 'invoiceLogisticsListController'
        }).when('/subtractreimbursement', {
            //新健康一号-立减报销查询
            templateUrl: 'subtractreimbursement/list',
            controller: 'subtractReimbursementListController'
        }).when('/subtractbill', {
            //新健康一号-立减账单管理
            templateUrl: 'subtractbill/list',
            controller: 'subtractBillListController'
        }).when('/appealmanage', {
            //新健康一号-申诉列表
            templateUrl: 'appealmanage/list',
            controller: 'appealManageListController'
        }).when('/appealmanage/detail/:id', {
            //新健康一号-申诉管理详情
            templateUrl: 'appealmanage/detail',
            controller: 'appealManageDetailController'
        }).when('/withdrawconfirmation', {
            //财务管理-提现确认
            templateUrl: 'withdrawconfirmation/list',
            controller: 'withdrawconFirmationListController'
        }).when('/paymanage', {
            //财务管理-支付管理
            templateUrl: 'paymanage/list',
            controller: 'payManageListController'
        }).when('/minusbillconfirmation', {
            //财务管理-财务账单确认
            templateUrl: 'minusbillconfirmation/list',
            controller: 'minusBillConfirmationListController'
        }).when('/billmanage', {
            //财务管理-账单列表
            templateUrl: 'billmanage/list',
            controller: 'billManageListController'
        }).when('/supplierpipeline', {
            //财务管理-供应商流水单
            templateUrl: 'supplierpipeline/list',
            controller: 'supplierPipelineListController'
        }).when('/chargemanage', {
            //财务管理-扣款管理
            templateUrl: 'chargemanage/list',
            controller: 'chargeManageListController'
        }).when('/insurancecompany', {
            //基础信息-保险公司
            templateUrl: 'insurancecompany/list',
            controller: 'insuranceCompanyListController'
        }).when('/suppliermanage', {
            //基础信息-供应商管理
            templateUrl: 'suppliermanage/list',
            controller: 'supplierManageListController'
        }).when('/suppliermanage/edit/:id', {
            //基础信息-供应商管理编辑
            templateUrl: 'suppliermanage/edit',
            // controller: 'supplierManageEditController'
        }).when('/commodityinformation', {
            //基础信息-商品信息
            templateUrl: 'commodityinformation/list',
            // controller: 'commodityInformationListController'
        }).when('/commodityinformation/edit:id', {
            //基础信息-商品信息编辑
            templateUrl: 'commodityinformation/edit',
            // controller: 'commodityInformationEditController'
        }).when('/commodityinformation/add', {
            //基础信息-商品信息新增
            templateUrl: 'commodityinformation/add',
            // controller: 'commodityInformationAddController'
        }).when('/druginformation', {
            //基础信息-药品信息
            templateUrl: 'druginformation/list',
            controller: 'drugInformationListController'
        }).when('/sessionmanager', {
            //基础信息-话术管理
            templateUrl: 'sessionmanager/list',
            controller: 'sessionManagerListController'
        }).when('/sessionmanager/edit:id', {
            //基础信息-话术管理编辑
            templateUrl: 'sessionmanager/edit',
            controller: 'sessionManagerEditController'
        }).when('/sessionmanager/add', {
            //基础信息-话术管理添加
            templateUrl: 'sessionmanager/add',
            controller: 'sessionManagerAddController'
        }).when('/supervisionmapping', {
            //基础信息-监管码映射
            templateUrl: 'supervisionmapping/list',
            controller: 'supervisionMappingListController'
        }).when('/hospitaldepartment', {
            //系统管理-医院及科室列表
            templateUrl: 'hospitaldepartment/list',
            controller: 'hospitalListController'
        }).when('/hospitaldepartment/edit/:id', {
            //系统管理-医院及科室编辑
            templateUrl: 'hospitaldepartment/edit',
            controller: 'hospitalEditController'
        }).when('/hospitaldepartment/add', {
            //系统管理-添加医院
            templateUrl: 'hospitaldepartment/add',
            controller: 'hospitalAddController'
        }).when('/hospitaldepartment/detail/:id', {
            //系统管理-医院及科室详情
            templateUrl: 'hospitaldepartment/detail',
            controller: 'hospitalDetailController'
        }).when('/schoolspecialty', {
            //系统管理-学校及专业列表
            templateUrl: 'schoolspecialty/list',
            controller: 'schoolspecialtyListController'
        }).when('/schoolspecialty/edit/:id', {
            //系统管理-学校及专业编辑
            templateUrl: 'schoolspecialty/edit',
            controller: 'schoolspecialtyEditController'
        }).when('/schoolspecialty/detail/:id', {
            //系统管理-学校及专业详情
            templateUrl: 'schoolspecialty/detail',
            controller: 'schoolspecialtyDetailController'
        }).when('/specialtysystem', {
            //系统管理-专业系统维护
            templateUrl: 'specialtysystem/list',
            controller: 'specialtySystemListController'
        }).when('/specialtydepartment', {
            //系统管理-专业科室维护
            templateUrl: 'specialtydepartment/list',
            controller: 'specialtyDepartmentListController'
        }).when('/citymaintenance', {
            //系统管理-城市维护
            templateUrl: 'citymaintenance/list',
            controller: 'cityListController'
        }).when('/dictionarydata', {
            //系统管理-字典数据维护
            templateUrl: 'dictionarydata/list',
            controller: 'dictionaryDataListController'
        }).when('/scanlogrecord', {
            //系统管理-扫码日志记录
            templateUrl: 'scanlogrecord/list',
            controller: 'scanLogRecordListController'
        }).when('/reimbursementchannelstatistics', {
            //查询统计-报销渠道统计
            templateUrl: 'reimbursementchannelstatistics/list',
            controller: 'reimbursementChannelStatisticsListController'
        }).when('/branchesstatistics', {
            //查询统计-网点分布统计
            templateUrl: 'branchesstatistics/list'
            // controller: 'branchesStatisticsListController'
        }).when('/registeruserstatistics', {
            //查询统计-注册用户统计
            templateUrl: 'registeruserstatistics/list',
            controller: 'registerUserStatisticsListController'
        }).when('/commodityclassifystatistics', {
            //查询统计-商品分类统计
            templateUrl: 'commodityclassifystatistics/list',
            controller: 'commodityClassifyStatisticsListController'
        }).when('/medicalinsurancestatistics', {
            //查询统计-医保认证统计
            templateUrl: 'medicalinsurancestatistics/list',
            controller: 'medicalinSuranceStatisticsListController'
        }).when('/complaintinformationquery', {
            //查询统计-申诉信息查询
            templateUrl: 'complaintinformationquery/list',
            controller: 'complaintInformationQueryListController'
        }).when('/respondentinformationquery', {
            //查询统计-被申诉信息查询
            templateUrl: 'respondentinformationquery/list',
            controller: 'respondentInformationQueryListController'
        }).when('/reimbursementapplicationquery', {
            //查询统计-报销申请查询
            templateUrl: 'reimbursementapplicationquery/list',
            controller: 'reimbursementApplicationQueryListController'
        }).when('/doctorgroup', {
            //系统管理-医生集团列表
            templateUrl: 'doctorgroup/list',
            controller: 'doctorgroupListController'
        }).when('/doctorgroup/edit/:id', {
            //系统管理-医生集团编辑
            templateUrl: 'doctorgroup/edit',
            controller: 'doctorgroupEditController'
        }).when('/doctorgroup/add', {
            //系统管理-添加医生集团
            templateUrl: 'doctorgroup/add',
            controller: 'doctorgroupAddController'
        }).when('/doctorgroup/detail/:id', {
            //系统管理-医生集团详情
            templateUrl: 'doctorgroup/detail',
            controller: 'doctorgroupDetailController'
        }).otherwise({
            redirectTo: '/',
            // templateUrl: 'home',
            controller: 'homePageController'
        });
    }]).factory('loadingInterceptor', ['$q', '$injector', '$rootScope', '$location', '$window', '$timeout', 'httpCounter', function ($q, $injector, $rootScope, $location, $window, $timeout, httpCounter) {
        var loadingInterceptor = {
            'request': function (config) {
                ////心跳
                //if (config.url == '/home/HeartBeat') {
                //    return config;
                //}

                httpCounter++;
                var loading = $('#loadding');
                if (loading.length > 0) {
                    if (httpCounter == 1) {
                        $('#loadding img').attr('src', '');
                        $('#loadding img').attr('src', 'image/loading.gif');
                    }
                    loading.show();
                }
                return config;
            },
            'response': function (response) {
                if (typeof response.data === 'string' && response.data.indexOf("新健康-后台")>-1) {
                    $window.location.href = "login";
                    return $q.reject(response);
                }

                httpCounter--;
                if (httpCounter <= 0) {
                    var loading = $('#loadding');
                    if (loading.length > 0) {
                        $timeout(function () {
                            loading.hide();
                        }, 10);
                    }
                }
                return response;
            },
            'requestError': function (config) {
                httpCounter--;
                if (httpCounter <= 0) {
                    var loading = $('#loadding');
                    if (loading.length > 0) {
                        $timeout(function () {
                            loading.hide();
                        }, 10);
                    }
                }
                return $q.reject(config);
            },
            'responseError': function (response) {
                httpCounter--;
                if (httpCounter <= 0) {
                    var loading = $('#loadding');
                    if (loading.length > 0) {
                        $timeout(function () {
                            loading.hide();
                        }, 10);
                    }
                }
                return $q.reject(response);
            }
        }
        return loadingInterceptor;
    }]).config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('loadingInterceptor');
    }]).config(['$compileProvider', function ($compileProvider) {
        //解决动态添加指令的问题
        $compileProvider.directive('compile', function ($compile) {
            return function (scope, element, attrs) {
                scope.$watch(
                  function (scope) {
                      return scope.$eval(attrs.compile);
                  },
                  function (value) {
                      element.html(value);
                      $compile(element.contents())(scope);
                  }
                );
            };
        });
    }]).value('httpCounter', 0);
});

