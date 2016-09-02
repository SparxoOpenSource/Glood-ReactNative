/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTRootView.h"

#import <Bugly/Bugly.h>

#import "UncaughtExceptionHandler.h"

#import "Firebase.h"
#import "RNFIRMessaging.h"

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  InstallUncaughtExceptionHandler();
  [FIRApp configure];
  [[UIApplication sharedApplication] setStatusBarHidden:YES withAnimation:NO];
  NSURL *jsCodeLocation;
//  NSString *str;
//  NSDictionary *resultsDict = @{@"IP" : str};
//  NSLog(@"%@",resultsDict);
//  NSArray *arr=[[NSArray alloc] initWithObjects:@"x", nil];
//  for (NSInteger i = 0; i <= [arr count]; i++) {
//    NSLog(@"%@",[arr objectAtIndex:i]);
//  }
  /**
   * Loading JavaScript code - uncomment the one you want.
   *
   * OPTION 1
   * Load from development server. Start the server from the repository root:
   *
   * $ npm start
   *
   * To run on device, change `localhost` to the IP address of your computer
   * (you can get this by typing `ifconfig` into the terminal and selecting the
   * `inet` value under `en0:`) and make sure your computer and iOS device are
   * on the same Wi-Fi network.
   */

  jsCodeLocation = [NSURL URLWithString:@"http://192.168.31.153:8081/index.ios.bundle?platform=ios&dev=true"];

//  jsCodeLocation = [NSURL URLWithString:@"http://192.168.2.102:8081/index.ios.bundle?platform=ios&dev=true"];

  /**
   * OPTION 2
   * Load from pre-bundled file on disk. The static bundle is automatically
   * generated by the "Bundle React Native code and images" build step when
   * running the project on an actual device or running the project on the
   * simulator in the "Release" build configuration.
   */

//   jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index.ios" withExtension:@"jsbundle"];
  for (NSString* family in [UIFont familyNames])
  {
    NSLog(@"%@", family);
    for (NSString* name in [UIFont fontNamesForFamilyName: family])
    {
      NSLog(@" %@", name);
    }
  }
  //推送
  [application setApplicationIconBadgeNumber:0];
  //#if SUPPORT_IOS8
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0) {
    UIUserNotificationType myTypes = UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeSound;
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:myTypes categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  }else
    //#endif
  {
    UIRemoteNotificationType myTypes = UIRemoteNotificationTypeBadge|UIRemoteNotificationTypeAlert|UIRemoteNotificationTypeSound;
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:myTypes];
  }
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ReduxTest"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [Bugly startWithAppId:@"900035998"];
  
  
  return YES;
}

//#if SUPPORT_IOS8
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  //register to receive notifications
  [application registerForRemoteNotifications];
}
//#endif
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)pToken
{
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSString *tokenStr = [[NSString stringWithFormat:@"%@",pToken] stringByReplacingOccurrencesOfString:@"<" withString:@""];
  tokenStr = [tokenStr stringByReplacingOccurrencesOfString:@">" withString:@""];
  tokenStr = [tokenStr stringByReplacingOccurrencesOfString:@" " withString:@""];
  NSLog(@"regisger success:%@",tokenStr);
  //注册成功，将deviceToken保存到应用服务器数据库中
  
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))handler {
    [[NSNotificationCenter defaultCenter] postNotificationName:FCMNotificationReceived object:self userInfo:notification];
    handler(UIBackgroundFetchResultNewData);
  }

@end

