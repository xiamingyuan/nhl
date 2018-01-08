package cn.com.cis.mi.osp.common;

import cn.com.cis.mi.common.resources.Builder;
import org.chatLogs.domain.ChatLogInfo;
import org.chatLogs.domain.ChatLog;
import cn.com.cis.mi.osp.service.XmppSender;
import cn.com.cis.mi.service.msg.dataObjects.CommEnum;
import cn.com.cis.mi.service.msg.domain.Message;
import com.alibaba.fastjson.JSON;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.Date;
import java.util.Map;
import java.util.UUID;

/**
 * Created by localadmin on 16/5/5.
 */
public class MessageHelper {
    private static final Log logger = LogFactory.getLog(MetaDataHelper.class);

    @Autowired
    private XmppSender xmppSender;

    public boolean sendMessage(String senderId, String receiverId, String receiverType, String topicId, String topicType, String title, Map<String, String> contentMap, String pushId, String msgType) {
        try {
            logger.info("start");

            ChatLogInfo chatLogInfo = new ChatLogInfo();

            ChatLog chatLog = new ChatLog();
            chatLog.setReceiverId(receiverId);//接收人 xid
            chatLog.setReceiverType(receiverType);
            chatLog.setSenderId(senderId);//  发送人 xid
            chatLog.setSenderType("");//发送者类型
            chatLog.setSubject(title);//主题
            chatLog.setTopicId(topicId);//发送主题(病历id)
            chatLog.setTopicType(topicType);//发送主题(病历(case))
            chatLog.setMsgType(msgType);// 0：文本，1:图片 2:语音，3:离线视频，4:在线视频
            chatLog.setMsgData(contentMap != null ? JSON.toJSON(contentMap).toString() : "");

            chatLogInfo.setChatLog(chatLog);
            chatLogInfo.setPushId(pushId);

            Object content = JSON.toJSON(chatLogInfo);

            xmppSender.send(receiverId, content.toString(), 1);

            logger.info("end");
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    //获取审核消息
    public static Message getMessage(Map<String, String> messagemap, String userid, String msgType, boolean isAuditResult) {
        String msgTitle = "";
        String msgContent = "";
        if (isAuditResult) {
            msgTitle = Builder.find("success").parseTitle(messagemap);
            msgContent = Builder.find("success").parseContent(messagemap);
        } else {
            msgTitle = Builder.find("refuse").parseTitle(messagemap);
            msgContent = Builder.find("refuse").parseContent(messagemap);
        }
        Message msgModel = new Message();
        msgModel.setId(UUID.randomUUID().toString());
        msgModel.setTitle(msgTitle);
        msgModel.setContent(msgContent);
        msgModel.setPlansendTime(new Date());
        msgModel.setReceiver_id(userid);
        msgModel.setReceiverType(CommEnum.ReceiverType.T_USER.toString());
        msgModel.setMessageType_id(msgType);
        return msgModel;
    }
}
