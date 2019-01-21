import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { ApplicationComponent } from './application.component';
import { emptyApplicationFormValue } from './application-form-value.types';

describe('ApplicationComponent', () => {

  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      providers: [{
        provide: IsoCountryService,
        useValue: jasmine.createSpyObj('mockIsoCountryService', ['countryOptions$'])
      }],
      declarations: [ApplicationComponent],
    })
      .overrideTemplate(ApplicationComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.applicationFormValue = emptyApplicationFormValue;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {

    describe('selectedApplicationTypes group', () => {

      it('should valid if some selected', () => {
        //given
        const group = component.selectedApplicationTypes;

        //when
        group.setValue({ form: true, email: false, phone: false, post: false });

        //then
        expect(group.hasError('atLeastOneRequired')).toBeFalsy();
      });

      it('should invalid if no selected', () => {
        //given
        const group = component.selectedApplicationTypes;

        //when
        group.setValue({ form: false, email: false, phone: false, post: false });

        //then
        expect(group.hasError('atLeastOneRequired')).toBeTrue();
      });
    });

    describe('formUrl field', () => {

      it('should not exist if some selectedApplicationTypes.form not selected', () => {
        //given
        const formCheckBox = component.selectedApplicationTypes.get('form');

        //when
        formCheckBox.setValue(false);

        //then
        expect(component.application.contains('formUrl')).toBeFalse();
      });

      it('should exist if some selectedApplicationTypes.form selected', () => {
        //given
        const formCheckBox = component.selectedApplicationTypes.get('form');

        //when
        formCheckBox.setValue(true);

        //then
        expect(component.application.contains('formUrl')).toBeTrue();
      });

      describe('if exists', () => {

        beforeEach(() => {
          const formCheckBox = component.selectedApplicationTypes.get('form');
          formCheckBox.setValue(true);
        });

        it('should be required', () => {
          //given
          const field = component.application.get('formUrl');

          //when
          field.setValue(null);

          //then
          expect(field.hasError('required')).toBeTrue();
        });

        it('should be valid URL', () => {
          //given
          const field = component.application.get('formUrl');

          //when
          field.setValue('asfaf');

          //then
          expect(field.hasError('urlValidator')).toBeTrue();
        });

        it('should accept valid URL', () => {
          //given
          const field = component.application.get('formUrl');

          //when
          field.setValue('https://test.ch');

          //then
          expect(field.valid).toBeTrue();
        });
      });

    });

    describe('emailAddress field', () => {

      it('should not exist if some selectedApplicationTypes.phone not selected', () => {
        //given
        const emailCheckBox = component.selectedApplicationTypes.get('email');

        //when
        emailCheckBox.setValue(false);

        //then
        expect(component.application.contains('emailAddress')).toBeFalse();
      });

      it('should exist if some selectedApplicationTypes.email selected', () => {
        //given
        const emailCheckBox = component.selectedApplicationTypes.get('email');

        //when
        emailCheckBox.setValue(true);

        //then
        expect(component.application.contains('emailAddress')).toBeTrue();
      });

      describe('if exists', () => {

        beforeEach(() => {
          const emailCheckBox = component.selectedApplicationTypes.get('email');
          emailCheckBox.setValue(true);
        });

        it('should be required', () => {
          //given
          const field = component.application.get('emailAddress');

          //when
          field.setValue(null);

          //then
          expect(field.hasError('required')).toBeTrue();
        });

        it('should be valid email', () => {
          //given
          const field = component.application.get('emailAddress');

          //when
          field.setValue('asfaf');

          //then
          expect(field.hasError('emailValidator')).toBeTrue();
        });

        it('should accept valid email', () => {
          //given
          const field = component.application.get('emailAddress');

          //when
          field.setValue('test.mail@test.ch');

          //then
          expect(field.valid).toBeTrue();
        });
      });

    });

    describe('phoneNumber field', () => {

      it('should not exist if some selectedApplicationTypes.phone not selected', () => {
        //given
        const phoneCheckBox = component.selectedApplicationTypes.get('phone');

        //when
        phoneCheckBox.setValue(false);

        //then
        expect(component.application.contains('phoneNumber')).toBeFalse();
      });

      it('should exist if some selectedApplicationTypes.phone selected', () => {
        //given
        const phoneCheckBox = component.selectedApplicationTypes.get('phone');

        //when
        phoneCheckBox.setValue(true);

        //then
        expect(component.application.contains('phoneNumber')).toBeTrue();
      });

      describe('if exists', () => {

        beforeEach(() => {
          const phoneCheckBox = component.selectedApplicationTypes.get('phone');
          phoneCheckBox.setValue(true);
        });

        it('should be required', () => {
          //given
          const field = component.application.get('phoneNumber');

          //when
          field.setValue(null);

          //then
          expect(field.hasError('required')).toBeTrue();
        });

        it('should be valid phone', () => {
          //given
          const field = component.application.get('phoneNumber');

          //when
          field.setValue('asfaf');

          //then
          expect(field.hasError('phoneValidator')).toBeTrue();
        });

        it('should accept valid phone', () => {
          //given
          const field = component.application.get('phoneNumber');

          //when
          field.setValue('031 999 99 99');

          //then
          expect(field.valid).toBeTrue();
        });
      });
    });

    describe('post checkbox', () => {
      it('should not have a postAddress if post is not selected', () => {
        //given
        const postCheckBox = component.selectedApplicationTypes.get('post');

        //when
        postCheckBox.setValue(false);

        //then
        expect(component.application.contains('postAddress')).toBeFalse();
      });
    });

  });
});
