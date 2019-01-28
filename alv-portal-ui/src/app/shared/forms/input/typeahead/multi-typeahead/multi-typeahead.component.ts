import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { AbstractInput } from '../../abstract-input';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../../input-id-generation.service';
import { InputType } from '../../input-type.enum';
import { Observable } from 'rxjs/internal/Observable';
import { TypeaheadItem } from '../typeahead-item';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { DOCUMENT } from '@angular/common';
import { StringTypeaheadItem } from '../string-typeahead-item';
import { EMPTY } from 'rxjs';
import { TypeaheadDisplayItem } from '../typeahead-display-item';

export const TYPEAHEAD_QUERY_MIN_LENGTH = 2;

enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
}

@Component({
  selector: 'alv-multi-typeahead',
  templateUrl: './multi-typeahead.component.html',
  styleUrls: ['../../abstract-input.scss', './multi-typeahead.component.scss']
})
export class MultiTypeaheadComponent extends AbstractInput implements OnInit {

  readonly TYPEAHEAD_DEBOUNCE_TIME = 200;

  @Input() loadItems: (text: string) => Observable<TypeaheadItem<any>[]>;

  @Input() editable = true;

  @Input() focusFirst = false;

  @Input() limit = 0;

  @Input() queryMinLength = TYPEAHEAD_QUERY_MIN_LENGTH;

  @Output() itemSelected = new EventEmitter<TypeaheadItem<any>>();

  @ViewChild(NgbTypeahead) ngbTypeahead;

  inputValue: string;

  loadItemsGuardedFn = this.loadItemsGuarded.bind(this);

  allyHelpId: string;

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService,
              @Inject(DOCUMENT) private document: any,
              private elRef: ElementRef) {
    super(controlContainer, InputType.MULTI_TYPEAHEAD, inputIdGenerationService);
  }


  ngOnInit() {
    super.ngOnInit();
    if (!this.loadItems) {
      this.loadItems = () => {
        return EMPTY;
      };
    }
    this.allyHelpId = `${this.id}-ally-help`;
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

  formatResultItem(item: TypeaheadItem<any>): string {
    return item.label;
  }

  getTypeClass(item: TypeaheadItem<any>): string {
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
        const result = [...this.control.value];
        result.splice(-1, 1);
        this.control.setValue(result);
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

  selectFreeText(): TypeaheadItem<any> {
    if (this.itemLimitReached()
      || !this.editable
      || !this.inputValue
      || this.inputValue.length < this.queryMinLength) {
      return null;
    }
    const freeTextItem = new StringTypeaheadItem(
      'free-text',
      this.inputValue,
      this.inputValue
    );
    if (this.exists(freeTextItem)) {
      return null;
    }
    this.control.setValue([...this.control.value || [], freeTextItem]);
    this.clearInput();
    return freeTextItem;
  }

  removeItem(item: TypeaheadItem<any>): void {
    this.control.setValue(this.control.value.filter((i) => !item.equals(i)));
    this.clearInput();
    this.getTypeaheadNativeElement().focus();
  }

  private loadItemsGuarded(text$: Observable<string>): Observable<TypeaheadDisplayItem[]> {
    return text$.pipe(
      debounceTime(this.TYPEAHEAD_DEBOUNCE_TIME),
      switchMap((query: string) => query.length >= this.queryMinLength
        ? this.loadItems(query)
        : of([])),
      map(this.toDisplayModelArray.bind(this))
    );
  }

  private toDisplayModelArray(items: TypeaheadItem<any>[]): TypeaheadDisplayItem[] {
    return items
      .filter((item: TypeaheadItem<any>) => !this.exists(item))
      .sort((item1: TypeaheadItem<any>, item2: TypeaheadItem<any>) => item1.compare(item2))
      .map(this.toDisplayModel);
  }

  private toDisplayModel(item: TypeaheadItem<any>, idx: number, array: TypeaheadItem<any>[]): TypeaheadDisplayItem {
    let firstInGroup = false;
    if (idx === 0 || item.type !== array[idx - 1].type) {
      firstInGroup = true;
    }
    return new TypeaheadDisplayItem(item, idx === 0, firstInGroup);
  }

  private exists(model: TypeaheadItem<any>): boolean {
    return this.control.value && !!this.control.value.find((itemModel) => model.equals(itemModel));
  }

  private itemLimitReached(): boolean {
    return this.limit && this.control.value && this.control.value.length >= this.limit;
  }

  private clearInput(): void {
    // This hack removes the invalid value from the input field on blur.
    this.ngbTypeahead._inputValueBackup = '';

    this.inputValue = '';
  }

  private getTypeaheadNativeElement(): any {
    return this.ngbTypeahead && this.ngbTypeahead._elementRef.nativeElement || {};
  }

}
