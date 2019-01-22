import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MultiTypeaheadComponent,
  TYPEAHEAD_QUERY_MIN_LENGTH
} from './multi-typeahead.component';
import { TypeaheadItem } from '../typeahead-item';
import { BehaviorSubject, of } from 'rxjs';
import { ValidationMessagesComponent } from '../../validation-messages/validation-messages.component';
import { FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StringTypeaheadItem } from '../string-typeahead-item';

describe('MultiTypeaheadComponent', () => {

  let component: MultiTypeaheadComponent;
  let fixture: ComponentFixture<MultiTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbTypeaheadModule, TranslateModule],
      declarations: [MultiTypeaheadComponent, ValidationMessagesComponent],
    })
      .overrideTemplate(MultiTypeaheadComponent, '<input [ngbTypeahead]="loadItemsGuardedFn"/>') // we need only the @ViewChild
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTypeaheadComponent);
    component = fixture.componentInstance;
    component.alvControl = new FormControl();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('removeItem', () => {
    it('should remove an existing item', () => {
      // GIVEN
      component.control.setValue([new StringTypeaheadItem('type', 'code', 'label')]);

      // WHEN
      component.removeItem(new StringTypeaheadItem('type', 'code', 'label'));

      // THEN
      expect(component.control.value.length).toEqual(0);
    });
  });

  describe('selectFreeText', () => {
    it('should add a new model with type: free-text ', () => {
      // GIVEN
      component.control.setValue([new StringTypeaheadItem('type', 'code', 'label')]);

      // WHEN
      component.inputValue = 'free';
      const freeText = component.selectFreeText();

      // THEN
      const expectedFreeText = new StringTypeaheadItem('free-text', 'free', 'free');
      expect(freeText).toEqual(expectedFreeText);
      expect(component.control.value.length).toEqual(2);
      expect(component.control.value).toContain(new StringTypeaheadItem('type', 'code', 'label'));
      expect(component.control.value).toContain(freeText);
    });

    it('should not allow duplicates', () => {
      // GIVEN
      component.control.setValue([new StringTypeaheadItem('free-text', 'free text value', 'free text value')]);

      // WHEN
      component.inputValue = 'free text value';
      const freeText = component.selectFreeText();

      // THEN
      expect(freeText).toEqual(null);
      expect(component.control.value.length).toEqual(1);
      expect(component.control.value).toContain(new StringTypeaheadItem('free-text', 'free text value', 'free text value'));
    });

    it('should not allow free text value with length < TYPEAHEAD_QUERY_MIN_LENGTH', () => {
      // WHEN
      component.inputValue = new Array(TYPEAHEAD_QUERY_MIN_LENGTH - 1).fill('a').join('');
      const freeText = component.selectFreeText();

      // THEN
      expect(freeText).toEqual(null);
      expect(component.control.value).toEqual(null);
    });
  });

  describe('selectItem', () => {
    it('should add the selected item to the model', () => {
      // GIVEN
      component.control.setValue([new StringTypeaheadItem('type', 'code', 'label')]);

      // WHEN
      const event = jasmine.createSpyObj('event', ['preventDefault']);
      event.item = { model: new StringTypeaheadItem('type', 'code1', 'label1') };
      component.selectItem(event);

      // THEN
      expect(component.control.value.length).toEqual(2);
      expect(component.control.value).toContain(new StringTypeaheadItem('type', 'code', 'label'));
      expect(component.control.value).toContain(new StringTypeaheadItem('type', 'code1', 'label1'));
    });
  });

  describe('loadItemsGuarded', () => {
    let input$;
    beforeEach(() => {
      input$ = new BehaviorSubject('');
    });

    it('should not load items if the input is shorter than 2 characters', fakeAsync(() => {
      // GIVEN
      component.loadItems = (value: string) => of([]);
      spyOn(component, 'loadItems').and.callThrough();
      component.loadItemsGuardedFn(input$).subscribe((o: any) => '');

      // WHEN
      input$.next('1');
      tick(201);

      // THEN
      expect(component.loadItems).not.toHaveBeenCalled();
    }));

    it('should load items if the input is longer than 2 characters (inclusive)', fakeAsync(() => {
      // GIVEN
      component.loadItems = (value: string) => of([]);
      spyOn(component, 'loadItems').and.callThrough();
      component.loadItemsGuardedFn(input$).subscribe((o: any) => '');

      // WHEN
      input$.next('12');
      tick(201);

      // THEN
      expect(component.loadItems).toHaveBeenCalledWith('12');
    }));

    it('should filter the already selected values from the loaded items', fakeAsync(() => {
      let loadedItems: Array<any>;

      // GIVEN
      component.control.setValue([new StringTypeaheadItem('type', 'code', 'label')]);
      component.loadItems = (value: string) => of([new StringTypeaheadItem('type', 'code', 'label')]);
      component.loadItemsGuardedFn(input$).subscribe((items: any) => loadedItems = items);

      // WHEN
      input$.next('123');
      tick(201);

      // THEN
      expect(loadedItems.length).toEqual(0);
    }));

    it('should sort the loaded items by the order property', fakeAsync(() => {
      let loadedItems: Array<any>;

      // GIVEN
      component.loadItems = (value: string) => of([
        new StringTypeaheadItem('type', 'code0', 'label0', 3),
        new StringTypeaheadItem('type', 'code1', 'label1', 2),
        new StringTypeaheadItem('type', 'code2', 'label2', 0),
        new StringTypeaheadItem('type', 'code3', 'label3', 1)
      ]);
      component.loadItemsGuardedFn(input$).subscribe((items: any) => loadedItems = items);

      // WHEN
      input$.next('123');
      tick(201);

      // THEN
      expect(loadedItems).toEqual([
        new TypeaheadDisplayItem(new StringTypeaheadItem('type', 'code2', 'label2', 0), true, true),
        new TypeaheadDisplayItem(new StringTypeaheadItem('type', 'code3', 'label3', 1), false, false),
        new TypeaheadDisplayItem(new StringTypeaheadItem('type', 'code1', 'label1', 2), false, false),
        new TypeaheadDisplayItem(new StringTypeaheadItem('type', 'code0', 'label0', 3), false, false)
      ]);
    }));

    it('should mark the first items for every type', fakeAsync(() => {
      let loadedItems: Array<any>;

      // GIVEN
      component.loadItems = (value: string) => of([
        new StringTypeaheadItem('type0', 'code0', 'label0', 0),
        new StringTypeaheadItem('type0', 'code1', 'label1', 0),
        new StringTypeaheadItem('type1', 'code2', 'label2', 1),
        new StringTypeaheadItem('type1', 'code3', 'label3', 1)
      ]);
      component.loadItemsGuardedFn(input$).subscribe((items: any) => loadedItems = items);

      // WHEN
      input$.next('123');
      tick(201);

      // THEN
      expect(loadedItems).toEqual([
        new TypeaheadDisplayItem(new StringTypeaheadItem('type0', 'code0', 'label0', 0), true, true),
        new TypeaheadDisplayItem(new StringTypeaheadItem('type0', 'code1', 'label1', 0), false, false),
        new TypeaheadDisplayItem(new StringTypeaheadItem('type1', 'code2', 'label2', 1), false, true),
        new TypeaheadDisplayItem(new StringTypeaheadItem('type1', 'code3', 'label3', 1), false, false)
      ]);
    }));
  });
});
