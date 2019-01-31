import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { LocationComponent } from './location.component';
import { emptyLocationFormValue } from './location-form-value.types';
import { of } from 'rxjs';
import { IsoCountryService } from '../iso-country.service';

describe('LocationComponent', () => {

  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  const mockIsoCountryService = {
    countryOptions$: of([
      { value: 'CH', label: 'CH' },
      { value: 'DE', label: 'DE' },
    ])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      providers: [
        { provide: IsoCountryService, useValue: mockIsoCountryService },
      ],
      declarations: [LocationComponent],
    })
      .overrideTemplate(LocationComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.locationFormValue = emptyLocationFormValue();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {
    describe('remarks field', () => {

      it('should not be longer than FIELDS_MAX_LENGTH', () => {
        //given
        const field = component.location.get('remarks');

        //when
        field.setValue('a'.repeat(component.REMARK_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });
    });
  });
});
