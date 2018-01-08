package cn.com.cis.mi.osp.service;


import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.service.healthRcdsService.HealthServiceSoap;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by shensh on 16/4/18.
 */
public class HealthRcdsService {
    private final Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    private HealthServiceSoap healthServiceSoap;

    public ServiceResult<Boolean> identification(String userId, String idno) {
        try {
            String result = healthServiceSoap.identification(userId, idno);
          //  -1 是已经存在认证了 0 表示认证失败 1 表示认证成功
            return new ServiceResult<Boolean>(true);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ServiceResult<Boolean>(false);
        }
    }
}
