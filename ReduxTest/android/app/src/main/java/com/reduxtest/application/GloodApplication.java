package com.reduxtest.application;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.reduxtest.exception.UncaughtException;
import com.tencent.bugly.crashreport.CrashReport;

/**
 * Created by Sparxo_Android on 2016/6/23.
 */
public class GloodApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        CrashReport.initCrashReport(getApplicationContext(), "900035325", false);
        UncaughtException crashHandler = UncaughtException.getInstance();
        crashHandler.init(getApplicationContext());
    }
}
