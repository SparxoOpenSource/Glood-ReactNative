//
//  RCTSQLManager.m
//  ReactNativeGlood
//
//  Created by sparxo-dev-ios-1 on 16/4/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTSQLManager.h"


@implementation RCTSQLManager

-(void)showMediaPicker {
  if(self.mediaPicker == nil) {
    self.mediaPicker = [[MPMediaPickerController alloc] initWithMediaTypes:MPMediaTypeAnyAudio];
    
    [self.mediaPicker setDelegate:self];
    [self.mediaPicker setAllowsPickingMultipleItems:NO];
    [self.mediaPicker setShowsCloudItems:NO];
    self.mediaPicker.prompt = @"Select song";
  }
}

-(void) mediaPicker:(MPMediaPickerController *)mediaPicker didPickMediaItems:(MPMediaItemCollection *)mediaItemCollection {
  MPMediaItem *mediaItem = mediaItemCollection.items[0];
  NSURL *assetURL = [mediaItem valueForProperty:MPMediaItemPropertyAssetURL];
  
  [self.bridge.eventDispatcher sendAppEventWithName:@"SongPlaying" body:[mediaItem valueForProperty:MPMediaItemPropertyTitle]];
  //...
}


@end
