import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { isAnonymous } from '../../core/auth/user.model';
import { AbstractSubscriber } from '../../core/abstract-subscriber';

@Directive({
  selector: '[alvIsAnonymous]'
})
export class IsAnonymousDirective extends AbstractSubscriber implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
    super();
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => {
        this.viewContainerRef.clear();
        if (isAnonymous(user)) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }

}
