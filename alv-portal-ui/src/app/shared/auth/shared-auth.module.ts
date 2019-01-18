import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAuthenticatedDirective } from './is-authenticated.directive';
import { HasAnyAuthorityDirective } from './has-any-authority.directive';
import { IsAnonymousDirective } from './is-anonymous.directive';


@NgModule({
  declarations: [
    IsAuthenticatedDirective,
    HasAnyAuthorityDirective,
    IsAnonymousDirective
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [],
  exports: [
    IsAuthenticatedDirective,
    HasAnyAuthorityDirective,
    IsAnonymousDirective
  ],
  providers: []
})
export class SharedAuthModule {

}

