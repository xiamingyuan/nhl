package cn.com.cis.mi.osp.controller;

import cn.com.cis.mi.osp.common.Result;
import com.mongodb.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import org.eclipse.jetty.util.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Pattern;

//import com.mongodb.client.FindIterable;
//import com.mongodb.client.MongoCollection;
//import com.mongodb.client.MongoCursor;
//import com.mongodb.client.MongoDatabase;
//import com.mongodb.client.gridfs.GridFSFindIterable;
//import org.bson.Document;

/**
 * Created by zhaodong on 16/8/28.
 */
@Controller
public class ScanLogRecordController {
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

    @RequestMapping(value = "/scanlogrecord/list", method = RequestMethod.GET)
    @RequiresPermissions("sweepcodelogging:list")
    public ModelAndView scanlogrecord() throws Exception {
        return new ModelAndView("/querystatistics/scanlogrecord/list");
    }

    //扫码日志统计
    @RequestMapping(value = "/getscanlogrecordlist", method = {RequestMethod.GET})
    @RequiresPermissions("sweepcodelogging:list")
    @ResponseBody
    public Object getscanlogrecordlist(String userName, String eventName, String devVersion, String appVersion, String jsonDurgInfo, String devType, String commitStartTime, String commitEndTime, int pageSize, int pageIndex, String tableOrderName, String tableOrderSort) throws Exception {
        Map map = new HashMap();
        List<DBObject> list = new ArrayList<DBObject>();
        MongoCredential credential = MongoCredential.createCredential(mongoUsername, "admin", mongoPassword.toCharArray());

        if (StringUtils.isBlank(mongoIps)) {
            return Result.error("mogodb 地址配置错误");
        }

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

        tableOrderName = StringUtil.isNotBlank(tableOrderName) ? tableOrderName : "CreateTime";
        int sortType = -1;
        if (StringUtil.isNotBlank(tableOrderSort)) {
            if (tableOrderSort.equals("asc")) {
                sortType = 1;
            }
        }
        sort.put(tableOrderName, sortType);
        //"ID", "21db23f8-42a0-4dbf-8bb4-4b10385c57cc"
        //模糊匹配
        if (StringUtil.isNotBlank(userName)) {
            Pattern patternUserName = Pattern.compile("^.*" + userName + ".*$", Pattern.CASE_INSENSITIVE);
            query.put("UserName", patternUserName);
        }
        if (StringUtil.isNotBlank(eventName)) {
            query.put("EventName", eventName);
        }
        if (StringUtil.isNotBlank(devVersion)) {
            Pattern patternDevVersion = Pattern.compile("^.*" + devVersion + ".*$", Pattern.CASE_INSENSITIVE);
            query.put("DevVersion", patternDevVersion);
        }
        if (StringUtil.isNotBlank(appVersion)) {
            Pattern patternAppVersion = Pattern.compile("^.*" + appVersion + ".*$", Pattern.CASE_INSENSITIVE);
            query.put("AppVersion", patternAppVersion);
        }
        if (StringUtil.isNotBlank(jsonDurgInfo)) {
            Pattern patternJsonDurgInfo = Pattern.compile("^.*" + jsonDurgInfo + ".*$", Pattern.CASE_INSENSITIVE);
            query.put("JsonDurgInfo", patternJsonDurgInfo);
        }
        if (StringUtil.isNotBlank(devType)) {
            Pattern patternDevType = Pattern.compile("^.*" + devType + ".*$", Pattern.CASE_INSENSITIVE);
            query.put("DevType", patternDevType);
        }

        Date sDate = null;
        Date eDate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.isNotBlank(commitStartTime)) {
            sDate = sdf.parse(commitStartTime);
        }
        if (StringUtil.isNotBlank(commitEndTime)) {
            eDate = sdf.parse(commitEndTime);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(eDate);
            calendar.add(Calendar.DATE, 1);
            eDate = calendar.getTime();
        }

        if (StringUtil.isNotBlank(commitStartTime) && StringUtil.isNotBlank(commitEndTime)) {
            query.put("CreateTime", new BasicDBObject("$gte", sDate).append("$lte", eDate));
        }
        if (StringUtil.isNotBlank(commitStartTime) && !StringUtil.isNotBlank(commitEndTime)) {
            query.put("CreateTime", new BasicDBObject("$gte", sDate));
        }
        if (!StringUtil.isNotBlank(commitStartTime) && StringUtil.isNotBlank(commitEndTime)) {
            query.put("CreateTime", new BasicDBObject("$lte", eDate));
        }

        DBCursor cursor = coll.find(query).sort(sort).skip(pageSize * (pageIndex - 1)).limit(pageSize);
        try {
            while (cursor.hasNext()) {
                list.add(cursor.next());
            }
        } finally {
            cursor.close();
        }
        map.put("list", list);
        map.put("count", cursor.count());
        return Result.OK(map);
    }


    public static MongoClient getMongoClient() throws Exception {
        //===================================================//
        List<ServerAddress> serverList = new ArrayList<ServerAddress>();
        serverList.add(new ServerAddress("10.117.130.39", 27017));
        //===================================================//
        List<MongoCredential> mcList = new ArrayList<MongoCredential>();
        String username = "sa";
        String database = "newhealth";
        char[] password = "sa".toCharArray();
        mcList.add(MongoCredential.createCredential(username, database, password));
        //===================================================//
        MongoClientOptions.Builder builder = MongoClientOptions.builder();
        // 与目标数据库能够建立的最大connection数量为50
        builder.connectionsPerHost(50);
        // 如果当前所有的connection都在使用中，则每个connection上可以有50个线程排队等待
        builder.threadsAllowedToBlockForConnectionMultiplier(50);
        // 一个线程访问数据库的时候，在成功获取到一个可用数据库连接之前的最长等待时间为2分钟
        // 这里比较危险，如果超过maxWaitTime都没有获取到这个连接的话，该线程就会抛出Exception
        // 故这里设置的maxWaitTime应该足够大，以免由于排队线程过多造成的数据库访问失败
        builder.maxWaitTime(1000 * 60 * 2);
        // 与数据库建立连接的timeout设置为1分钟
        builder.connectTimeout(1000 * 60 * 1);
        //===================================================//
        MongoClientOptions mco = builder.build();
        return new MongoClient(serverList, mcList, mco);
    }

    public static DB getDB(String dbname) throws Exception {
        return getMongoClient().getDB(dbname);
    }

    public static void collections(DB db) {
        Set<String> colls = db.getCollectionNames();
        for (String collName : colls) {
            System.out.println(collName);
        }
    }

    public static String formatXml(String str) throws Exception {
        Document document = null;
        document = DocumentHelper.parseText(str);
        // 格式化输出格式
        OutputFormat format = OutputFormat.createPrettyPrint();
        format.setEncoding("gb2312");
        StringWriter writer = new StringWriter();
        // 格式化输出流
        XMLWriter xmlWriter = new XMLWriter(writer, format);
        // 将document写入到输出流
        xmlWriter.write(document);
        xmlWriter.close();
        return writer.toString();
    }
}
