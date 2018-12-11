import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { hasAnyAuthorities } from '../../../core/auth/user.model';

@Directive({
  selector: '[alvHasAnyAuthority]'
})
export class HasAnyAuthorityDirective extends AbstractSubscriber {

  private hasAnyAuthority: Array<string>;

  constructor(private authenticationService: AuthenticationService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
    super();
  }

  @Input()
  set alvHasAnyAuthority(value: string | Array<string>) {
    this.hasAnyAuthority = typeof value === 'string' ? [<string> value] : <string[]> value;
    this.authenticationService.getCurrentUser()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => {
        this.viewContainerRef.clear();
        if (hasAnyAuthorities(user, this.hasAnyAuthority)) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }

}
