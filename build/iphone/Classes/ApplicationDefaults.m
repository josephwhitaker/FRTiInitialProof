/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"hZMipeFsG8SWEAmYb1wB7BAvw8Tweme8"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"PNro3Z0Uav4NnGS0IN5bZXBtD2OC056E"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"CNH0400ljBIwHnY92BRL8TTcxnufIppJ"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"IdwOVkQfMSCvlhK0KOB0D2Nzj6YDypAg"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"qNBJPNfnlScjYpIqdjkOW9V7FHrjXiB7"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"eGdKg1M9pX9lrbFxGBqosIzNLUXdKYfP"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

+ (NSDictionary*) launchUrl {
    static BOOL launched = NO;
    if (!launched) {
        launched = YES;
        return nil;
    } else { return nil;}
}
 
@end