package com.reduxtest;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
<<<<<<< HEAD:ReduxTest/android/app/src/main/java/com/reduxtest/MainActivity.java
=======
import com.reduxtest.actions.RecordAudioPackage;
>>>>>>> origin/Glood-Redux:ReduxTest/android/app/src/main/java/com/reduxtest/MainActivity.java

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

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

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
<<<<<<< HEAD:ReduxTest/android/app/src/main/java/com/reduxtest/MainActivity.java
            new MainReactPackage()
=======
                new MainReactPackage(),
                new RecordAudioPackage()
>>>>>>> origin/Glood-Redux:ReduxTest/android/app/src/main/java/com/reduxtest/MainActivity.java
        );
    }
}
