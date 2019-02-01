import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { PostAddressFormComponent } from './post-address-form.component';
import { emptyPostAddressFormValue } from './post-address-form-value.types';
import { of } from 'rxjs';
import { IsoCountryService } from '../iso-country.service';

describe('PostAddressFormComponent', () => {

  let component: PostAddressFormComponent;
  let fixture: ComponentFixture<PostAddressFormComponent>;

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
      declarations: [PostAddressFormComponent],
    })
      .overrideTemplate(PostAddressFormComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAddressFormComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.postAddressFormValue = emptyPostAddressFormValue();
    component.legend = 'legend';
    component.groupName = 'testGroup';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {

    describe('name field', () => {

      it('should be required', () => {
        //given
        const field = component.postAddress.get('name');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be longer than NAME_MAX_LENGTH', () => {
        //given
        const field = component.postAddress.get('name');

        //when
        field.setValue(generateString(component.NAME_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });
    });
    describe('houseNumber field', () => {

      it('should not be required', () => {
        //given
        const field = component.postAddress.get('houseNumber');

        //when
        field.setValue(null);

        //then
        expect(field.value).toBeNull();
      });

      it('should match digits', () => {
        //given
        const field = component.postAddress.get('houseNumber');

        //when
        field.setValue('111');

        //then
        expect(field.valid).toBeTrue();
      });

      it('should match digits followed by characters', () => {
        //given
        const field = component.postAddress.get('houseNumber');

        //when
        field.setValue('1' + generateString(component.HOUSE_NUMBER_MAX_LENGTH - 1));

        //then
        expect(field.valid).toBeTrue();
      });

      it('should not match only characters', () => {
        //given
        const field = component.postAddress.get('houseNumber');

        //when
        field.setValue(generateString(component.HOUSE_NUMBER_MAX_LENGTH));

        //then
        expect(field.hasError('houseNumValidator')).toBeTrue();
      });

      it('should not be longer than HOUSE_NUMBER_MAX_LENGTH', () => {
        //given
        const field = component.postAddress.get('houseNumber');

        //when
        field.setValue(generateString(component.HOUSE_NUMBER_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });
    });

    describe('postOfficeBoxNumberOrStreet field', () => {

      describe('street field', () => {

        it('should not be longer than NAME_MAX_LENGTH', () => {
          //given
          const field = component.postAddress.get('postOfficeBoxNumberOrStreet').get('street');

          //when
          field.setValue(generateString(component.STREET_MAX_LENGTH + 1));

          //then
          expect(field.hasError('maxlength')).toBeTrue();
        });
      });

      describe('postOfficeBoxNumber field', () => {

        it('should not be longer than PO_BOX_MAX_LENGTH', () => {
          //given
          const field = component.postAddress.get('postOfficeBoxNumberOrStreet').get('postOfficeBoxNumber');

          //when
          field.setValue(generateString(component.PO_BOX_MAX_LENGTH + 1));

          //then
          expect(field.hasError('maxlength')).toBeTrue();
        });

        it('should not be a negative value', () => {
          //given
          const field = component.postAddress.get('postOfficeBoxNumberOrStreet').get('postOfficeBoxNumber');

          //when
          field.setValue(-54);

          //then
          expect(field.hasError('min')).toBeTrue();
        });
      });

      it('should be required postOfficeBoxNumber or street', () => {
        //given
        const field = component.postAddress.get('postOfficeBoxNumberOrStreet');

        //when
        field.get('postOfficeBoxNumber').setValue(null);
        field.get('street').setValue(null);

        //then
        expect(field.hasError('postOfficeBoxNumberOrStreetRequired')).toBeTrue();
      });

    });
  });

  function generateString(length: number) {
    return 'a'.repeat(length);
  }
});
