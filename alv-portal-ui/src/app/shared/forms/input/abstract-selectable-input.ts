import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectableOption } from './selectable-option.model';
import { AbstractInput } from './abstract-input';

/**
 * Abstract selectable input
 */
export abstract class AbstractSelectableInput extends AbstractInput {

  /**
   * observable with selectable options which is subscribed to automatically
   */
  @Input() options$: Observable<Array<SelectableOption>>;

}
