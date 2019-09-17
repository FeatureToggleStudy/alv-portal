import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { hasAnyAuthorities, UserRole } from '../../core/auth/user.model';
import { AppContextService } from '../../core/auth/app-context.service';

@Directive({
  selector: '[alvIsCompetenceCatalog]'
})
export class IsCompetenceCatalogDirective extends AbstractSubscriber {

  constructor(private appContextService: AppContextService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
    super();
  }

  @Input()
  set alvIsCompetenceCatalog(value: boolean) {
    this.appContextService.isCompetenceCatalog()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isCompetenceCatalog => {
        this.viewContainerRef.clear();
        if (value === isCompetenceCatalog) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }

}
