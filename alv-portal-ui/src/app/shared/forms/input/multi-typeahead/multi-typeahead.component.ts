import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Inject,
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
import { MultiTypeaheadItemModel } from './multi-typeahead-item.model';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { MultiTypeaheadItemDisplayModel } from './multi-typeahead-item-display.model';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { DOCUMENT } from '@angular/common';

enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
}

@Component({
  selector: 'alv-multi-typeahead',
  templateUrl: './multi-typeahead.component.html',
  styleUrls: ['../abstract-input.scss', './multi-typeahead.component.scss']
})
export class MultiTypeaheadComponent extends AbstractInput {

  readonly TYPEAHEAD_QUERY_MIN_LENGTH = 2;

  readonly TYPEAHEAD_DEBOUNCE_TIME = 200;

  @Input() loadItems: (text: string) => Observable<MultiTypeaheadItemModel[]>;

  @Input() editable = true;

  @Input() focusFirst = false;

  @Input() limit = 0;

  @Output() itemSelected = new EventEmitter<MultiTypeaheadItemModel>();

  @ViewChild(NgbTypeahead) ngbTypeahead;

  inputValue: string;

  helpId = this.id + '-help';

  loadItemsGuardedFn = this.loadItemsGuarded.bind(this);

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService,
              @Inject(DOCUMENT) private document: any,
              private elRef: ElementRef) {
    super(controlContainer, InputType.MULTI_TYPEAHEAD, inputIdGenerationService);
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
    return !this.inputValue && (!this.control.value || this.control.value && this.control.value.length === 0);
  }

  formatResultItem(item: MultiTypeaheadItemModel): string {
    return item.label;
  }

  getTypeClass(item: MultiTypeaheadItemModel): string {
    return `badge-${item.type}`;
  }

  hasFocus() {
    return this.document.activeElement.id === this.id;
  }

  getInputWidth(): string {
    const value = this.inputValue || '';
    if (value.length > 0) {
      return `${value.length}em`;
    }
    if (this.control.value && this.control.value.length > 0) {
      return '0.5em';
    }
    return '100%';
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'Tab') {
      if (this.selectFreeText()) {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    if (event.code === 'Backspace') {
      if (!this.inputValue && this.control.value && this.control.value.length) {
        this.control.value.splice(this.control.value.length - 1, 1);
      }
      return;
    }
    if (this.itemLimitReached()) {
      event.preventDefault();
      return;
    }
  }

  selectItem(event: NgbTypeaheadSelectItemEvent): void {
    // preventDefault() has to be called to suppress the default selection behaviour of ng-bootstrap
    // (puts the item in the input field)
    event.preventDefault();

    if (this.itemLimitReached()) {
      return;
    }
    this.control.setValue([...this.control.value || [], event.item.model]);

    this.itemSelected.emit(event.item.model);

    this.clearInput();
    this.getTypeaheadNativeElement().focus();
  }

  selectFreeText(): MultiTypeaheadItemModel {
    const freeText = new MultiTypeaheadItemModel('free-text', this.inputValue, this.inputValue);
    if (!this.itemLimitReached() && this.editable && !this.exists(freeText) && freeText.code
        && freeText.code.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH) {

      this.control.setValue([...this.control.value || [], freeText]);

      this.clearInput();
      return freeText;
    }
    return null;
  }

  removeItem(item: MultiTypeaheadItemModel): void {
    this.control.setValue(this.control.value.filter((i: MultiTypeaheadItemModel) => !item.equals(i)));
    this.clearInput();
    this.getTypeaheadNativeElement().focus();
  }

  private loadItemsGuarded(text$: Observable<string>): Observable<MultiTypeaheadItemDisplayModel[]> {
    return text$.pipe(
        debounceTime(this.TYPEAHEAD_DEBOUNCE_TIME),
        switchMap((query: string) => query.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH
            ? this.loadItems(query)
            : of([])),
        map(this.toDisplayModelArray.bind(this))
    );
  }

  private toDisplayModelArray(items: MultiTypeaheadItemModel[]): MultiTypeaheadItemDisplayModel[] {
    return items
      .filter((item: MultiTypeaheadItemModel) => !this.exists(item))
      .sort((item1: MultiTypeaheadItemModel, item2: MultiTypeaheadItemModel) => item1.compare(item2))
        .map(this.toDisplayModel);
  }

  private toDisplayModel(item: MultiTypeaheadItemModel, idx: number, array: MultiTypeaheadItemModel[]): MultiTypeaheadItemDisplayModel {
    let firstInGroup = false;
    if (idx === 0 || item.type !== array[idx - 1].type) {
      firstInGroup = true;
    }
    return new MultiTypeaheadItemDisplayModel(item, idx === 0, firstInGroup);
  }

  private exists(model: MultiTypeaheadItemModel): boolean {
    return this.control.value && !!this.control.value.find((itemModel: MultiTypeaheadItemModel) => model.equals(itemModel));
  }

  private itemLimitReached(): boolean {
    return this.limit && this.control.value && this.control.value.length >= this.limit;
  }

  private clearInput(): void {
    // This hack removes the invalid value from the input field on blur.
    this.ngbTypeahead._inputValueBackup = '';

    this.inputValue = '';
  }

  private getTypeaheadNativeElement(): any  {
    return this.ngbTypeahead && this.ngbTypeahead._elementRef.nativeElement || {};
  }
}
