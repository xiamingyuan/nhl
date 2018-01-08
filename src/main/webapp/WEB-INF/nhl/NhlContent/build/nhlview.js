/**
 * Created by apple on 2017/3/29.
 */
var viewSet = {};
viewSet.tree = [
    {
        'id' :'userlist',
        'view' : 'NhlApp.view.user.userlist.UserList',
        'parentId' : 'user',
        'routeId' : 'userlist'
    },
    {
        'id' :'userlist/detail/',
        'view' : 'NhlApp.view.user.userlist.userdetail.UserDetail',
        'parentId' : 'user',
        'routeId' : 'userlist'
    },
    {
        'id' :'online',
        'view' : 'NhlApp.view.user.online.OnlineList',
        'parentId' : 'user',
        'routeId' : 'online'
    },
    {
        'id' :'userfeedback',
        'view' : 'NhlApp.view.user.feedback.FeedBackList',
        'parentId' : 'user',
        'routeId' : 'userfeedback'
    },
    {
        'id' :'userblacklist',
        'view' : 'NhlApp.view.user.blacklist.BlackList',
        'parentId' : 'user',
        'routeId' : 'userblacklist'
    },
    {
        'id' :'message',
        'view' : 'NhlApp.view.user.message.Message',
        'parentId' : 'user',
        'routeId' : 'message'
    },
    {
        'id' :'message/detail/',
        'view' : 'NhlApp.view.user.message.messagedetail.MessageDetail',
        'parentId' : 'user',
        'routeId' : 'message'
    },
    {
        'id' :'message/edit/',
        'view' : 'NhlApp.view.user.message.messageedit.MessageEdit',
        'parentId' : 'user',
        'routeId' : 'message'
    },
    {
        'id' :'message/messagepub',
        'view' : 'NhlApp.view.user.message.messagepub.MessagePub',
        'parentId' : 'user',
        'routeId' : 'message'
    },
    {
        'id' :'doctoraudit',
        'view' : 'NhlApp.view.user.doctoraudit.DoctorAuditList',
        'parentId' : 'user',
        'routeId' : 'doctoraudit'
    },
    {
        'id' :'doctoraudit/detail/',
        'view' : 'NhlApp.view.user.doctoraudit.doctorauditdetail.DoctorAuditDetail',
        'parentId' : 'user',
        'routeId' : 'doctoraudit'
    },
    {
        'id' :'doctoraudit/check',
        'view' : 'NhlApp.view.user.doctoraudit.doctorauditcheck.DoctorAuditCheck',
        'parentId' : 'user',
        'routeId' : 'doctoraudit'
    },
    {//member
        'id' :'memberlist',
        'view' : 'NhlApp.view.member.memberlist.MemberList',
        'parentId' : 'member',
        'routeId' : 'memberlist'
    },
    {//member
        'id' :'memberlist/detail/',
        'view' : 'NhlApp.view.member.memberlist.memberdetail.MemberDetail',
        'parentId' : 'member',
        'routeId' : 'memberlist'
    },
    {//member_certification
        'id' :'certification',
        'view' : 'NhlApp.view.member.certification.Certification',
        'parentId' : 'member',
        'routeId' : 'certification'
    },
    {//member_certification
        'id' :'micardbind',
        'view' : 'NhlApp.view.member.micardbind.MicardBind',
        'parentId' : 'member',
        'routeId' : 'micardbind'
    },
    {//member_membercard
        'id' :'membercard',
        'view' : 'NhlApp.view.member.membercard.MemberCard',
        'parentId' : 'member',
        'routeId' : 'membercard'
    },
    {//member_membercardDetail
        'id' :'membercard/detail/',
        'view' : 'NhlApp.view.member.membercard.membercarddetail.MemberCardDetail',
        'parentId' : 'member',
        'routeId' : 'membercard'
    },
    {//member_blacklist
        'id' :'blacklist',
        'view' : 'NhlApp.view.member.blacklist.BlackList',
        'parentId' : 'member',
        'routeId' : 'blacklist'
    },
    {//member_feedback
        'id' :'feedback',
        'view' : 'NhlApp.view.member.feedback.FeedBackList',
        'parentId' : 'member',
        'routeId' : 'feedback'
    },
    {//business_signDepart签约科室
        'id' :'signdepart',
        'view' : 'NhlApp.view.business.signdepart.SignDepart',
        'parentId' : 'business',
        'routeId' : 'signdepart'
    },{//business_addsignDepart添加签约科室
        'id' :'signdepart/add/',
        'view' : 'NhlApp.view.business.signdepart.signdepartadd.SignDepartAdd',
        'parentId' : 'business',
        'routeId' : 'signdepart'
    },
    {//business_editsignDepart编辑签约科室
        'id' :'signdepart/edit/',
        'view' : 'NhlApp.view.business.signdepart.signdepartedit.SignDepartEdit',
        'parentId' : 'business',
        'routeId' : 'signdepart'
    },
    {//business_signDepartDetail签约科室详情
        'id' :'signdepart/detail/',
        'view' : 'NhlApp.view.business.signdepart.signdepartdetail.SignDepartDetail',
        'parentId' : 'business',
        'routeId' : 'signdepart'
    },
    {//business_signDepartDisease签约科室疾病
        'id' :'signdepart/disease/',
        'view' : 'NhlApp.view.business.signdepart.signdepartdisease.SignDepartDisease',
        'parentId' : 'business',
        'routeId' : 'signdepart'
    },
    {//business_famousdoctor名医管理
        'id' :'famousdoctor',
        'view' : 'NhlApp.view.business.famousdoctor.FamousDoctor',
        'parentId' : 'business',
        'routeId' : 'famousdoctor'
    },{//basicinfor 基础信息
        'id' :'druginformation',
        'view' : 'NhlApp.view.basicinfor.druginfor.DrugInfor',
        'parentId' : 'basicinfor',
        'routeId' : 'druginformation'
    },
    {
        'id' :'sessionmanager',
        'view' : 'NhlApp.view.basicinfor.sessionmanager.SessionManager',
        'parentId' : 'basicinfor',
        'routeId' : 'sessionmanager'
    },
    {
        'id' :'sessionmanager/add/',
        'view' : 'NhlApp.view.basicinfor.sessionmanager.sessionmanageradd.SessionManagerAdd',
        'parentId' : 'basicinfor',
        'routeId' : 'sessionmanager'
    },
    {
        'id' :'sessionmanager/edit/',
        'view' : 'NhlApp.view.basicinfor.sessionmanager.sessionmanageredit.SessionManagerEdit',
        'parentId' : 'basicinfor',
        'routeId' : 'sessionmanager'
    },
    {//system 系统管理_医院及科室维护
        'id' :'hospitaldepartment',
        'view' : 'NhlApp.view.system.hospitaldepartment.HospitalDepartment',
        'parentId' : 'system',
        'routeId' : 'hospitaldepartment'
    }, {//system 系统管理_医院及科室维护 详情
        'id' :'hospitaldepartment/detail/',
        'view' : 'NhlApp.view.system.hospitaldepartment.hospitaldepartmentdetail.HospitalDepartmentDetail',
        'parentId' : 'system',
        'routeId' : 'hospitaldepartment'
    },
    {//system 系统管理_医院及科室维护 添加医院
        'id' :'hospitaldepartment/add/',
        'view' : 'NhlApp.view.system.hospitaldepartment.hospitaldepartmentadd.HospitalDepartmentAdd',
        'parentId' : 'system',
        'routeId' : 'hospitaldepartment'
    },
    {//system 系统管理_医院及科室维护 编辑医院
        'id' :'hospitaldepartment/edit/',
        'view' : 'NhlApp.view.system.hospitaldepartment.hospitaldepartmentedit.HospitalDepartmentEdit',
        'parentId' : 'system',
        'routeId' : 'hospitaldepartment'
    },
    {//system 系统管理_医生集团
        'id' :'doctorgroup',
        'view' : 'NhlApp.view.system.doctorgroup.DoctorGroup',
        'parentId' : 'system',
        'routeId' : 'doctorgroup'
    },
    {//system 系统管理_医生集团 详情
        'id' :'doctorgroup/detail/',
        'view' : 'NhlApp.view.system.doctorgroup.doctorgroupdetail.DoctorGroupDetail',
        'parentId' : 'system',
        'routeId' : 'doctorgroup'
    },
    {//system 系统管理_专业系统维护
        'id' :'specialtysystem',
        'view' : 'NhlApp.view.system.specialtysystem.SpecialtySystem',
        'parentId' : 'system',
        'routeId' : 'specialtysystem'
    },
    {//system 系统管理_专业科室维护
        'id' :'specialtydepartment',
        'view' : 'NhlApp.view.system.specialtydepartment.SpecialtyDepartment',
        'parentId' : 'system',
        'routeId' : 'specialtydepartment'
    },
    {//system 系统管理_学校及专业维护
        'id' :'schoolspecialty',
        'view' : 'NhlApp.view.system.schoolspecialty.SchoolSpecialty',
        'parentId' : 'system',
        'routeId' : 'schoolspecialty'
    },
    {//system 系统管理_学校及专业维护  详情
        'id' :'schoolspecialty/detail/',
        'view' : 'NhlApp.view.system.schoolspecialty.schoolspecialtydetail.SchoolSpecialtyDetail',
        'parentId' : 'system',
        'routeId' : 'schoolspecialty'
    },
    {//system 系统管理_城市维护
        'id' :'citymaintenance',
        'view' : 'NhlApp.view.system.city.City',
        'parentId' : 'system',
        'routeId' : 'citymaintenance'
    },
    {//system 系统管理_疾病查询
        'id' :'disease',
        'view' : 'NhlApp.view.system.disease.DiseaseList',
        'parentId' : 'system',
        'routeId' : 'disease'
    },
    {//system 系统管理_疾病分组
        'id' :'diseasegroup',
        'view' : 'NhlApp.view.system.diseasegroup.DiseaseGroup',
        'parentId' : 'system',
        'routeId' : 'diseasegroup'
    },
    {//system 系统管理_字典数据维护
        'id' :'dictionarydata',
        'view' : 'NhlApp.view.system.dictionary.Dictionary',
        'parentId' : 'system',
        'routeId' : 'dictionarydata'
    },
    {//querystatistics 查询统计_注册用户统计
        'id' :'registeruserstatistics',
        'view' : 'NhlApp.view.querystatistics.registeruser.RegisterUser',
        'parentId' : 'querystatistics',
        'routeId' : 'registeruserstatistics'
    }
];