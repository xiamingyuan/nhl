package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class IndexController {
    @Autowired
    private UUMService uumService;

    @Value("${sys.app.name}")
    private String appName;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView Index() throws Exception {
        return new ModelAndView("/index");
    }

    @RequestMapping(value = "/navitems", method = RequestMethod.GET)
    @ResponseBody
    public Object navItems(HttpSession session) throws Exception {
        class NewMenu implements Serializable{
            private String id;
            private String text;
            private String iconCls;
            private boolean leaf;
            private List<NewMenu> children = new ArrayList<NewMenu>();
            public String getId() {
                return id;
            }
            public void setId(String id) {
                this.id = id;
            }
            public String getText() {
                return text;
            }
            public void setText(String text) {
                this.text = text;
            }
            public String getIconCls() {
                return iconCls;
            }
            public void setIconCls(String iconCls) {
                this.iconCls = iconCls;
            }
            public boolean isLeaf() {
                return leaf;
            }
            public void setLeaf(boolean leaf) {
                this.leaf = leaf;
            }
            public List<NewMenu> getChildren() {
                return children;
            }
            public void setChildren(List<NewMenu> children) {
                this.children = children;
            }
            public NewMenu(String id, String text, String iconCls, boolean leaf) {
                this.id = id;
                this.text = text;
                this.iconCls = iconCls;
                this.leaf = leaf;
            }
        }
        Subject subject = SecurityUtils.getSubject();
        List<NewMenu> menu = new ArrayList<NewMenu>();
        //医略用户管理权限
        NewMenu userMenu = new NewMenu("user","医略用户","fa fa-user-o",false);
        boolean[] userArray = subject.isPermitted("user:list", "onlineuser:list", "userblacklist:list", "userfeedback:list", "msg:list", "doctoraudit:list");
        if (userArray[0]) {
            userMenu.children.add(new NewMenu("userlist","用户列表","fa fa-angle-right",true));
        }
        if (userArray[1]) {
            userMenu.children.add(new NewMenu("online","在线用户","fa fa-angle-right",true));
        }
        if (userArray[2]) {
            userMenu.children.add(new NewMenu("userblacklist","黑名单","fa fa-angle-right",true));
        }
        if (userArray[3]) {
            userMenu.children.add(new NewMenu("userfeedback","意见反馈","fa fa-angle-right",true));
        }
//        if (userArray[4]) {
//            userMenu.children.add(new NewMenu("message","消息发布","fa fa-angle-right",true));
//        }
        if (userArray[5]) {
            userMenu.children.add(new NewMenu("doctoraudit","医生审核","fa fa-angle-right",true));
        }
        if(userMenu.getChildren().size()!=0){
            menu.add(userMenu);
        }

        //新健康用户管理权限
        NewMenu memberMenu = new NewMenu("member","新健康用户","fa fa-user",false);
        boolean[] nhlUserArray = subject.isPermitted("member:list", "certification:list", "insurancebound:list", "membercard:list", "memberblacklist:list", "memberfeedback:list");
        //添加二级菜单
        if (nhlUserArray[0]) {
            memberMenu.children.add(new NewMenu("memberlist","用户列表","fa fa-angle-right",true));
        }
        if (nhlUserArray[3]) {
            memberMenu.children.add(new NewMenu("membercard","会员卡管理","fa fa-angle-right",true));
        }
        if (nhlUserArray[4]) {
            memberMenu.children.add(new NewMenu("blacklist","黑名单管理","fa fa-angle-right",true));
        }
        if (nhlUserArray[5]) {
            memberMenu.children.add(new NewMenu("feedback","意见反馈","fa fa-angle-right",true));
        }
        if (memberMenu.getChildren().size() != 0) {
            menu.add(memberMenu);
        }

        //业务管理管理权限
        NewMenu businessMenu = new NewMenu("business","业务管理","fa fa-database",false);
        boolean[] businessArray = subject.isPermitted("signdepart:list","famousdoctor:list");
        if(businessArray[0]){
            businessMenu.children.add(new NewMenu("signdepart","签约科室","fa fa-angle-right",true));
        }
        if(businessArray[1]){
            businessMenu.children.add(new NewMenu("famousdoctor","名医管理","fa fa-angle-right",true));
        }
        if (businessMenu.getChildren().size() != 0) {
            menu.add(businessMenu);
        }

        //基础信息管理权限
        NewMenu basicinforMenu = new NewMenu("basicinfor","基础信息","fa fa-info-circle",false);
        boolean[] biArray = subject.isPermitted("insurancecompany:list", "supplier:list", "goodscategory:list", "drugcategory:list", "knowledge:list", "regulatecodematching:list");
        //添加二级菜单
//        if (biArray[3]) {
//            basicinforMenu.children.add(new NewMenu("druginformation","药品信息","fa fa-angle-right",true));
//        }
        if (biArray[4]) {
            basicinforMenu.children.add(new NewMenu("sessionmanager","话术管理","fa fa-angle-right",true));
        }
        if (basicinforMenu.getChildren().size() != 0) {
            menu.add(basicinforMenu);
        }

        //系统管理管理权限
        NewMenu systemMenu = new NewMenu("system","系统管理","fa fa-cogs",false);
        boolean[] sysArray = subject.isPermitted("hospitaldepartment:list", "specialtysystem:list", "doctorgroup:list", "specialtydepartment:list", "schoolspecialty:list", "citymaintenance:list","disease:list", "diseasegroup:list", "dictionarydata:list");
        //添加二级菜单
//        if (sysArray[0]) {
//            systemMenu.children.add(new NewMenu("hospitaldepartment","医院及科室维护","fa fa-angle-right",true));
//        }
//        if (sysArray[2]) {
//            systemMenu.children.add(new NewMenu("specialtysystem","专业系统维护","fa fa-angle-right",true));
//        }
//        if (sysArray[3]) {
//            systemMenu.children.add(new NewMenu("specialtydepartment","专业科室维护","fa fa-angle-right",true));
//        }
//        if (sysArray[4]) {
//            systemMenu.children.add(new NewMenu("schoolspecialty","学校及专业维护","fa fa-angle-right",true));
//        }
        if (sysArray[5]) {
            systemMenu.children.add(new NewMenu("citymaintenance","城市维护","fa fa-angle-right",true));
        }
        if (sysArray[6]) {
            systemMenu.children.add(new NewMenu("disease","疾病查询","fa fa-angle-right",true));
        }
        if (sysArray[7]) {
            systemMenu.children.add(new NewMenu("diseasegroup","疾病分组","fa fa-angle-right",true));
        }
        if (sysArray[8]) {
            systemMenu.children.add(new NewMenu("dictionarydata","字典数据维护","fa fa-angle-right",true));
        }
        if (systemMenu.getChildren().size() != 0) {
            menu.add(systemMenu);
        }

        return menu;
    }

    @RequestMapping(value = "/changepwd", method = RequestMethod.POST)
    @ResponseBody
    public Object changePwd(@RequestBody Map map, HttpSession session) throws Exception {
        Map result = new HashMap();

        String uid = session.getAttribute("UID").toString();
        ServiceResult<Boolean> result1 = uumService.changePwd(uid, (String) map.get("oldPwd"), (String) map.get("newPwd"));
        result1.availableAssert(result1.getMessage());
        Boolean success = result1.getResult();
        if (success) {
            result.put("code", 200);
            result.put("msg", "更新密码成功");
        } else {
            result.put("code", 202);
            result.put("msg", "更新失败,请输入正确的原密码！");
        }
//        } catch (Exception ex) {
//            result.put("code", 201);
//            result.put("msg", "服务器错误，请稍后重试！");
//            result.put("errorInfo", ex.getMessage());
//        }
        return result;
    }


    public void setAppName(String appName) {
        this.appName = appName;
    }
}
