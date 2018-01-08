package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.osp.common.DrugInfoXml;
import cn.com.cis.mi.osp.common.MySortList;
import cn.com.cis.mi.osp.common.Result;
import cn.com.cis.mi.service.p1.P1Service;
import cn.com.cis.mi.service.p1.dataObjects.P1GoodsDrugInfo;
import cn.com.cis.mi.utils.dataObjects.QueryResult;
import com.mongodb.*;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.eclipse.jetty.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;
import java.util.*;
import java.util.regex.Pattern;

/**
 * Created by zhaodong on 16/8/28.
 */
@Controller
public class SupervisionMappingController {
    @Autowired(required = false)
    private P1Service p1Service;

    @Value("${sys.mongo.ips}")
    private String mongoIps;

    @Value("${sys.mongo.username}")
    private String mongoUsername;

    @Value("${sys.mongo.password}")
    private String mongoPassword;

    public void setMongoIps(String mongoIps) {
        this.mongoIps = mongoIps;
    }

    public void setMongoUsername(String mongoUsername) {
        this.mongoUsername = mongoUsername;
    }

    public void setMongoPassword(String mongoPassword) {
        this.mongoPassword = mongoPassword;
    }

    public static List<DrugInfoXml> drugInfoList = new ArrayList<DrugInfoXml>();

    @RequestMapping(value = "/supervisionmapping/list", method = RequestMethod.GET)
    @RequiresPermissions("regulatecodematching:list")
    public ModelAndView supervisionmapping() throws Exception {
        return new ModelAndView("/basicinformation/supervisionmapping/list");
    }

