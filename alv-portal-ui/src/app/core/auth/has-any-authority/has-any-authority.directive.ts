import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';

@Directive({
  selector: '[alvHasAnyAuthority]'
})
export class HasAnyAuthorityDirective {

  private _hasAnyAuthority: string | Array<string>;

  constructor(private authenticationService: AuthenticationService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  set alvHasAnyAuthority(value: string | Array<string>) {
    this._hasAnyAuthority = typeof value === 'string' ? [<string> value] : <string[]> value;
    this.authenticationService.getCurrentUser()
        .subscribe(user => {
          this.viewContainerRef.clear();
          if (user && user.containsAuthority(this._hasAnyAuthority)) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        });
  }

}
