import {
  Component,
  EventEmitter,
  Host,
  Input,
  Optional,
  Output,
  SkipSelf
} from '@angular/core';
import { AbstractInput } from '../abstract-input';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';
import { InputType } from '../input-type.enum';
import { Observable } from 'rxjs/internal/Observable';
import { SingleTypeaheadItem } from './single-typeahead-item.model';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'alv-single-typeahead',
  templateUrl: './single-typeahead.component.html',
  styleUrls: ['../abstract-input.scss', './single-typeahead.component.scss']
})
export class SingleTypeaheadComponent extends AbstractInput {

  readonly TYPEAHEAD_QUERY_MIN_LENGTH = 2;

  readonly TYPEAHEAD_DEBOUNCE_TIME = 200;

  @Input() loadItems: (text: string) => Observable<SingleTypeaheadItem<any>[]>;

  @Input() focusFirst = true;

  @Output() itemSelected = new EventEmitter<SingleTypeaheadItem<any>>();

  helpId = this.id + '-help';

  loadItemsGuardedFn = this.loadItemsGuarded.bind(this);

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.SINGLE_TYPEAHEAD, inputIdGenerationService);
  }

  formatResultItem(item: SingleTypeaheadItem<any>): string {
    return item.label;
  }

  selectItem(event: NgbTypeaheadSelectItemEvent): void {

    const item = <SingleTypeaheadItem<any>>event.item;

    this.control.setValue(item);

    this.itemSelected.emit(item);
  }

  private loadItemsGuarded(text$: Observable<string>): Observable<SingleTypeaheadItem<any>[]> {
    return text$.pipe(
      debounceTime(this.TYPEAHEAD_DEBOUNCE_TIME),
      switchMap((query: string) => query.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH
        ? this.loadItems(query)
        : of([])),
      map(this.toModelArray.bind(this))
    );
  }

  private toModelArray(items: SingleTypeaheadItem<any>[]): SingleTypeaheadItem<any>[] {
    return items
      .filter((item: SingleTypeaheadItem<any>) => !this.exists(item))
      .sort((item1: SingleTypeaheadItem<any>, item2: SingleTypeaheadItem<any>) => item1.compare(item2));
  }

  private exists(model: SingleTypeaheadItem<any>): boolean {
    return this.control.value && this.control.value === model;
  }
}
