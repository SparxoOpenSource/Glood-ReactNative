package com.reduxtest.application;

import android.app.Application;

import com.tencent.bugly.crashreport.CrashReport;

/**
 * Created by Sparxo_Android on 2016/6/23.
 */
public class GloodApplication extends Application {
    @Override
    public void onCreate() {
        CrashReport.initCrashReport(getApplicationContext(), "900035325", false);
        super.onCreate();
    }
}
