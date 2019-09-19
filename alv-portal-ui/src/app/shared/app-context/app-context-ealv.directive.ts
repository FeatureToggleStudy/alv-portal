import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { AppContextService, isEalv } from '../../core/app-context/app-context.service';
import { hasAnyAuthorities, UserRole } from '../../core/auth/user.model';

@Directive({
  selector: '[alvAppContextEalv]'
})
export class AppContextEalvDirective extends AbstractSubscriber implements OnInit {

  private isShown = true;

  constructor(private appContextService: AppContextService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
    super();
  }

  ngOnInit() {
    this.appContextService.getAppContext()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(appContext => {
        this.viewContainerRef.clear();
        if (isEalv(appContext) === this.isShown) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }

  @Input()
  set alvAppContextEalv(value: boolean) {
    this.isShown = value === null ? true : value;
  }

}
