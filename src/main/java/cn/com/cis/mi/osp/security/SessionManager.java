package cn.com.cis.mi.osp.security;

import cn.com.cis.mi.service.uum.UUMService;
import org.apache.commons.logging.Log;
import org.apache.shiro.session.ExpiredSessionException;
import org.apache.shiro.session.InvalidSessionException;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.AbstractValidatingSessionManager;
import org.apache.shiro.session.mgt.DefaultSessionKey;
import org.apache.shiro.session.mgt.SessionKey;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;

/**
 * Created by zhaoyonghuan on 16/7/13.
 * 重写会话验证器
 */
public class SessionManager extends DefaultWebSessionManager {

    private static final Logger log = LoggerFactory.getLogger(SessionManager.class);
    @Autowired
    private UUMService uumService;
    public void validateSessions() {

        Collection<Session> activeSessions = getActiveSessions();

        if (activeSessions != null && !activeSessions.isEmpty()) {
            for (Session s : activeSessions) {
                try {
                    //simulate a lookup key to satisfy the method signature.
                    //this could probably stand to be cleaned up in future versions:
                    SessionKey key = new DefaultSessionKey(s.getId());
                    validate(s, key);
                } catch (InvalidSessionException e) {
                    //delete失效用户,调用sessionDao的delete方法
                    log.info("Session were stopped");
                }
            }
        }
//        else{  //不存在活跃用户,清空本系统的用户在线表
//            uumService.removeAllOnlineUser("osp");
//            log.info("Clean up the online users");
//        }

    }
}
