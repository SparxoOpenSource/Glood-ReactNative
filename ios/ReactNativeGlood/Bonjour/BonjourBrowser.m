//
//  BonjourBrowser.m
//  TestBonjour
//
//  Created by yanjing on 14-5-25.
//  Copyright (c) 2014年 bravegogo. All rights reserved.
//

#import "BonjourBrowser.h"


@implementation BonjourBrowser

// Start browsing for servers
- (BOOL) start
{
    // Restarting?
    if ( _bonjourServiceBrowser != nil ) {
        [self stop];
    }
    
	_bonjourServiceBrowser = [[NSNetServiceBrowser alloc] init];
	if( !_bonjourServiceBrowser ) {
		return NO;
	}
    
	_bonjourServiceBrowser.delegate = self;
	[_bonjourServiceBrowser searchForServicesOfType:@"_chatty._tcp." inDomain:@""];
    
    return YES;
}


// Terminate current service browser and clean up
- (void) stop {
    if ( _bonjourServiceBrowser == nil ) {
        return;
    }
    
    [_bonjourServiceBrowser stop];
     _bonjourServiceBrowser = nil;
    [self.servers removeAllObjects];
}


#pragma mark -
#pragma mark NSNetServiceBrowser Delegate Method Implementations

// New service was found
- (void) netServiceBrowser:(NSNetServiceBrowser *)netServiceBrowser
            didFindService:(NSNetService *)netService
                moreComing:(BOOL)moreServicesComing
{
    // Make sure that we don't have such service already (why would this happen? not sure)
    if ( ! [self.servers containsObject:netService] ) {
        // Add it to our list
        [self.servers addObject:netService];
        
        NSLog(@" hostname :  %@",netService.hostName);
        NSLog(@" port :  %ld",(long)netService.port);
        
       self.netser  = [[AnalyzeNetService alloc]init];
         self.netser.netMyService = netService;
        [self.netser opit];
       
    }
    
    // If more entries are coming, no need to update UI just yet
    if ( moreServicesComing ) {
        return;
    }
    

}


// Service was removed
- (void)netServiceBrowser:(NSNetServiceBrowser *)netServiceBrowser
         didRemoveService:(NSNetService *)netService
               moreComing:(BOOL)moreServicesComing
{
    // Remove from list
    [self.servers removeObject:netService];
    
    // If more entries are coming, no need to update UI just yet
    if ( moreServicesComing ) {
        return;
    }
 
}
@end
