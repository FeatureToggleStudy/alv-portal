import {
  Component,
  ElementRef,
  Host,
  HostListener,
  Inject,
  Input,
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
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { DOCUMENT } from '@angular/common';

enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
}

@Component({
  selector: 'alv-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['../abstract-input.scss', './typeahead.component.scss']
})
export class TypeaheadComponent extends AbstractInput {

  readonly TYPEAHEAD_QUERY_MIN_LENGTH = 2;

  readonly TYPEAHEAD_DEBOUNCE_TIME = 200;

  @Input() loadItems: (text: string) => Observable<TypeaheadItemModel[]>;

  @Input() editable = true;

  @Input() focusFirst = false;

  @Input() limit = 0;

  @ViewChild(NgbTypeahead) ngbTypeahead;

  inputValue: string;

  helpId = this.id + '-help';

  selectedItems = [];

  loadItemsGuardedFn = this.loadItemsGuarded.bind(this);

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService,
              @Inject(DOCUMENT) private document: any,
              private elRef: ElementRef) {
    super(controlContainer, InputType.TYPEAHEAD, inputIdGenerationService);
  }

  /**
   * Listens for an outside click and selects free text if applicable
   */
  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    if (!this.elRef.nativeElement.contains(targetElement)) {
      if (!this.selectFreeText()) {
        this.clearInput();
      }
    }
  }

  showPlaceholder(): boolean {
    return this.selectedItems.length === 0 && !this.inputValue;
  }

  formatResultItem(item: TypeaheadItemModel) {
    return item.label;
  }

  getTypeClass(item: TypeaheadItemModel) {
    return `typeahead-${item.type}`;
  }

  hasFocus() {
    return this.document.activeElement.id === this.id;
  }

  getInputWidth() {
    const value = this.inputValue || '';
    if (value.length > 0) {
      return `${value.length}em`;
    }
    if (this.selectedItems.length > 0) {
      return '0.5em';
    }
    return '100%';
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.which === Key.Enter || event.which === Key.Tab) {
      if (this.selectFreeText()) {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    if (event.which === Key.Backspace) {
      if (!this.inputValue && this.selectedItems.length) {
        this.selectedItems.splice(this.selectedItems.length - 1, 1);
      }
      return;
    }
    if (this.itemLimitReached()) {
      event.preventDefault();
      return;
    }
  }

  selectItem(event: NgbTypeaheadSelectItemEvent) {
    // preventDefault() has to be called to suppress the default selection behaviour of ng-bootstrap
    // (puts the item in the input field)
    event.preventDefault();

    if (this.itemLimitReached()) {
      return;
    }
    this.selectedItems = [...this.selectedItems, event.item.model];
    this.control.setValue(this.selectedItems);

    this.clearInput();
    this.getTypeaheadNativeElement().focus();
  }

  selectFreeText() {
    const freeText = new TypeaheadItemModel('free-text', this.inputValue, this.inputValue);
    if (!this.itemLimitReached() && this.editable && !this.exists(freeText) && freeText.code
        && freeText.code.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH) {

      this.selectedItems = [...this.selectedItems, freeText];
      this.control.setValue(this.selectedItems);

      this.clearInput();
      return freeText;
    }
    return null;
  }

  removeItem(item: TypeaheadItemModel) {
    this.selectedItems = this.selectedItems.filter((i: TypeaheadItemModel) => !item.equals(i));
    this.control.setValue(this.selectedItems);
    this.clearInput();
    this.getTypeaheadNativeElement().focus();
  }

  private loadItemsGuarded(text$: Observable<string>): Observable<TypeaheadItemDisplayModel[]> {
    return text$.pipe(
        debounceTime(this.TYPEAHEAD_DEBOUNCE_TIME),
        switchMap((query: string) => query.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH
            ? this.loadItems(query)
            : of([])),
        map(this.toDisplayModelArray.bind(this))
    );
  }

  private toDisplayModelArray(items: TypeaheadItemModel[]): Array<TypeaheadItemDisplayModel> {
    return items
        .filter((item: TypeaheadItemModel) => !this.exists(item))
        .sort((item1: TypeaheadItemModel, item2: TypeaheadItemModel) => item1.compare(item2))
        .map(this.toDisplayModel);
  }

  private toDisplayModel(item: TypeaheadItemModel, idx: number, array: TypeaheadItemModel[]): TypeaheadItemDisplayModel {
    let firstInGroup = false;
    if (idx === 0 || item.type !== array[idx - 1].type) {
      firstInGroup = true;
    }
    return new TypeaheadItemDisplayModel(item, idx === 0, firstInGroup);
  }

  private exists(model: TypeaheadItemModel) {
    return !!this.selectedItems.find((itemModel: TypeaheadItemModel) => model.equals(itemModel));
  }

  private itemLimitReached(): boolean {
    return this.limit && this.selectedItems.length >= this.limit;
  }

  private clearInput(): void {
    // This hack removes the invalid value from the input field on blur.
    this.ngbTypeahead._inputValueBackup = '';

    this.inputValue = '';
  }

  private getTypeaheadNativeElement() {
    return this.ngbTypeahead && this.ngbTypeahead._elementRef.nativeElement || {};
  }
}
