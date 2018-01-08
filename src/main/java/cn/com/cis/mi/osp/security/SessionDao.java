package cn.com.cis.mi.osp.security;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import cn.com.cis.mi.service.uum.dataObjects.OnlineUserInfo;
import cn.com.cis.mi.service.uum.domain.OnlineUser;
import cn.com.cis.mi.utils.DateFormartHelper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.eis.AbstractSessionDAO;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.CollectionUtils;
import org.apache.shiro.web.servlet.ServletContextSupport;
import org.apache.shiro.web.subject.WebSubject;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.*;

import static org.apache.shiro.SecurityUtils.getSubject;

/**
 * Created by zhaoyonghuan on 16/7/8.
 */
public class SessionDao extends AbstractSessionDAO{

    @Autowired
    private UUMService uumService;

    @Autowired
    private org.apache.shiro.mgt.SecurityManager  securityManager;
    //存放所有的登录session
    private Map<Serializable,Session> map = new HashMap<Serializable,Session>();

    private Log log = LogFactory.getLog(SessionDao.class);

    private String appCode;
    @Override
    protected Serializable doCreate(Session session) {
        Serializable sessionId = generateSessionId(session);
        assignSessionId(session, sessionId);
        map.put(session.getId(), session);
        log.info("doCreate创建session:"+session.getId());
        return sessionId;
    }

    @Override
    protected Session doReadSession(Serializable sessionId) {
//        System.out.println("doReadSession");

        Session session = map.get(sessionId);

        if(session != null ){
            String flag = session.getAttribute("flag")==null?"":(String)session.getAttribute("flag");
            String quit = session.getAttribute("quit")==null?"":(String)session.getAttribute("quit");
            if("true".equals(flag)){    //判断,如果为登录状态再去校验是否被踢
                String loginName = session.getAttribute("RealName") == null?"":(String)session.getAttribute("RealName");
                //校验当前用户是否被踢出
                if(loginName != null && !"".equals(loginName)){
                    ServiceResult<List<OnlineUserInfo>> list = uumService.queryOnlineUser(loginName,this.appCode);
                    if(list != null && list.getResult().size()>0){
                        log.info("doReadSession 设置session延长3600000毫秒:"+session.getId());
                        session.setTimeout(3600000);
                    }else{
                        map.remove(session.getId());
                        log.info("doReadSession 设置session超时:"+session.getId());
                        session.setTimeout(0);
                    }
                }
            }
        }

        return map.get(sessionId);
    }

    @Override
    public void update(Session session) throws UnknownSessionException {

        //添加在线用户
        if(session != null ){
            String loginName = session.getAttribute("RealName") == null?"":(String)session.getAttribute("RealName");
            String flag = session.getAttribute("flag") == null?"":(String)session.getAttribute("flag");
            if(loginName != null && !"".equals(loginName) && !"true".equals(flag)){
                map.put(session.getId(),session);
                uumService.addOnlineUser(session.getHost(),session.getId().toString(),loginName,this.appCode);
                session.setAttribute("flag","true");//登录操作标识,不重复操作
                log.info("update添加用户");
            }
        }


    }

    //退出或者session超时时调用该方法踢出用户并清理session
    public void delete(Session session) {

        if(session != null){
            String currentLoginName = (String)session.getAttribute("RealName");//当前登录用户
            if(currentLoginName != null && !"".equals(currentLoginName)){
                uumService.kickOnlineUser(currentLoginName,this.appCode);
                map.remove(session.getId());
                log.info("delete移除session:"+session.getId());
            }
//            else{
//                map.remove(session.getId());
//                log.info("delete移除无用户名session:"+session.getId());
//            }
        }
    }

    //重写获取活动session方法
    public Collection<Session> getActiveSessions() {

        Collection<Session> c = new ArrayList<Session>();
        Iterator it = map.keySet().iterator();
        while(it.hasNext()){
            Serializable s = (Serializable)it.next();
            Session session = map.get(s);
            String loginName = (String)session.getAttribute("RealName");
            log.info("用户:"+loginName);
            if(loginName != null && !"".equals(loginName)){
                c.add(session);
            }
            log.info("session剩余时间:"+session.getTimeout());
        }
        log.info("当前活跃用户:"+c.size()+"个");

        return c;

    }

    public String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        Enumeration<String> s = request.getHeaderNames();
        while(s.hasMoreElements()){
            String headerName = (String )s.nextElement();
            System.out.println("header元素:"+headerName+"|"+request.getHeader(headerName));
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    public String getAppCode() {
        return appCode;
    }

    public void setAppCode(String appCode) {
        this.appCode = appCode;
    }
}
