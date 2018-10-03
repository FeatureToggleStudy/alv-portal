import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';

@Directive({
  selector: '[alvIsAuthenticated]'
})
export class IsAuthenticatedDirective implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser()
        .subscribe(user => {
          this.viewContainerRef.clear();
          if (user) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        });
  }

}
