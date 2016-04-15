//
//  CommunicationManager.m
//  ReactNativeGlood
//
//  Created by sparxo-dev-ios-1 on 16/4/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "CommunicationManager.h"

@interface CommunicationManager ()

@property (strong, nonatomic) RCTResponseSenderBlock completion;

@end

@implementation CommunicationManager

RCT_EXPORT_MODULE()

/**
 composeEmailToRecipients(recipients: Array<String>, ccRecipients: Array<String>, bccRecipients: Array<String>)
 */
RCT_EXPORT_METHOD(composeEmailToRecipients:(NSArray *)recipients ccRecipients:(NSArray *)ccRecipients bccRecipients:(NSArray *)bccRecipients completion:(RCTResponseSenderBlock)completion) {
  [self composeEmailTo:recipients ccRecipients:ccRecipients bccRecipients:bccRecipients subject:nil body:nil completion:completion];
}

@end
