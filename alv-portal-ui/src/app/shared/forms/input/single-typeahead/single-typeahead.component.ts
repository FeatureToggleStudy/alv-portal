import {
  Component,
  EventEmitter,
  Host,
  Input,
  Optional,
  Output,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { AbstractInput } from '../abstract-input';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';
import { InputType } from '../input-type.enum';
import { Observable } from 'rxjs/internal/Observable';
import { SingleTypeaheadItem } from './single-typeahead-item.model';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
}

@Component({
  selector: 'alv-single-typeahead',
  templateUrl: './single-typeahead.component.html',
  styleUrls: ['../abstract-input.scss', './single-typeahead.component.scss']
})
export class SingleTypeaheadComponent extends AbstractInput {

  readonly TYPEAHEAD_QUERY_MIN_LENGTH = 2;

  readonly TYPEAHEAD_DEBOUNCE_TIME = 200;

  @Input() loadItems: (text: string) => Observable<SingleTypeaheadItem[]>;

  @Input() focusFirst = true;

  @Output() itemSelected = new EventEmitter<SingleTypeaheadItem>();

  @ViewChild(NgbTypeahead) ngbTypeahead;

  helpId = this.id + '-help';

  loadItemsGuardedFn = this.loadItemsGuarded.bind(this);

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.SINGLE_TYPEAHEAD, inputIdGenerationService);
  }

  formatResultItem(item: SingleTypeaheadItem): string {
    return item.label;
  }

  selectItem(event: NgbTypeaheadSelectItemEvent): void {

    this.control.setValue(event.item);

    this.itemSelected.emit(event.item);
  }

  private loadItemsGuarded(text$: Observable<string>): Observable<SingleTypeaheadItem[]> {
    return text$.pipe(
        debounceTime(this.TYPEAHEAD_DEBOUNCE_TIME),
        switchMap((query: string) => query.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH
            ? this.loadItems(query)
            : of([])),
        map(this.toModelArray.bind(this))
    );
  }

  private toModelArray(items: SingleTypeaheadItem[]): SingleTypeaheadItem[] {
    return items
        .filter((item: SingleTypeaheadItem) => !this.exists(item))
        .sort((item1: SingleTypeaheadItem, item2: SingleTypeaheadItem) => item1.compare(item2));
  }

  private exists(model: SingleTypeaheadItem): boolean {
    return this.control.value && this.control.value === model;
  }

  private getTypeaheadNativeElement(): any  {
    return this.ngbTypeahead && this.ngbTypeahead._elementRef.nativeElement || {};
  }
}
