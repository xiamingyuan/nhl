package cn.com.cis.mi.osp.common;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * Created by zhanghao on 17/4/20.
 */
public class PhoneNumHelper {
    private static final Log logger = LogFactory.getLog(MetaDataHelper.class);

    public static String hidePhoneNum(String phoneNum) {
        String newPhoneNum = "";
        if (!StringUtils.isEmpty(phoneNum)) {
            newPhoneNum = phoneNum.substring(0,3) + "****" + phoneNum.substring(7, 11);
        }
        return newPhoneNum;
    }
}
