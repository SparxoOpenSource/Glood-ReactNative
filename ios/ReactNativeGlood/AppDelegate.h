/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>

#import "BonjourPublish.h"

#import "GCDAsyncSocket/GCDAsyncSocket.h"

@class BonjourBrowser;

@interface AppDelegate : UIResponder <UIApplicationDelegate,GCDAsyncSocketDelegate>
{
  BonjourBrowser * retestBro;
  GCDAsyncSocket *socket;
}
@property(strong)  GCDAsyncSocket *socket;
@property (nonatomic, strong) UIWindow *window;
@property (strong) BonjourPublish * testPub;

@property (strong, nonatomic)NSMutableArray *hostNameMutableArr;

- (void)connection;

@end
