# Update Guide

This document should provide some guidance when updating libraries, mainly focusing on Angular.

## Angular
If you want to update Angular, use the CLI command `ng update`. 
Please refer to the [official docs](https://angular.io/cli/update) to learn how this command works in detail.

If you intend to do a major version update, it's always advisable to use the [Angular Update Guide](https://update.angular.io/) to get a checklist of possible breaking changes.

## ng-bootstrap
The *ng-bootstrap* library is updated almost as frequently as Angular itself. Therefore you should always update the the *ng-bootstrap* library as soon as you update Angular.
For major version updates it's even mandatory.

## ngx-libraries
Similar to the *ng-bootstrap* library, always update the Angular related libraries (referred to as *ngx-libraries*) to the latest version when you update Angular.

## Other libraries
Try to be update all other libraries as frequently as possible. 

## *IMPORTANT*: Known library issues
1. The latest version of the npm library **@angular/animations** causes problems with animations including `display: none` on IE11 and Safari 
([view issue on GitHub](https://github.com/angular/angular/issues/29463#issuecomment-521589430)). The solution right now is to revert to version
**7.2.7**. This library works fine with Angular 8. So keep in mind when updating Angular to test whether this bug is fixed, and revert to version 7.2.7 again.
