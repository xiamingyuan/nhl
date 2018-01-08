package org.chatLogs.service;

import org.chatLogs.domain.ChatLog;

import java.util.List;
import java.util.Map;

/**
 * Created by zhouxiaolong on 16/12/17.
 */
public interface ChatLogsService {
    /**
     * 根据主键id将聊天记录置为1-已读
     *
     * @param id
     * @return
     */
    boolean readChatLogById(String id);

    /**
     * 根据条件将聊天记录置为1-已读
     *
     * @param senderId
     * @param receiverId
     * @return
     */
    boolean readChatLogs(String senderId, String receiverId);

    /**
     * 根据条件将聊天记录置为1-已读
     *
     * @param senderId
     * @param receiverId
     * @param receiverType
     * @param topicType
     * @param topicId
     * @return
     */
    boolean readChatLogs(String senderId, String receiverId, String receiverType, String topicType, String topicId);

    /**
     * 多类型置已读
     *
     * @param receiverId
     * @param caseId
     * @param subCaseId
     * @param topicTypes
     * @return
     */
    boolean readChatLogsByTopicType(String receiverId, String caseId, String subCaseId, List<String> topicTypes);

    /**
     * 获取浮动消息列表
     *
     * @param senderId
     * @param receiverId
     * @return List<ChatLog>
     */
    List<ChatLog> queryFloatChatLogs(String senderId, String receiverId);

    /**
     * 关闭浮动消息
     *
     * @param id
     * @return boolean
     */
    boolean closeFloatChatLog(String id);

    /**
     * 根据主键id查询聊天记录
     *
     * @param id
     * @return
     */
    ChatLog queryChatLogById(String id);

    /**
     * 根据条件查询聊天记录
     *
     * @param receiverId
     * @param receiverType
     * @param topicType
     * @param topicId
     * @param isReaded
     * @param pageIndex
     * @param pageSize
     * @return
     */
    List<ChatLog> queryChatLogs(String receiverId, String receiverType, String topicType, String topicId, String isReaded, int pageIndex, int pageSize);

    /**
     * 获取未读消息数
     *
     * @param senderId
     * @param receiverId
     * @param topicType
     * @return
     */
    int getUnreadChatCount(String senderId, String receiverId, String topicType, String topicId);

    /**
     * 根据用户ID获取群聊未读消息数
     *
     * @param userId
     * @param userType
     * @return
     *
     * userType: "1": 医生 "2": 患者
     */
    Map<String, Integer> getUnreadCountForMucByUserId(int userId, String userXid, String userType);

    /**
     * 查询未读聊天记录
     *
     * @param receiverId
     * @param receiverType
     * @return
     */
    List<ChatLog> queryUnreadChatLogs(String receiverId, String receiverType);

    /**
     * 获取双方聊天记录
     *
     * @param selfId
     * @param contactId
     * @param topicType
     * @param topicId
     * @param pageIndex
     * @param pageSize
     * @return
     */
    List<ChatLog> getChatHistory(String selfId, String contactId, String topicType, String topicId, long createTime, int pageIndex, int pageSize);

    /**
     * 获取群聊历史记录
     *
     * @param receiverId
     * @param topicType
     * @param topicId
     * @param createTime
     * @param pageIndex
     * @param pageSize
     * @return
     */
    List<ChatLog> getGroupChatHistory(String senderId, String receiverId, String topicType, String topicId, long createTime, int pageIndex, int pageSize);

    /**
     * 获取多类型的消息记录
     *
     * @param receiverId
     * @param receiverType
     * @param topicTypes
     * @param pageIndex
     * @param pageSize
     * @return
     */
    List<ChatLog> queryMultiTopicTypeChatLogs(String receiverId, String receiverType, List<String> topicTypes, int pageIndex, int pageSize);

    /**
     * 更新置顶状态
     *
     * @param senderId
     * @param receiverId
     * @param top
     * @return
     */
    boolean updateTop(String senderId, String receiverId, boolean top);

    /**
     * 更新免打扰状态
     *
     * @param senderId
     * @param receiverId
     * @param dontDisturb
     * @return
     */
    boolean updateDontDisturb(String senderId, String receiverId, boolean dontDisturb);
}
