import { Component, Host, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractInput } from '../abstract-input';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';
import { InputType } from '../input-type.enum';
import { Observable } from 'rxjs/internal/Observable';
import { TypeaheadItemModel } from './typeahead-item.model';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadItemDisplayModel } from './typeahead-item-display.model';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'alv-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['../abstract-input.scss', './typeahead.component.scss']
})
export class TypeaheadComponent extends AbstractInput implements OnInit {

  @Input() itemLoader: (text: string) => Observable<TypeaheadItemModel[]>;

  @Input() placeholder: string;

  @Input() editable = true;

  @Input() focusFirst = false;

  //@Input() tooltip: string;

  @Input() limit = 0;

  @Input() size: 'sm' | 'lg' = 'sm';

  inputValue: string;

  selectedItems = [];

  private readonly TYPEAHEAD_QUERY_MIN_LENGTH = 2;

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.TYPEAHEAD, inputIdGenerationService);
  }

  ngOnInit() {
  }

  showPlaceholder(): boolean {
    return this.selectedItems.length === 0;
  }

  formatResultItem(item: TypeaheadItemModel) {
    return item.label;
  }

  selectItem(event: NgbTypeaheadSelectItemEvent) {

    if (!this.canSelect()) {
      event.preventDefault();
      return;
    }

    this.control.setValue([...this.selectedItems, event.item.model]);

    this.clearInput();
  }

  wrappedItemLoader = (text$: Observable<string>): Observable<TypeaheadItemDisplayModel[]> => {

    const toDisplayModel = (m: TypeaheadItemModel, idx: number, array: TypeaheadItemModel[]) => {
      let fistInGroup = false;
      if (idx === 0 || m.type !== array[idx - 1].type) {
        fistInGroup = true;
      }
      return new TypeaheadItemDisplayModel(m, idx === 0, fistInGroup);
    };

    const toDisplayModelArray = (items: TypeaheadItemModel[]) => items
        .filter((m: TypeaheadItemModel) => !this.exists(m))
        .sort((o1: TypeaheadItemModel, o2: TypeaheadItemModel) => o1.compare(o2))
        .map(toDisplayModel);

    return text$.pipe(
        switchMap((query: string) => query.length >= this.TYPEAHEAD_QUERY_MIN_LENGTH
            ? this.itemLoader(query)
            : of([])),
          map(toDisplayModelArray)
    )
        ;
  };

  private exists(model: TypeaheadItemModel) {
    return !!this.selectedItems.find((i: TypeaheadItemModel) => model.equals(i));
  }

  private canSelect(): boolean {
    return !this.limit || this.selectedItems.length < this.limit;
  }

  private clearInput(): void {
    // This hack removes the invalid value from the input field.
    // The idea is from this PR: https://github.com/ng-bootstrap/ng-bootstrap/pull/1468
    //
    // todo: We have to review this after updating to the next ng-bootstrap versions.
    // this.ngbTypeahead._userInput = '';
    this.inputValue = '';
  }
}
