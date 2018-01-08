package org.chatLogs.service;

import java.util.List;
import java.util.Map;

/**
 * Created by zhouxiaolong on 16/12/23.
 */
public interface AttentionService {

    /**
     * 添加关注
     *
     * @param username 关注者xid
     * @param subName  被关注者xid
     * @return
     */
    boolean addAttention(String username, String subName);

    /**
     * 判断是否关注
     *
     * @param username
     * @param subName
     * @return
     */
    boolean isAttention(String username, String subName);

    /**
     * 取消关注
     *
     * @param username
     * @param subName
     * @return
     */
    boolean delAttention(String username, String subName);

    /**
     * 获取关注列表
     *
     * @param username    关注者xid
     * @param searchKey   搜索词
     * @param contactType 联系人类型
     * @param groupId     所属分组
     * @param pageIndex   请求第几页
     * @param pageSize    每页几笔
     * @return
     */
    List<Map> getAttentionList(String username, String searchKey, String contactType, String groupId, int pageIndex, int pageSize);


    /**
     * 获取关注关系
     *
     * @param username
     * @param subName
     * @return -1:subName关注了username
     * 0:没有关系
     * 1:username关注了subName
     * 2:互相关注
     */
    int getAttentionRelation(String username, String subName);

    //更新最后清空聊天记录时间
    boolean updateRosterLastClearMsgTime(String username, String subName);

    //更新消息免打扰状态
    boolean updateRosterDontDisturbStatus(String username, String subName, String status);

    //设置关注好友是否置顶
    boolean setRosterIsTop(String username, String subName, String status);
}
