import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { emptyContactFormValue } from './contact-form-value.types';
import { By } from 'protractor';

describe('ContactComponent', () => {

  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      declarations: [ContactComponent],
    })
      .overrideTemplate(ContactComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.contactFormValue = emptyContactFormValue('de');
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {
    describe('salutation field', () => {

      it('should be required', () => {
        //given
        const field = component.contact.get('salutation');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });
    });
    describe('firstName field', () => {

      it('should be required', () => {
        //given
        const field = component.contact.get('firstName');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should accept valid value', () => {
        //given
        const field = component.contact.get('firstName');

        //when
        field.setValue(generateString(component.FIRST_NAME_MAX_LENGTH - 1));

        //then
        expect(field.valid).toBeTrue();
      });

      it('should not be longer than FIRST_NAME_MAX_LENGTH', () => {
        //given
        const field = component.contact.get('firstName');

        //when
        field.setValue('a'.repeat(component.FIRST_NAME_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });
    });

    describe('lastName field', () => {

      it('should be required', () => {
        //given
        const field = component.contact.get('lastName');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should accept valid value', () => {
        //given
        const field = component.contact.get('lastName');

        //when
        field.setValue(generateString(component.LAST_NAME_MAX_LENGTH - 1));

        //then
        expect(field.valid).toBeTrue();
      });

      it('should  accept whitespace in between', () => {
        //given
        const field = component.contact.get('lastName');

        //when
        field.setValue('test contact');

        //then
        expect(field.value).toEqual('test contact');
      });

      it('should not be longer than LAST_NAME_MAX_LENGTH', () => {
        //given
        const field = component.contact.get('lastName');

        //when
        field.setValue('a'.repeat(component.LAST_NAME_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });
    });

    describe('phone field', () => {

      it('should be required', () => {
        //given
        const field = component.contact.get('phone');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should be valid phone', () => {
        //given
        const field = component.contact.get('phone');

        //when
        field.setValue('asfaf');

        //then
        expect(field.hasError('phoneValidator')).toBeTrue();
      });

      it('should accept valid phone', () => {
        //given
        const field = component.contact.get('phone');

        //when
        field.setValue('031 999 99 99');

        //then
        expect(field.valid).toBeTrue();
      });
    });

    describe('email field', () => {

      it('should be required', () => {
        //given
        const field = component.contact.get('email');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should be valid email', () => {
        //given
        const field = component.contact.get('email');

        //when
        field.setValue('asfaf');

        //then
        expect(field.hasError('emailValidator')).toBeTrue();
      });

      it('should accept valid email', () => {
        //given
        const field = component.contact.get('email');

        //when
        field.setValue('test.mail@test.ch');

        //then
        expect(field.valid).toBeTrue();
      });

    });
  });

  function generateString(length: number) {
    return 'a'.repeat(length);
  }
});