    //获取监管码列表
    @RequestMapping(value = "/getsupervisionlist", method = RequestMethod.GET)
    @RequiresPermissions("regulatecodematching:list")
    @ResponseBody
    public Object getSupervisionList(boolean isFirstLoading, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<List<P1GoodsDrugInfo>> supervisionList = p1Service.getP1GoodsDrug();
        supervisionList.availableAssert(supervisionList.getMessage());
        if (drugInfoList.size() == 0 || isFirstLoading) {
            drugInfoList = new ArrayList<DrugInfoXml>();

            List<DBObject> list = new ArrayList<DBObject>();
            MongoCredential credential = MongoCredential.createCredential(mongoUsername, "admin", mongoPassword.toCharArray());


            List<ServerAddress> serverMongoIps = new ArrayList<ServerAddress>();
            for (String ip : mongoIps.split(",")) {
                String[] args = ip.split(":");
                if (args.length != 2) {
                    return Result.error("mogodb ip或端口有误");
                }
                String mongoIp = args[0];
                String mongoPort = args[1];
                ServerAddress serverAddress = new ServerAddress(mongoIp, Integer.parseInt(mongoPort));
                serverMongoIps.add(serverAddress);
            }

            MongoClient mongoClient = new MongoClient(serverMongoIps, Arrays.asList(credential));
            DB db = mongoClient.getDB("newhealth");

            DBCollection coll = db.getCollection("T_SearchCodeLog");

            BasicDBObject query = new BasicDBObject();
            BasicDBObject sort = new BasicDBObject();

            sort.put("CreateTime", -1);

            //完全匹配
//                Pattern pattern = Pattern.compile("^$", Pattern.CASE_INSENSITIVE);
//                query.put("JsonDurgInfo", pattern);

            Pattern patternUserName = Pattern.compile("^.*.*$", Pattern.CASE_INSENSITIVE);
            query.put("JsonDurgInfo", patternUserName);

            DBCursor cursor = coll.find(query).sort(sort);
            try {
                while (cursor.hasNext()) {
                    list.add(cursor.next());
                }
            } finally {
                cursor.close();
            }
            boolean isDrugInfoListExist = false;
            boolean isListExist = false;

            JAXBContext context = JAXBContext.newInstance(DrugInfoXml.class);
            Unmarshaller unmarshaller = context.createUnmarshaller();
            for (DBObject dbObject : list) {
                try {
                    DrugInfoXml model = new DrugInfoXml();
                    if (dbObject.get("JsonDurgInfo") != null && StringUtil.isNotBlank(dbObject.get("JsonDurgInfo").toString()) && dbObject.get("JsonDurgInfo").toString().indexOf("{\"uid\"") == -1) {
                        if (dbObject.get("JsonDurgInfo").toString().indexOf("<?xml") == 0) {
                            String strXml = dbObject.get("JsonDurgInfo").toString();
                            strXml = strXml.replaceAll("<info>", "<drugInfoXml>").replaceAll("</info>", "</drugInfoXml>");
                            if(strXml.equals("<?xml version=\"1.0\" encoding=\"UTF-8\"?>"));
//                            strXml=strXml.concat("<drugInfoXml></drugInfoXml>");
                            model = (DrugInfoXml) unmarshaller.unmarshal(new StringReader(strXml));
                        } else {
                            model.setCode(dbObject.get("JsonDurgInfo").toString());
                        }
                    }
                    if (model.getCode() != null && StringUtil.isNotBlank(model.getCode())) {
                        if (model.getCode().matches("^[0-9]+$") && model.code.length() == 20) {
                            model.setRegulatecodePrefix(model.getCode().substring(0, 7));
                            model.setCreatetime(dbObject.get("CreateTime") == null ? null : ((Date) dbObject.get("CreateTime")));
                            isDrugInfoListExist = false;
                            for (int i = 0; i < drugInfoList.size(); i++) {
                                if (drugInfoList.get(i).getRegulatecodePrefix().equals(model.getRegulatecodePrefix())) {
                                    isDrugInfoListExist = true;
                                    break;
                                }
                            }
                            isListExist = false;
                            for (int j = 0; j < supervisionList.getResult().size(); j++) {
                                if (supervisionList.getResult().get(j).getRegulatecodePrefix().equals(model.getRegulatecodePrefix())) {
                                    isListExist = true;
                                    break;
                                }
                            }
                            if (!isDrugInfoListExist && !isListExist) {
                                drugInfoList.add(model);
                            }
                        }
                    }
                } catch (Exception ex) {
//                    result = Result.error("服务器错误，请稍后重试！", ex.getMessage());
//                    return result;
                    continue;
                }
            }
        } else {
            for (DrugInfoXml model : drugInfoList) {
                for (int i = 0; i < supervisionList.getResult().size(); i++) {
                    if (supervisionList.getResult().get(i).getRegulatecodePrefix().equals(model.getRegulatecodePrefix())) {
                        model.setDrugName(supervisionList.getResult().get(i).getName());
                        model.setManufactEnterprise(supervisionList.getResult().get(i).getManufactEnterprise());
                        model.setSpecification(supervisionList.getResult().get(i).getSpecification());
                        break;
                    }
                }
            }
        }

        MySortList<DrugInfoXml> sortList = new MySortList<DrugInfoXml>();
        //排序
        if (tableOrderName.equals("regulatecodePrefix")) {
            //
            if (tableOrderSort.equals("asc")) {
                sortList.sortByMethod(drugInfoList, "getRegulatecodePrefix", false);
            } else {
                sortList.sortByMethod(drugInfoList, "getRegulatecodePrefix", true);
            }
        } else if (tableOrderName.equals("createtime")) {
            if (tableOrderSort.equals("asc")) {
                sortList.sortByMethod(drugInfoList, "getCreatetime", false);
            } else {
                sortList.sortByMethod(drugInfoList, "getCreatetime", true);
            }
        } else if (tableOrderName.equals("drugName")) {
            if (tableOrderSort.equals("asc")) {
                sortList.sortByMethod(drugInfoList, "getDrugName", false);
            } else {
                sortList.sortByMethod(drugInfoList, "getDrugName", true);
            }
        } else if (tableOrderName.equals("manufactEnterprise")) {
            if (tableOrderSort.equals("asc")) {
                sortList.sortByMethod(drugInfoList, "getManufactEnterprise", false);
            } else {
                sortList.sortByMethod(drugInfoList, "getManufactEnterprise", true);
            }
        } else {
            sortList.sortByMethod(drugInfoList, "getCreatetime", false);
        }

        //分页
        int start = (pageIndex - 1) * pageSize;
        int end = start + pageSize;
        end = end < drugInfoList.size() ? end : drugInfoList.size();

        List<DrugInfoXml> pageList = new ArrayList<DrugInfoXml>();
        for (int i = start; i < end; i++) {
            pageList.add(drugInfoList.get(i));
        }

        QueryResult<DrugInfoXml> resultList = new QueryResult<DrugInfoXml>();
        resultList.setDatas(pageList);
        resultList.setTotalCount(drugInfoList.size());

        Map permission = new HashMap();
        //判断是否有查看详情的权限
        Subject subject = SecurityUtils.getSubject();
        if (subject.isPermitted("regulatecodematching:deal")) {
            permission.put("codeMatching", true);
        } else {
            permission.put("codeMatching", false);
        }
        result = Result.OK(resultList, "获取成功", permission);
        return result;
    }

