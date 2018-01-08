package org.chatLogs.domain;

import java.io.Serializable;
import java.util.Date;
/**
 * Created by konglh on 17/1/23.
 */
public class ChatLog implements Serializable {
    private String id;
    private String mucRoomMsgId;//群聊分发消息共同标示
    private String receiverId;
    private String receiverType;
    private String senderId;
    private String senderType;
    private Date sendTime;
    private String planId;
    private Date planSendTime;
    private String subject;
    private String topicId;
    private String topicType;
    private Date createTime;
    private String msgType;
    private String msgData;
    private String isReaded;
    private Date readTime;
    private String senderName;
    private String senderAvatar;
    private String dontDisturbStatus;//消息免打扰状态
    private String origin;//原始发送者，用于区别群聊消息发送者。
    private String doFloat;//是否浮动 0: 不浮动 1: 浮动
    private String floatText;//浮动消息文本
    private String floatClose;//浮动是否关闭 0: 浮动开启 1: 浮动关闭
    private Date floatCloseTime;//浮动关闭时间
    private String departId;//会话所属病历对应科室ID
    private String groupId;//会话所属病历对应科室分组ID
    private String tempChat;//临时会话 0: 非临时 1: 临时
    private String isRemind;//是否提醒 0: 非提醒 1: 提醒消息


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMucRoomMsgId() {
        return mucRoomMsgId;
    }

    public void setMucRoomMsgId(String mucRoomMsgId) {
        this.mucRoomMsgId = mucRoomMsgId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getReceiverType() {
        return receiverType;
    }

    public void setReceiverType(String receiverType) {
        this.receiverType = receiverType;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getSenderType() {
        return senderType;
    }

    public void setSenderType(String senderType) {
        this.senderType = senderType;
    }

    public Date getSendTime() {
        return sendTime;
    }

    public void setSendTime(Date sendTime) {
        this.sendTime = sendTime;
    }

    public String getPlanId() {
        return planId;
    }

    public void setPlanId(String planId) {
        this.planId = planId;
    }

    public Date getPlanSendTime() {
        return planSendTime;
    }

    public void setPlanSendTime(Date planSendTime) {
        this.planSendTime = planSendTime;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTopicId() {
        return topicId;
    }

    public void setTopicId(String topicId) {
        this.topicId = topicId;
    }

    public String getTopicType() {
        return topicType;
    }

    public void setTopicType(String topicType) {
        this.topicType = topicType;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getMsgType() {
        return msgType;
    }

    public void setMsgType(String msgType) {
        this.msgType = msgType;
    }

    public String getMsgData() {
        return msgData;
    }

    public void setMsgData(String msgData) {
        this.msgData = msgData;
    }

    public Date getReadTime() {
        return readTime;
    }

    public void setReadTime(Date readTime) {
        this.readTime = readTime;
    }

    public String getIsReaded() {
        return isReaded;
    }

    public void setIsReaded(String isReaded) {
        this.isReaded = isReaded;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderAvatar() {
        return senderAvatar;
    }

    public void setSenderAvatar(String senderAvatar) {
        this.senderAvatar = senderAvatar;
    }

    public String getDontDisturbStatus() {
        return dontDisturbStatus;
    }

    public void setDontDisturbStatus(String dontDisturbStatus) {
        this.dontDisturbStatus = dontDisturbStatus;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDoFloat() {
        return doFloat;
    }

    public void setDoFloat(String doFloat) {
        this.doFloat = doFloat;
    }

    public String getFloatClose() {
        return floatClose;
    }

    public void setFloatClose(String floatClose) {
        this.floatClose = floatClose;
    }

    public String getFloatText() {
        return floatText;
    }

    public void setFloatText(String floatText) {
        this.floatText = floatText;
    }

    public Date getFloatCloseTime() {
        return floatCloseTime;
    }

    public void setFloatCloseTime(Date floatCloseTime) {
        this.floatCloseTime = floatCloseTime;
    }

    public String getTempChat() {
        return tempChat;
    }

    public void setTempChat(String tempChat) {
        this.tempChat = tempChat;
    }

    public String getDepartId() {
        return departId;
    }

    public void setDepartId(String departId) {
        this.departId = departId;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getIsRemind() {
        return isRemind;
    }

    public void setIsRemind(String isRemind) {
        this.isRemind = isRemind;
    }
}
