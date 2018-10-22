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
  Return = 8,
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

  @Input() itemLoader: (text: string) => Observable<TypeaheadItemModel[]>;

  @Input() editable = true;

  @Input() focusFirst = false;

  @Input() limit = 0;

  @ViewChild(NgbTypeahead) ngbTypeahead;

  inputValue: string;

  helpId = this.id + '-help';

  selectedItems = [];

  wrappedItemLoaderFn = this.wrappedItemLoader.bind(this);

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService,
              @Inject(DOCUMENT) private document: any,
              private elRef: ElementRef) {
    super(controlContainer, InputType.TYPEAHEAD, inputIdGenerationService);
  }

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
    const value = this.getTypeaheadNativeElement().value || '';
    if (value.length > 0) {
      return `${value.length}em`;
    } else if (this.selectedItems.length > 0) {
      return '0.5em';
    } else {
      return '100%';
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.which === Key.Enter || event.which === Key.Tab) {
      if (this.selectFreeText()) {
        event.preventDefault();
        event.stopPropagation();
      }
    } else if (event.which === Key.Return) {
      if (!this.inputValue && this.selectedItems.length) {
        this.selectedItems.splice(this.selectedItems.length - 1, 1);
      }
    } else if (!this.canSelect()) {
      event.preventDefault();
    }
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

  selectFreeText() {
    const freeText = new TypeaheadItemModel('free-text', this.inputValue, this.inputValue);
    if (this.canSelect() && this.editable && !this.exists(freeText) && freeText.code
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

  wrappedItemLoader(text$: Observable<string>): Observable<TypeaheadItemDisplayModel[]> {
    return text$.pipe(
        debounceTime(this.TYPEAHEAD_DEBOUNCE_TIME),
        switchMap((query: string) => query.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH
            ? this.itemLoader(query)
            : of([])),
        map(this.toDisplayModelArray.bind(this))
    );
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
    // This hack removes the invalid value from the input field on blur.
    this.ngbTypeahead._inputValueBackup = '';

    this.inputValue = '';
  }

  private getTypeaheadNativeElement() {
    return this.ngbTypeahead && this.ngbTypeahead._elementRef.nativeElement || {};
  }
}
