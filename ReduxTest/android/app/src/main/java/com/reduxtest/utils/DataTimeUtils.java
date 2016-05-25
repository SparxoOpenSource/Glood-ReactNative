package com.reduxtest.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Sparxo_Android on 2016/5/17.
 */
public class DataTimeUtils {
    public static String dataString() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");
        Date curDate = new Date(System.currentTimeMillis());//获取当前时间
        String data = formatter.format(curDate);
        return data;
    }

    public static Date date() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");
        Date curDate = new Date(System.currentTimeMillis());//获取当前时间
        return curDate;
    }
}
