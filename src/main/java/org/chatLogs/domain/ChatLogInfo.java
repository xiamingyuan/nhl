package org.chatLogs.domain;

/**
 * Created by konglh on 17/1/23.
 */
public class ChatLogInfo {
    private ChatLog chatLog;

    private String pushId;

    public ChatLog getChatLog() {
        return chatLog;
    }

    public void setChatLog(ChatLog chatLog) {
        this.chatLog = chatLog;
    }

    public String getPushId() {
        return pushId;
    }

    public void setPushId(String pushId) {
        this.pushId = pushId;
    }
}
