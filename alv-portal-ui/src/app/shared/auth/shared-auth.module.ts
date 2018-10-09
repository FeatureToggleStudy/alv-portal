import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAuthenticatedDirective } from './is-authenticated/is-authenticated.directive';
import { HasAnyAuthorityDirective } from './has-any-authority/has-any-authority.directive';


@NgModule({
  declarations: [
    IsAuthenticatedDirective,
    HasAnyAuthorityDirective
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
  ],
  exports: [
    IsAuthenticatedDirective,
    HasAnyAuthorityDirective
  ],
  providers: [
  ]
})
export class SharedAuthModule {

}

