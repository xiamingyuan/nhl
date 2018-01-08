/**
 * attach services to this module
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules
 * which avails each service of, for example, the `config` constants object.
 **/
define([
    './common',
    './userlistService',      //医略-用户列表
    './onlineService',        //医略-在线用户
    './blacklistListService', //医略-黑名单
    './feedbackSmartService', //医略-意见反馈
    './messageService',       //医略-消息发布
    './doctorauditService',   //医略-医生审核
    './memberlistService',          //新健康-用户列表
    './certificationService',       //新健康-实名认证
    './micardbindService',          //新健康-医保绑定
    './membercardService',          //新健康-会员卡管理
    './blacklistService' ,          //新健康-黑名单
    './feedbackService'  ,          //新健康-意见反馈
    './insuranceproductService', //新健康一号-保险产品
    './druglistService',         //新健康一号-药品列表
    './claimsService',           //新健康一号-报销
    './accountService',          //新健康一号-帐户服务
    './financeService',          //新健康一号-财务管理服务
    './insurancecompanyService',    //基础信息-保险公司
    './suppliermanageService'  ,    //基础信息-供应商管理
    './commodityinformationService',//基础信息-商品信息
    './drupinfoService',            //基础信息-药品信息
    './sessionmanagerService',      //基础信息-话术管理
    './supervisionmappingService',  //基础信息-监管码映射
    './hospitalService',               //系统管理-医院及科室维护
    './specialtySystemService',        //系统管理-专业系统维护
    './specialtyDepartmentService',    //系统管理-专业科室维护
    './schoolService',                 //系统管理-学校及专业维护
    './cityService',                   //系统管理-城市维护
    './dictionarydataService',         //系统管理-字典数据
    './doctorgroupService',         //系统管理-医生集团数据
    './scanlogrecordService',                //查询统计-扫码日志记录
    './reimbursementchannelService',         //查询统计-报销渠道统计
    './branchesstatisticsService',           //查询统计-网点分布统计
    './registeruserstatisticsService',       //查询统计-注册用户统计
    './commodityclassifystatisticsService',  //查询统计-商品分类统计
    './medicalinsurancestatisticsService',   //查询统计-医保认证统计
    './complaintinformationService',         //查询统计-申诉信息查询
    './respondentinformationService',        //查询统计-被申诉信息查询
    './reimbursementapplicationService'      //查询统计-报销申请查询
], function () {
});
