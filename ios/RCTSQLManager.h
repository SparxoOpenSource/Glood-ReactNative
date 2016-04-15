//
//  RCTSQLManager.h
//  ReactNativeGlood
//
//  Created by sparxo-dev-ios-1 on 16/4/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import <MediaPlayer/MediaPlayer.h>

@import AVFoundation;

@interface RCTSQLManager : NSObject
<RCTBridgeModule,MPMediaPickerControllerDelegate, AVAudioPlayerDelegate>

@property (nonatomic, retain) AVAudioPlayer *player;
@property (nonatomic, retain) MPMediaPickerController *mediaPicker;

- (void) showMediaPicker;

@end
