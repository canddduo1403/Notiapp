package com.qinfoapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.react.rnspinkit.RNSpinkitPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import cl.json.RNSharePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
=======
import com.oblador.vectoricons.VectorIconsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
>>>>>>> f83191f222794664d65fd98bbedb6a3d7de3223d
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
<<<<<<< HEAD
import com.BV.LinearGradient.LinearGradientPackage;

=======
>>>>>>> f83191f222794664d65fd98bbedb6a3d7de3223d

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
            new RNSpinkitPackage(),
            new ReactMaterialKitPackage(),
            new PhotoViewPackage(),
            new ReactMaterialKitPackage(),
            new LinearGradientPackage(),
            new RNSharePackage(),
            new ReactNativePushNotificationPackage(),
            new SvgPackage(),
            new VectorIconsPackage()
=======
            new VectorIconsPackage(),
            new ReactNativePushNotificationPackage(),
            new FIRMessagingPackage()
>>>>>>> f83191f222794664d65fd98bbedb6a3d7de3223d
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
