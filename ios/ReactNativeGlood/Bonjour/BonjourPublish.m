//
//  BonjourPublish.m
//  TestBonjour
//
//  Created by yanjing on 14-5-25.
//  Copyright (c) 2014年 bravegogo. All rights reserved.
//

#import "BonjourPublish.h"

@implementation BonjourPublish

-(BOOL)bonjourPublish{
    
    self.bonjourService = [[NSNetService alloc]initWithDomain:@"local." type:@"_chatty._tcp." name:@""port:8081];
    if (self.bonjourService == nil)
		return NO;
    // Add service to current run loop
	[self.bonjourService scheduleInRunLoop:[NSRunLoop currentRunLoop] forMode:NSRunLoopCommonModes];
    
    // NetService will let us know about what's happening via delegate methods
	[self.bonjourService setDelegate:self];
    
    // Publish the service
	[self.bonjourService publish];
    return YES;
}


- (void) unpublishBonjourService
{
    if (self.bonjourService) {
		[self.bonjourService stop];
		[self.bonjourService removeFromRunLoop:[NSRunLoop currentRunLoop] forMode:NSRunLoopCommonModes];
		self.bonjourService = nil;
	}
}


#pragma mark -
#pragma mark NSNetService Delegate Method Implementations

// Delegate method, called by NSNetService in case service publishing fails for whatever reason
- (void) netService:(NSNetService*)sender didNotPublish:(NSDictionary*)errorDict
{
    if ( sender != self.bonjourService ) {
        return;
    }
 
    // Stop Bonjour
    [self unpublishBonjourService];
}

- (void) netServiceDidPublish:(NSNetService *)sender
{
    NSLog(@" >> netServiceDidPublish: %@", [sender name]);
}

- (void) netServiceDidStop:(NSNetService *)sender
{
    NSLog(@" >> netServiceDidStop: %@", [sender name]);
}


@end
