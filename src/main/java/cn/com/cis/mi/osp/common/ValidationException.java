package cn.com.cis.mi.osp.common;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Mr_shen on 2016/3/16.
 */
public class ValidationException extends RuntimeException {
    public ValidationException() {
    }

    public ValidationException(String msg) {
        super(msg);
    }

    public ValidationException(String message, Throwable cause) {
        super(message, cause);
    }

    public ValidationException(Throwable cause) {
        super(cause);
    }

    public static void notEmptyOrWhiteSpace(String str, String errMsg) throws ValidationException {
        if (errMsg == null || errMsg.trim().equals(""))
            throw new ValidationException("参数异常!");
        if ((str == null || str.trim().equals("")))
            throw new ValidationException(errMsg);
    }

    public static void notEmpty(char[] str, String errMsg) throws ValidationException {
        if (str == null)
            throw new ValidationException(errMsg);
    }

    public static void mobilePhone(String phone) throws ValidationException {

        if (phone == null || phone.trim().equals(""))
            throw new ValidationException("参数异常!");

        Pattern phonePattern = Pattern.compile("^1[0-9]{10}$");
        Matcher phoneMatcher = phonePattern.matcher(phone);
        if (!phoneMatcher.matches()) {
            throw new ValidationException("请输入正确的手机号。");
        }
    }

    public static void minLength(int minLength, int reality, String errMsg) throws ValidationException {

        if (errMsg == null || errMsg.trim().equals(""))
            throw new ValidationException("参数异常!");

        if(reality<minLength)
            throw new ValidationException(errMsg);
    }

    public static void maxLength(int maxLenth, int reality,  String errMsg) throws ValidationException {

        if (errMsg == null || errMsg.trim().equals(""))
            throw new ValidationException("参数异常!");

        if(reality>maxLenth)
            throw new ValidationException(errMsg);
    }
}
