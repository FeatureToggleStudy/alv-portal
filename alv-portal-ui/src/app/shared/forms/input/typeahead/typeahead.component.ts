import {
  Component, ElementRef,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { AbstractInput } from '../abstract-input';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';
import { InputType } from '../input-type.enum';
import { Observable } from 'rxjs/internal/Observable';
import { TypeaheadItemModel } from './typeahead-item.model';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadItemDisplayModel } from './typeahead-item-display.model';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'alv-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['../abstract-input.scss', './typeahead.component.scss']
})
export class TypeaheadComponent extends AbstractInput {

  @Input() itemLoader: (text: string) => Observable<TypeaheadItemModel[]>;

  @Input() editable = true;

  @Input() focusFirst = false;

  //@Input() tooltip: string;

  @Input() limit = 0;

  @Input() size: 'sm' | 'lg' = 'sm';

  @ViewChild(NgbTypeahead) ngbTypeahead;

  inputValue: string;

  selectedItems = [];

  wrappedItemLoaderFn = this.wrappedItemLoader.bind(this);

  private readonly TYPEAHEAD_QUERY_MIN_LENGTH = 2;

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.TYPEAHEAD, inputIdGenerationService);
  }

  showPlaceholder(): boolean {
    return this.selectedItems.length === 0 && !this.inputValue;
  }

  formatResultItem(item: TypeaheadItemModel) {
    return item.label;
  }

  selectItem(event: NgbTypeaheadSelectItemEvent) {
    event.preventDefault();
    if (!this.canSelect()) {
      return;
    }
    this.selectedItems = [...this.selectedItems, event.item.model];
    this.control.setValue(this.selectedItems);

    this.clearInput();
    this.getTypeaheadNativeElement().focus();
  }

  wrappedItemLoader(text$: Observable<string>): Observable<TypeaheadItemDisplayModel[]> {
    return text$.pipe(
        switchMap((query: string) => query.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH
            ? this.itemLoader(query)
            : of([])),
        map(this.toDisplayModelArray.bind(this))
    );
  }

  getItemClass(item: TypeaheadItemModel) {
    return `typeahead-${item.type}`;
  }

  getTypeClass(item: TypeaheadItemModel) {
    return `typeahead-${item.type}`;
  }

  getInputWidth() {
    const value = this.getTypeaheadNativeElement().value || '';
    if (value.length > 0) {
      return `${value.length / 1.7}em`;
    } else if (this.selectedItems.length > 0) {
      return '0.5em';
    } else {
      return '100%';
    }
  }

  removeItem(item: TypeaheadItemModel) {
    this.selectedItems = this.selectedItems.filter((i: TypeaheadItemModel) => !item.equals(i));
    this.control.setValue(this.selectedItems);
    this.inputValue = '';
    this.getTypeaheadNativeElement().focus();
  }

  hasFocus() {
    return document.activeElement.id === this.id;
  }

  private toDisplayModelArray(items: TypeaheadItemModel[]): Array<TypeaheadItemDisplayModel> {
    return items.filter((m: TypeaheadItemModel) => !this.exists(m))
        .sort((o1: TypeaheadItemModel, o2: TypeaheadItemModel) => {
          return o1.compare(o2);
        })
        .map(this.toDisplayModel.bind(this));
  }

  private toDisplayModel(m: TypeaheadItemModel, idx: number, array: TypeaheadItemModel[]): TypeaheadItemDisplayModel {
    let firstInGroup = false;
    if (idx === 0 || m.type !== array[idx - 1].type) {
      firstInGroup = true;
    }
    return new TypeaheadItemDisplayModel(m, idx === 0, firstInGroup);
  }

  private exists(model: TypeaheadItemModel) {
    return !!this.selectedItems.find((i: TypeaheadItemModel) => model.equals(i));
  }

  private canSelect(): boolean {
    return !this.limit || this.selectedItems.length < this.limit;
  }

  private clearInput(): void {
    this.inputValue = '';
  }

  private getTypeaheadNativeElement() {
    return this.ngbTypeahead && this.ngbTypeahead._elementRef.nativeElement || {};
  }
}
