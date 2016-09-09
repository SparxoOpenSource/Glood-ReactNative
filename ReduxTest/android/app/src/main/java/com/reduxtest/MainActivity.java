package com.reduxtest;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.TextUtils;

import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;
import com.reduxtest.actions.NotificationPackageForAndroid;
import com.reduxtest.actions.RecordAudioPackage;

import org.pgsqlite.SQLitePluginPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {
    private NotificationPackageForAndroid notificationPackageForAndroid;
    private Bundle mBundle;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReduxTest";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getIntent().hasExtra("action")) {
            Bundle bundle = getIntent().getExtras();
            if (bundle != null) {
                String action = bundle.getString("action");
                if (!TextUtils.isEmpty(action)) {
                    SharedPreferences sharedPreferences = getSharedPreferences("ACTION", 0);
                    sharedPreferences.edit().putString("action",action).commit();
                }
            }
        }

//        if (getIntent().hasExtra("action")) {
//            this.mBundle = getIntent().getExtras();
//            TimerTask task = new TimerTask() {
//                public void run() {
//                    Intent intent = new Intent();
//                    intent.setAction("com.evollu.react.fcm.ReceiveNotification.backgroound");
//                    intent.putExtras(mBundle);
//                    sendBroadcast(intent);
//                }
//            };
//            Timer timer = new Timer();
//            timer.schedule(task, 3000);
//        }
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RecordAudioPackage(),
                new ImagePickerPackage(),
                new RCTCameraPackage(),
                new BarcodeScannerPackage(),
                new FIRMessagingPackage(),
                new NotificationPackageForAndroid(),
                new SQLitePluginPackage(),
                new RCTSwipeRefreshLayoutPackage()
        );
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
