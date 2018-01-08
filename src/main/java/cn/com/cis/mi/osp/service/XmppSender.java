package cn.com.cis.mi.osp.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.SmackException;
import org.jivesoftware.smack.chat.Chat;
import org.jivesoftware.smack.chat.ChatManager;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;

/**
 * Created by konglh on 17/1/23.
 */
public class XmppSender {protected final Log log = LogFactory.getLog(getClass());

    private XMPPTCPConnection connection = null;

    public boolean connect() {
        try {
            XMPPTCPConnectionConfiguration connectionConfig = XMPPTCPConnectionConfiguration.builder()
                    .setUsernameAndPassword(username, password)
                    .setServiceName(serverName)
                    .setHost(server)
                    .setPort(5222)
                    .setConnectTimeout(3000)
                    .setSendPresence(false) // 设置用户是否上线
                    .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled) //不使用安全模式
                    .build();
            this.connection = new XMPPTCPConnection(connectionConfig);
            this.connection.connect();
            connection.login();
            return true;
        } catch (Exception e) {
            log.error(e);
            return false;
        }
    }

    public boolean send(String username, String message, int badge) {
        try {
            boolean send = true;
            if (this.connection == null || !this.connection.isConnected() || !connection.isAuthenticated()) {

                log.info("准备连接 xmpp.........");
                send = connect();
                log.info("xmpp连接成功..........");
            }
            if (send) {
                if (this.connection != null && this.connection.isConnected()) {
                    log.info("xmpp准备发送消息..........");
                    ChatManager chatManager = ChatManager.getInstanceFor(connection);
                    Chat chat = chatManager.createChat(username + "@" + serverName);
                    chat.sendMessage(message);
                    log.info("xmpp消息发送成功..........");
                    return true;
                }
            }
            log.error("xmpp连接失败,消息发送失败.......... 发送内容 : " + message);
            return false;
        } catch (SmackException.NotConnectedException e) {
            log.error(e);
            return false;
        }
    }

    private String server;
    private String username;
    private String password;
    private String serverName;

    public void setServer(String server) {
        this.server = server;
    }

    public String getServer() {
        return server;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public String getServerName() {
        return serverName;
    }
}