    @RequestMapping(value = "/getdrugdetailinfo", method = RequestMethod.GET)
    @RequiresPermissions("regulatecodematching:deal")
    @ResponseBody
    public Object GetDrugDetailInfo(String regulateCode) throws Exception {
        Result result;
        JAXBContext context = JAXBContext.newInstance(DrugInfoXml.class);
        Unmarshaller unmarshaller = context.createUnmarshaller();
        DrugInfoXml model;
        URL url = new URL("http://mobile.cfda.gov.cn/services/code/codeQueryTaobao?code=" + regulateCode);
        InputStream is = url.openConnection().getInputStream();
        String strXml = IOUtils.toString(is, "UTF-8");

        strXml = strXml.replaceAll("<info>", "<drugInfoXml>").replaceAll("</info>", "</drugInfoXml>");
        model = (DrugInfoXml) unmarshaller.unmarshal(new StringReader(strXml));
        result = Result.OK(model);
        return result;
    }

    @RequestMapping(value = "/searchdruglist", method = RequestMethod.GET)
    @RequiresPermissions("regulatecodematching:deal")
    @ResponseBody
    public Object SearchDrugList(String queryName, String manufacturer, String specification, String dosage, String unit, int pageIndex, int pageSize, String tableOrderName, String tableOrderSort) throws Exception {
        Result result;
        ServiceResult<QueryResult<P1GoodsDrugInfo>> list = p1Service.searchDrugList(queryName, manufacturer, specification, dosage, unit, pageIndex, pageSize, tableOrderName, tableOrderSort, true);
        list.availableAssert(list.getMessage());
        result = Result.OK(list.getResult());
        return result;
    }

    @RequestMapping(value = "/updateregulatecodeprefix", method = RequestMethod.GET)
    @RequiresPermissions("regulatecodematching:deal")
    @ResponseBody
    public Object UpdateRegulatecodePrefix(String id, String regulatecodePrefix) throws Exception {
        Result result;
        P1GoodsDrugInfo model;
        String codePrefix = regulatecodePrefix.substring(0, 7);
        ServiceResult<P1GoodsDrugInfo> pre = p1Service.getP1GoodsDrugByRegulatecodePrefix(codePrefix);
        pre.availableAssert(pre.getMessage());
        if (pre.getResult() != null && !pre.getResult().getId().equals(id)) {
            result = Result.error("监管码前缀已存在");
            return result;
        }
        ServiceResult<P1GoodsDrugInfo> res = p1Service.getP1GoodsDrugByID(id);
        res.availableAssert(res.getMessage());
        model = res.getResult();
//            String id, String productID, String approvalNum, String Name, String PopularizeName, String drugId, String Barcode, String Specification, String Dosage, String ManufactEnterprise, String RegulatecodePrefix, String Description, String Unit, String PicUrl, String IsExistRegulateCode, String TypeOne, String TypeTwo, String TypeThree, int singleMaxClaim
        ServiceResult<String> editResult = p1Service.editP1GoodsDrug(model.getId(), model.getProductID(), model.getApprovalNum(),
                model.getName(), model.getPopularizeName(), model.getDrugId(), model.getBarcode(), model.getSpecification(),
                model.getDescription(), model.getManufactEnterprise(), codePrefix, model.getDescription(), model.getUnit(),
                model.getPicUrl(), model.getIsExistRegulateCode(), model.getTypeOne(), model.getTypeTwo(), model.getTypeThree(),
                model.getSingleMaxClaim());
        editResult.availableAssert(editResult.getMessage());
        if (editResult.getStatus() == ResultStatus.OK) {
            result = Result.OK("监管码映射成功！");
        } else {
            result = Result.error("监管码映射失败！");
        }
        return result;
    }
}
