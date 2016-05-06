//
//  CommunicationManager.m
//  ReactNativeGlood
//
//  Created by sparxo-dev-ios-1 on 16/4/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "CommunicationManager.h"
#import "AppDelegate.h"
#import <GCDAsyncSocket.h>
#import <ifaddrs.h>
#import <arpa/inet.h>
@import UIKit;


@implementation CommunicationManager

#define HOSTIP @"192.168.31.118"
#define PORT 6666

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(get:(RCTResponseSenderBlock)callback)
{
  self.isConnectxxx = @"noConnect";
  NSArray *userNameList = @[@"192.168.31.221",
                            @"192.168.31.142",
                            @"192.168.31.118"];
  
//  AppDelegate *app = (AppDelegate*)[[UIApplication sharedApplication] delegate];
//  NSDictionary *userNameListDic = @{@"userNameList" : userNameList};
  NSString *str = [userNameList componentsJoinedByString:@","];
  
  NSLog(@"-------  %@",str);
  
  callback(@[str]);
}

RCT_EXPORT_METHOD(sendMessage:(NSString *)messageContent callback:(RCTResponseSenderBlock)callback)
{
  NSLog(@"**********");
  messageContent = @"native auto";
  //开始录音
//  [RecorderManager sharedManager].delegate = self;
//  [[RecorderManager sharedManager] startRecording];
  
  //sendPressed
  [self.partnerSocket writeData:[@"test message!!!!" dataUsingEncoding:NSUTF8StringEncoding] withTimeout:-1 tag:0];
  [self.partnerSocket writeData:[GCDAsyncSocket CRLFData] withTimeout:-1 tag:0];
  callback(@[messageContent]);
}

- (void)recordingFinishedWithFileName:(NSString *)filePath time:(NSTimeInterval)interval{
  //录音保存的文件地址
//  self.fileName = filePath;
//  //时长
//  NSNumber *num = [[NSNumber alloc] initWithDouble:interval];
  
  
}

//超时操作
- (void)recordingTimeout{
  NSLog(@"超时操作");
}

//录音机停止采集声音
- (void)recordingStopped{
}

//录制失败操作
- (void)recordingFailed:(NSString *)failureInfoString{
  NSLog(@"录制失败操作");
}





RCT_EXPORT_METHOD(connect:(NSString *)connectToHost callback:(RCTResponseSenderBlock)callback)
{
  NSLog(@"connect socekt!!!!");
  self.myIP=[self getIPAddress];
  self.port=PORT;
  [self createServerSocket:self.port];
  //connectPressed
  if (self.partnerSocket !=nil) {
    self.partnerSocket=nil;
    [self.partnerSocket disconnect];
    self.partnerSocket=nil;
  }
  
  self.partnerSocket=[[GCDAsyncSocket alloc] initWithDelegate:self delegateQueue:dispatch_get_main_queue()];
  
  [self.partnerSocket connectToHost:HOSTIP onPort:PORT error:nil];
   dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
     NSLog(@"*-*-*-*-*-*--*--  %@",self.isConnectxxx);
     
     callback(@[self.isConnectxxx]);
     
   });
  
}

- (NSString *)getIPAddress {
  NSString *address = @"error";
  struct ifaddrs *interfaces = NULL;
  struct ifaddrs *temp_addr = NULL;
  int success = 0;
  // retrieve the current interfaces - returns 0 on success
  success = getifaddrs(&interfaces);
  if (success == 0) {
    // Loop through linked list of interfaces
    temp_addr = interfaces;
    while(temp_addr != NULL) {
      if(temp_addr->ifa_addr->sa_family == AF_INET) {
        // Check if interface is en0 which is the wifi connection on the iPhone
        if([[NSString stringWithUTF8String:temp_addr->ifa_name] isEqualToString:@"en0"]) {
          // Get NSString from C String
          address = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_addr)->sin_addr)];
        }
      }
      temp_addr = temp_addr->ifa_next;
    }
  }
  // Free memory
  freeifaddrs(interfaces);
  return address;
  
}


-(void) createServerSocket:(NSInteger)port {
  self.serverSocket=[[GCDAsyncSocket alloc] initWithDelegate:self delegateQueue:dispatch_get_main_queue()];
  NSError *error = nil;
  if (![self.serverSocket acceptOnPort:port error:&error])
  {
    self.isConnectxxx = @"noConnect";
    NSLog(@"I goofed: %@", error);
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"ERROR" message:[NSString stringWithFormat:@"%@",error] delegate:self cancelButtonTitle:@"ok" otherButtonTitles:nil, nil];
    [alertView show];
  }
  else
  {
    self.isConnectxxx = @"connect";
  }
}

#pragma mark - Socket delegate methods

- (void)socket:(GCDAsyncSocket *)sender didAcceptNewSocket:(GCDAsyncSocket *)newSocket {
  NSLog(@"New incoming connection");
  if (self.partnerSocket == nil) {
    self.partnerSocket=newSocket;
    NSString *welcomeMsg=[NSString stringWithFormat:@"You are now connected to %@",self.myIP];
    
    [newSocket writeData:[welcomeMsg dataUsingEncoding:NSUTF8StringEncoding] withTimeout:-1 tag:0];
    [newSocket writeData:[GCDAsyncSocket CRLFData] withTimeout:1000 tag:0];
    [self.partnerSocket readDataToData:[GCDAsyncSocket CRLFData] withTimeout:-1 tag:0];
    dispatch_async(dispatch_get_main_queue(), ^{
    });
  }
  else {
    [newSocket disconnect];
  }
}

-(void)socket:(GCDAsyncSocket *)sock didConnectToHost:(NSString *)host port:(uint16_t)port {
  NSLog(@"Connected to host %@",host);
  [self.partnerSocket readDataToData:[GCDAsyncSocket CRLFData] withTimeout:-1 tag:0];
}

-(void)socketDidDisconnect:(GCDAsyncSocket *)sock withError:(NSError *)err {
  if (self.partnerSocket!=nil) {
    self.partnerSocket.delegate=nil;
  }
  self.partnerSocket=nil;
  NSLog(@"I goofed: %@", err);
//  UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"ERROR!!" message:[NSString stringWithFormat:@"%@",err] delegate:self cancelButtonTitle:@"ok" otherButtonTitles:nil, nil];
//  [alertView show];
  NSLog(@"Socket disconnected with error %@",err);
  dispatch_async(dispatch_get_main_queue(), ^{
  });
}

-(void)socket:(GCDAsyncSocket *)sock didWriteDataWithTag:(long)tag {
  NSLog(@"Finished writing");
}

-(void)socket:(GCDAsyncSocket *)sock didReadData:(NSData *)data withTag:(long)tag {
  NSString *receivedText=[[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
//  self.receivedText.text=[NSString stringWithFormat:@"%@%@",self.receivedText.text,receivedText];
//  self.isConnectxxx = @"connect";
  UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"message coming" message:receivedText delegate:self cancelButtonTitle:@"ok" otherButtonTitles:nil, nil];
  [alertView show];
  [self.partnerSocket readDataToData:[GCDAsyncSocket CRLFData] withTimeout:-1 tag:0];
  
  
}

@end
