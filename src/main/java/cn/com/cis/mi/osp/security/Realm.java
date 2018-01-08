package cn.com.cis.mi.osp.security;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import cn.com.cis.mi.service.uum.dataObjects.*;
import cn.com.cis.mi.service.uum.domain.App;
import cn.com.cis.mi.utils.SecurityHelper;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpSession;
import java.security.NoSuchAlgorithmException;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by tangwenpei on 15/12/2.
 */
public class Realm extends AuthorizingRealm {
    private static final Log logger = LogFactory.getLog(Realm.class);

    @Autowired
    private UUMService uumService;

    private String appCode = "";

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) throws AuthenticationException {
//        String username = (String)principals.getPrimaryPrincipal();
        try {
            String uid = String.valueOf(getSession("UID"));

            SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
            Set<String> roles = getRoles(uid);
            Set<String> perms = getPerms(uid);

            authorizationInfo.setRoles(roles);
            authorizationInfo.setStringPermissions(perms);

            return authorizationInfo;
        } catch (Exception ex) {
           return null;
        }
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        String username = token.getUsername();
        String password = String.valueOf(token.getPassword());

        if (StringUtils.isNotBlank(username) && StringUtils.isNotBlank(password)) {
            ServiceResult<Boolean> loginResult = uumService.getOspUser(username, password);
//            loginResult.availableAssert(loginResult.getMessage());
            if (loginResult.getResult()) {
                ServiceResult<UserInfo> userInfo = uumService.getUserByName(username);
//                userInfo.availableAssert(userInfo.getMessage());
                try {
                    if (userInfo != null) {
                        boolean hasApp = true;
//                        Set<String> perms = getPerms(userInfo.getResult().getId());
//                    for (String perm:perms) {
//                        if (StringUtils.startsWith(perm, this.appCode)) {
//                            hasApp = true;
//                            break;
//                        }
//                    }
//                        if (perms != null && perms.size() > 0) {
//                            hasApp = true;
//                        }
                        if (hasApp) {
                            AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(username, password, "");
                            setSession("RealName", userInfo.getResult().getUsername());
                            setSession("UserName", username);
                            setSession("UID", userInfo.getResult().getId());
                            logger.info("登录成功");
                            return authcInfo;
                        } else {
                            setSession("login_error", "不允许访问该系统,请联系管理员！");
                            return null;
                        }
                    }
                } catch (Exception e) {
                    logger.error(e.getMessage());
                }
            }
        }
        logger.info("登录失败");
        setSession("login_error", "请输入正确的用户名和密码！");
        return null;
    }

    private Set<String> getRoles(String uid) throws Exception {
        Set<String> roles = new HashSet<String>();
        ServiceResult<List<UserRoleInfo>> roleInfoList = uumService.getUserRole(uid);
        roleInfoList.availableAssert(roleInfoList.getMessage());
        for (UserRoleInfo role : roleInfoList.getResult()) {
            roles.add(role.getId());
        }
        return roles;
    }

    private Set<String> getPerms(String uid) {
        Set<String> perms = new HashSet<String>();
        Map<Integer, String> appMap = new HashedMap();
        ServiceResult<List<App>> appInfos = uumService.getAppAll();
//        appInfos.availableAssert(appInfos.getMessage());
        if (appInfos != null) {
            for (App app : appInfos.getResult()) {
                appMap.put(app.getId(), app.getCode());
            }
        }
        ServiceResult<List<PermissionInfo>> permsInfoList = uumService.getPermissionByUserId(uid);
        for (PermissionInfo perm : permsInfoList.getResult()) {
            // 去掉权限项的OSP前缀
//            perms.add(appMap.get(perm.getAppId()) + ":" + perm.getCode());
            if (this.appCode.equals(appMap.get(perm.getAppId()))) {
                perms.add(perm.getCode());
            }
        }
        return perms;
    }


    private void setSession(Object key, Object value) {
        Subject currentUser = SecurityUtils.getSubject();
        if (null != currentUser) {
            Session session = currentUser.getSession();
            System.out.println("Session默认超时时间为[" + session.getTimeout() + "]毫秒");
            if (null != session) {
                session.setAttribute(key, value);
            }
        }
    }

    private Object getSession(Object key) {
        Subject currentUser = SecurityUtils.getSubject();
        if (null != currentUser) {
            Session session = currentUser.getSession();
            System.out.println("Session默认超时时间为[" + session.getTimeout() + "]毫秒");
            if (null != session) {
                return session.getAttribute(key);
            }
        }
        return null;
    }

    @Override
    public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        super.clearCachedAuthenticationInfo(principals);
    }

    @Override
    public void clearCache(PrincipalCollection principals) {
        super.clearCache(principals);
    }

    public String getAppCode() {
        return appCode;
    }

    public void setAppCode(String appCode) {
        this.appCode = appCode;
    }
}
