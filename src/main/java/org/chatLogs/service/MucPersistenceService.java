package org.chatLogs.service;

import java.util.List;
import java.util.Map;

/**
 * Created by zhouxiaolong on 17/1/5.
 */
public interface MucPersistenceService {

    /**
     * 创建房间
     *
     * @param user
     * @param roomName
     * @return
     */
    boolean createRoom(String user, String roomName);

    /**
     * 批量将多个用户加入单个房间
     *
     * @param roomName
     * @param users
     * @return
     */
    boolean addUsersToRoom(String roomName, List<String> users);

    /**
     * 批量将单个用户加入多个房间
     *
     * @param roomNames
     * @param user
     * @return
     */
    boolean addUserToRooms(List<String> roomNames, String user);

    /**
     * 批量将多个用户踢出单个房间
     *
     * @param roomName
     * @param users
     * @return
     */
    boolean removeUsersFromRoom(String roomName, List<String> users);

    /**
     * 批量将单个用户踢出多个房间
     *
     * @param roomNames
     * @param user
     * @return
     */
    boolean removeUserFromRooms(List<String> roomNames, String user);

    /**
     * 获取房间成员
     *
     * @param roomName
     * @return
     */
    List<Map> getRoomMembers(String roomName);

    /**
     * 是否是房间成员
     *
     * @param roomName
     * @param user
     * @return
     */
    boolean isRoomMember(String roomName, String user);


}
