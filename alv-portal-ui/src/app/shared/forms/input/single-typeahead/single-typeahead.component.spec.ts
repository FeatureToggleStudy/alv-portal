import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleTypeaheadComponent } from './single-typeahead.component';
import { SingleTypeaheadItem } from './single-typeahead-item.model';
import { BehaviorSubject, of } from 'rxjs';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('SingleTypeaheadComponent', () => {

  let component: SingleTypeaheadComponent;
  let fixture: ComponentFixture<SingleTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbTypeaheadModule, TranslateModule],
      declarations: [SingleTypeaheadComponent, ValidationMessagesComponent],
    })
      .overrideTemplate(SingleTypeaheadComponent, '<input [ngbTypeahead]="loadItemsGuardedFn"/>') // we need only the @ViewChild
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTypeaheadComponent);
    component = fixture.componentInstance;
    component.alvControl = new FormControl();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('selectItem', () => {
    it('should add the selected item to the model', () => {
      // GIVEN

      // WHEN
      const event = jasmine.createSpyObj('event', ['preventDefault']);
      event.item = new SingleTypeaheadItem('id1', 'label1', 'model1');
      component.selectItem(event);

      // THEN
      expect(component.control.value).toEqual(new SingleTypeaheadItem('id1', 'label1', 'model1'));
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
  });
});
