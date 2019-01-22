import {
  Component,
  EventEmitter,
  Host,
  Input, OnInit,
  Optional,
  Output,
  SkipSelf
} from '@angular/core';
import { AbstractInput } from '../../abstract-input';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../../input-id-generation.service';
import { InputType } from '../../input-type.enum';
import { Observable } from 'rxjs/internal/Observable';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { TypeaheadItem } from '../typeahead-item';

@Component({
  selector: 'alv-single-typeahead',
  templateUrl: './single-typeahead.component.html',
  styleUrls: ['../../abstract-input.scss', './single-typeahead.component.scss']
})
export class SingleTypeaheadComponent extends AbstractInput implements OnInit {

  readonly TYPEAHEAD_QUERY_MIN_LENGTH = 2;

  readonly TYPEAHEAD_DEBOUNCE_TIME = 200;

  @Input() loadItems: (text: string) => Observable<TypeaheadItem<any>[]>;

  @Input() focusFirst = true;

  @Output() itemSelected = new EventEmitter<TypeaheadItem<any>>();

  helpId = this.id + '-help';

  loadItemsGuardedFn = this.loadItemsGuarded.bind(this);

  controlValueChange$: Observable<string>;

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.SINGLE_TYPEAHEAD, inputIdGenerationService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.controlValueChange$ = this.control.valueChanges.pipe(
      filter(value => !!value),
      map(this.formatResultItem)
    );
  }

  formatResultItem(item: TypeaheadItem<any>): string {
    return item.label;
  }

  selectItem(event: NgbTypeaheadSelectItemEvent): void {

    const item = <TypeaheadItem<any>>event.item;

    this.control.setValue(item, {emitEvent: false});

    this.itemSelected.emit(item);
  }

  handleInput(event: KeyboardEvent): void {
    if (event.code === 'Backspace') {
      if (this.control.value) {
        this.control.setValue(null);
      }
    }
  }

  private loadItemsGuarded(text$: Observable<string>): Observable<TypeaheadItem<any>[]> {
    return text$.pipe(
      debounceTime(this.TYPEAHEAD_DEBOUNCE_TIME),
      switchMap((query: string) => query.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH
        ? this.loadItems(query)
        : of([])),
      map(this.toModelArray.bind(this))
    );
  }

  private toModelArray(items: TypeaheadItem<any>[]): TypeaheadItem<any>[] {
    return items
      .filter((item: TypeaheadItem<any>) => !this.exists(item))
      .sort((item1: TypeaheadItem<any>, item2: TypeaheadItem<any>) => item1.compare(item2));
  }

  private exists(model: TypeaheadItem<any>): boolean {
    return this.control.value && this.control.value === model;
  }
}
