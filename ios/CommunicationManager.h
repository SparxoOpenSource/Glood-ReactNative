//
//  CommunicationManager.h
//  ReactNativeGlood
//
//  Created by sparxo-dev-ios-1 on 16/4/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"
#import <GCDAsyncSocket.h>
#import "RecorderManager.h"
#import "PlayerManager.h"

@interface CommunicationManager : NSObject <RCTBridgeModule,GCDAsyncSocketDelegate,RecordingDelegate, PlayingDelegate>

@property (strong,nonatomic) GCDAsyncSocket *serverSocket;
@property (strong,nonatomic) GCDAsyncSocket *partnerSocket;
@property (strong,nonatomic) NSString *myIP;
@property NSInteger port;

@property (strong, nonatomic) NSString *isConnectxxx;

@property (strong, nonatomic) NSString *fileName;

@end
