package com.reactnativeglood;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;

import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.reactnativeglood.common.MyPackageManager;
import com.facebook.react.ReactActivity;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
        return "ReactNativeGlood";
    }

    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new MyPackageManager(this)
        );
    }
}
