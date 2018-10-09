import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../abstract-subscriber';

@Directive({
  selector: '[alvIsAuthenticated]'
})
export class IsAuthenticatedDirective extends AbstractSubscriber implements OnInit {

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
          if (user) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        });
  }

}
