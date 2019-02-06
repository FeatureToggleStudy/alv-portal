import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { PublicContactComponent } from './public-contact.component';
import { emptyPublicContactFormValue } from './public-contact-form-value.types';

describe('PublicContactComponent', () => {

  let component: PublicContactComponent;
  let fixture: ComponentFixture<PublicContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      declarations: [PublicContactComponent],
    })
      .overrideTemplate(PublicContactComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicContactComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.publicContactFormValue = emptyPublicContactFormValue();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {

    describe('salutation field', () => {

      it('should be required', () => {
        //given
        const field = component.publicContact.get('salutation');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });
    });
    describe('firstName field', () => {

      it('should be required', () => {
        //given
        const field = component.publicContact.get('firstName');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be longer than FIRST_NAME_MAX_LENGTH', () => {
        //given
        const field = component.publicContact.get('firstName');

        //when
        field.setValue('a'.repeat(component.FIRST_NAME_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });
    });
    describe('lastName field', () => {

      it('should be required', () => {
        //given
        const field = component.publicContact.get('lastName');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be longer than LAST_NAME_MAX_LENGTH', () => {
        //given
        const field = component.publicContact.get('lastName');

        //when
        field.setValue('a'.repeat(component.LAST_NAME_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });
    });
    describe('phone field', () => {

      it('should be valid phone', () => {
        //given
        const field = component.publicContact.get('phone');

        //when
        field.setValue('asfaf');

        //then
        expect(field.hasError('phoneValidator')).toBeTrue();
      });

      it('should accept valid phone', () => {
        //given
        const field = component.publicContact.get('phone');

        //when
        field.setValue('031 999 99 99');

        //then
        expect(field.valid).toBeTrue();
      });
    });
    describe('email field', () => {

      it('should be valid email', () => {
        //given
        const field = component.publicContact.get('email');

        //when
        field.setValue('asfaf');

        //then
        expect(field.hasError('emailValidator')).toBeTrue();
      });

      it('should accept valid email', () => {
        //given
        const field = component.publicContact.get('email');

        //when
        field.setValue('test.mail@test.ch');

        //then
        expect(field.valid).toBeTrue();
      });

      it('should not be longer than EMAIL_MAX_LENGTH', () => {
        //given
        const field = component.publicContact.get('email');

        //when
        field.setValue('a'.repeat(component.EMAIL_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });

      it('should be required phone or email', () => {
        //when
        component.publicContact.get('phone').setValue(null);
        component.publicContact.get('email').setValue(null);

        //then
        expect(component.publicContact.hasError('atLeastOneRequired')).toBeTrue();
      });
    });
  });
});
