import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { AppContextService } from '../../core/app-context/app-context.service';
import { AppContext } from '../../core/app-context/app-context.enum';

@Directive({
  selector: '[alvAppContextDefault]'
})
export class AppContextDefaultDirective extends AbstractSubscriber implements OnInit {

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
        if (appContext === AppContext.DEFAULT) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }

}
