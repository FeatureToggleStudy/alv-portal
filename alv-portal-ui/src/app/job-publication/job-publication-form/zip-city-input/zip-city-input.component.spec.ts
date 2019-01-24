import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { ZipCityInputComponent } from './zip-city-input.component';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import SpyObj = jasmine.SpyObj;

describe('ZipCityInputComponent', () => {

  let component: ZipCityInputComponent;
  let fixture: ComponentFixture<ZipCityInputComponent>;

  let mockLocalitySuggestionService: SpyObj<LocalitySuggestionService>;

  beforeEach(async(() => {
    mockLocalitySuggestionService = jasmine.createSpyObj('mockLocalitySuggestionService', ['fetchJobPublicationLocations']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      providers: [
        { provide: LocalitySuggestionService, useValue: mockLocalitySuggestionService }
      ],
      declarations: [ZipCityInputComponent],
    })
      .overrideTemplate(ZipCityInputComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCityInputComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.countryIsoCode = 'CH';
    component.zipCityFormValue = { city: null, zipCode: null };

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {
    describe('if autocomplete enabled', () => {
      describe('name field', () => {

        it('zipAndCity should be required', () => {
          //given
          const field = component.parentForm.get('zipAndCity');

          //when
          field.setValue(null);

          //then
          expect(field.hasError('required')).toBeTrue();
        });

      });

    });
    describe('if autocomplete disabled', () => {
      beforeEach(() => {
        component.countryIsoCode = 'PL';
      });

      describe('city field', () => {
        it('should be required', () => {
          //given

          const field = component.zipAndCity.get('city');

          //when
          field.setValue(null);

          //then
          expect(field.hasError('required')).toBeTrue();
        });

        it('should not be longer than CITY_MAX_LENGTH', () => {
          //given
          const field = component.zipAndCity.get('city');

          //when
          field.setValue(generateString(component.CITY_MAX_LENGTH + 1));

          //then
          expect(field.hasError('maxlength')).toBeTrue();
        });
      });

      describe('zipCode field', () => {
        it('should be required', () => {
          //given
          const field = component.zipAndCity.get('zipCode');

          //when
          field.setValue(null);

          //then
          expect(field.hasError('required')).toBeTrue();
        });

        it('should be valid zipCode', () => {
          //given
          const field = component.zipAndCity.get('zipCode');

          //when
          field.setValue('abc123456Q@W867668');

          //then
          expect(field.hasError('pattern')).toBeTrue();
        });

        it('should accept valid zipCode', () => {
          //given
          const field = component.zipAndCity.get('zipCode');

          //when
          field.setValue('8134');

          //then
          expect(field.valid).toBeTrue();
        });
      });
    });
  });

  function generateString(length: number) {
    return 'a'.repeat(length);
  }
});
