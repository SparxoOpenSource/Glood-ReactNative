//
//  AnalyzeNetService.m
//  TestBonjour
//
//  Created by yanjing on 14-5-26.
//  Copyright (c) 2014年 bravegogo. All rights reserved.
//

#import "AnalyzeNetService.h"
#import <CFNetwork/CFSocketStream.h>
#import <Foundation/Foundation.h>


@implementation AnalyzeNetService

-(void)opit{
    
    self.netMyService.delegate = self;
    [self.netMyService resolveWithTimeout:5.0];
}


#pragma mark -
#pragma mark NSNetService Delegate Method Implementations

// Called if we weren't able to resolve net service
- (void)netService:(NSNetService *)sender didNotResolve:(NSDictionary *)errorDict
{
    if ( sender != self.netMyService ) {
        return;
    }
}


// Called when net service has been successfully resolved
- (void)netServiceDidResolveAddress:(NSNetService *)sender
{
    if ( sender != self.netMyService ) {
        return;
    }
    
    NSLog(@" 成功 得到了   netService.hostName  %@", self.netMyService.hostName);
    NSLog(@" 成功 得到了   netService.port  %ld", self.netMyService.port);
    // Save connection info
 
    
    // Don't need the service anymore
     self.netMyService = nil;
}



@end
