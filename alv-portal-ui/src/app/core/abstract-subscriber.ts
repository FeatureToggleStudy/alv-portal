import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Abstract subscriber component to help unsubscribe from hot observables
 */
export abstract class AbstractSubscriber implements OnDestroy {

  protected ngUnsubscribe = new Subject();

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
