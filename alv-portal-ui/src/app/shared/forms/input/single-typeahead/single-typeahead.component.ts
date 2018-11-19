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
import { SingleTypeaheadItemModel } from './single-typeahead-item.model';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { SingleTypeaheadItemDisplayModel } from './single-typeahead-item-display.model';
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
  templateUrl: './single-typeahead.component.html',
  styleUrls: ['../abstract-input.scss', './single-typeahead.component.scss']
})
export class SingleTypeaheadComponent extends AbstractInput {

  readonly TYPEAHEAD_QUERY_MIN_LENGTH = 2;

  readonly TYPEAHEAD_DEBOUNCE_TIME = 200;

  @Input() loadItems: (text: string) => Observable<SingleTypeaheadItemModel[]>;

  @Input() editable = true;

  @Input() focusFirst = false;

  @ViewChild(NgbTypeahead) ngbTypeahead;

  inputValue: string;

  helpId = this.id + '-help';

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
    return this.control.value && this.control.value.length === 0 && !this.inputValue;
  }

  formatResultItem(item: SingleTypeaheadItemModel): string {
    return item.label;
  }

  hasFocus() {
    return this.document.activeElement.id === this.id;
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.which === Key.Enter || event.which === Key.Tab) {
      if (this.selectFreeText()) {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    if (event.which === Key.Backspace) {
      if (!this.inputValue && this.control.value && this.control.value.length) {
        this.control.value.splice(this.control.value.length - 1, 1);
      }
      return;
    }
  }

  selectItem(event: NgbTypeaheadSelectItemEvent): void {
    // preventDefault() has to be called to suppress the default selection behaviour of ng-bootstrap
    // (puts the item in the input field)
    event.preventDefault();

    this.control.setValue(event.item.model);

    this.clearInput();
    this.getTypeaheadNativeElement().focus();
  }

  selectFreeText(): SingleTypeaheadItemModel {
    const freeText = new SingleTypeaheadItemModel(this.inputValue, this.inputValue);
    if (this.editable && !this.exists(freeText) && freeText.id
        && freeText.id.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH) {

      this.control.setValue(freeText);

      this.clearInput();
      return freeText;
    }
    return null;
  }

  removeItem(item: SingleTypeaheadItemModel): void {
    this.control.setValue(this.control.value.filter((i: SingleTypeaheadItemModel) => !item.equals(i)));
    this.clearInput();
    this.getTypeaheadNativeElement().focus();
  }

  private loadItemsGuarded(text$: Observable<string>): Observable<SingleTypeaheadItemDisplayModel[]> {
    return text$.pipe(
        debounceTime(this.TYPEAHEAD_DEBOUNCE_TIME),
        switchMap((query: string) => query.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH
            ? this.loadItems(query)
            : of([])),
        map(this.toModelArray.bind(this))
    );
  }

  private toModelArray(items: SingleTypeaheadItemModel[]): SingleTypeaheadItemModel[] {
    return items
        .filter((item: SingleTypeaheadItemModel) => !this.exists(item))
        .sort((item1: SingleTypeaheadItemModel, item2: SingleTypeaheadItemModel) => item1.compare(item2));
  }

  private exists(model: SingleTypeaheadItemModel): boolean {
    return this.control.value && this.control.value && this.control.value.equals(model);
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
