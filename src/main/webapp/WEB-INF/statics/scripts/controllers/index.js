/** attach controllers to this module 
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules 
 * which avails each controller of, for example, the `config` constants object.
 **/
define([
    //'./my-ctrl-1',
    './home/index',
    './userlist/index',     //医略-用户列表
    './online/index',       //医略-在线用户
    './blacklistlist/index',//医略-黑名单
    './feedbacklist/index', //医略-意见反馈
    './message/index',      //医略-消息发布
    './doctoraudit/index',  //医略-医生审核
    './memberlist/index',       //新健康-用户列表
    './certification/index',    //新健康-实名认证
    './micardbind/index',       //新健康-医保绑定
    './membercard/index',       //新健康-会员卡管理
    './blacklist/index',        //新健康-黑名单
    './feedback/index',         //新健康-意见反馈
    './insuranceproducts/index',    //新健康一号-保险产品
    './insurancepolicy/index',      //新健康一号-保单管理
    './drugdirectory/index',        //新健康一号-药品目录
    './reimbursementquery/index',   //新健康一号-报销查询
    './reimbursementaudit/index',   //新健康一号-报销审核
    './reimbursementmanage/index',  //新健康一号-报销管理
    './financeaudit/index',         //新健康一号-财务审核
    './settlementquery/index',      //新健康一号-结算查询
    './invoicepost/index',          //新健康一号-发票邮寄管理
    './invoicelogistics/index',     //新健康一号-发票物流查询
    './subtractreimbursement/index',//新健康一号-立减报销查询
    './subtractbill/index',         //新健康一号-立减账单管理
    './appealmanage/index',         //新健康一号-申诉管理
    './withdrawconfirmation/index',   //财务管理-提现确认
    './paymanage/index',              //财务管理-支付管理
    './minusbillconfirmation/index',  //财务管理-财务账单确认
    './billmanage/index',             //财务管理-账单管理
    './supplierpipeline/index',       //财务管理-供应商流水单
    './chargemanage/index',           //财务管理-扣款管理
    './insurancecompany/index',     //基础信息-保险公司
    './suppliermanage/index',       //基础信息-供应商管理
    './commodityinformation/index', //基础信息-商品消息
    './druginformation/index',      //基础信息-药品信息
    './sessionmanager/index',       //基础信息-话术管理
    './supervisionmapping/index',   //基础信息-监管码映射
    './hospital/index',            //系统管理-医院及科室维护
    './schoolspecialty/index',     //系统管理-学校及专业维护
    './specialtysystem/index',     //系统管理-专业系统
    './specialtydepartment/index', //系统管理-专业科室
    './city/index',                //系统管理-城市
    './dictionarydata/index',      //系统管理-字典数据维护
    './doctorgroup/index',            //系统管理-医生集团维护
    './scanlogrecord/index',                  //查询统计-扫码日志记录
    './reimbursementchannelstatistics/index', //查询统计-报销渠道统计
    './branchesstatistics/index',             //查询统计-网点分布统计
    './registeruserstatistics/index',         //查询统计-注册用户统计
    './commodityclassifystatistics/index',    //查询统计-商品分类统计
    './medicalinsurancestatistics/index',     //查询统计-医保认证统计
    './complaintinformationquery/index',      //查询统计-申诉信息查询
    './respondentinformationquery/index',     //查询统计-被申诉信息查询
    './reimbursementapplicationquery/index'   //查询统计-报销申请查询
], function () {});
