package cn.com.cis.mi.osp.common;

import java.util.Map;

/**
 * Created by gujiawei789 on 16/9/21.
 * 返回结果封装类
 */
public class Result {
    private int code;
    private Object data;
    private String msg;
    private String errorInfo;
    private Map permission;

    public Result() {
    }

    public Result(int code, Object data) {
        this.code = code;
        this.data = data;
    }

    public Result(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Result(int code, String msg, String errorInfo) {
        this.code = code;
        this.msg = msg;
        this.errorInfo = errorInfo;
    }

    public Result(int code, Object data, String msg) {
        this.code = code;
        this.data = data;
        this.msg = msg;
    }

    public Result(int code, Object data, String msg, Map permission) {
        this.code = code;
        this.data = data;
        this.msg = msg;
        this.permission = permission;
    }

    public Result(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getErrorInfo() {
        return errorInfo;
    }

    public void setErrorInfo(String errorInfo) {
        this.errorInfo = errorInfo;
    }

    public Map getPermission() {
        return permission;
    }

    public void setPermission(Map permission) {
        this.permission = permission;
    }

    public static Result error() {
        return new Result(201);
    }

    public static Result error(String msg) {
        return new Result(201, msg);
    }

    public static Result error(String msg, String errorInfo) {
        return new Result(201, msg, errorInfo);
    }

    public static Result OK(Object data) {
        return new Result(200, data);
    }

    public static Result OK(String msg) {
        return new Result(200, msg);
    }

    public static Result OK(Object data, String msg) {
        return new Result(200, data, msg);
    }

    public static Result OK(Object data, String msg, Map permission) {
        return new Result(200, data, msg, permission);
    }
}
