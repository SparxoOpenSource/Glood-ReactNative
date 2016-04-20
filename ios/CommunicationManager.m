//
//  CommunicationManager.m
//  ReactNativeGlood
//
//  Created by sparxo-dev-ios-1 on 16/4/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "CommunicationManager.h"
#import "AppDelegate.h"
@import UIKit;

@implementation CommunicationManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(get:(RCTResponseSenderBlock)callback)
{
  NSArray *userNameList = @[@"row one",
                            @"row two",
                            @"row three",
                            @"row four",
                            @"row five"];
  
//  AppDelegate *app = (AppDelegate*)[[UIApplication sharedApplication] delegate];
//  NSDictionary *userNameListDic = @{@"userNameList" : userNameList};
  NSString *str = [userNameList componentsJoinedByString:@","];
  
  NSLog(@"-------  %@",str);
  
  callback(@[str]);
}

RCT_EXPORT_METHOD(call:(NSString *)messageContent)
{
  NSLog(@"**********");
//  NSString *message = @"发送的测试数据！！！！！";
//  AppDelegate *app = (AppDelegate*)[[UIApplication sharedApplication] delegate];
//  [app.socket writeData:[message dataUsingEncoding:NSUTF8StringEncoding] withTimeout:-1 tag:0];
//  NSLog(@"------%@",[NSString stringWithFormat:@"发送的数据:%@",message]);
//  [app.socket readDataWithTimeout:-1 tag:0];
}

@end
