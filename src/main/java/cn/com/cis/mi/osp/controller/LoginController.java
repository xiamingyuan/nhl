package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.service.uum.UUMService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class LoginController {
    @Autowired
    private UUMService uumService;

    @Value("${sys.app.name}")
    private String appName;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model) {
        Subject subject = SecurityUtils.getSubject();
        if (subject != null && subject.isAuthenticated()) {
            subject.logout();
        }
        model.addAttribute("appname", this.appName);
        return "/login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(HttpSession session, Model model) {
        Subject subject = SecurityUtils.getSubject();
        if (subject != null && subject.isAuthenticated()) {
            return "redirect:/";
        } else {
            Object loginError = session.getAttribute("login_error");
            if (loginError != null) {
                model.addAttribute("message", loginError);
            } else {
                model.addAttribute("message", "请输入正确的用户名和密码！");
            }
            model.addAttribute("appname", this.appName);
            return "/login";
        }
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout() {
        Subject subject = SecurityUtils.getSubject();
        if (subject != null && subject.isAuthenticated()) {
            subject.logout();
        }
        return "/login";
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }
}
