import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDescriptionComponent } from './job-description.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { emptyJobDescriptionFormValue } from './job-description-form-value.types';

describe('JobDescriptionComponent', () => {

  let component: JobDescriptionComponent;
  let fixture: ComponentFixture<JobDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      declarations: [JobDescriptionComponent],
    })
      .overrideTemplate(JobDescriptionComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.jobDescriptionFormValue = emptyJobDescriptionFormValue();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {

    describe('title field', () => {

      it('should accept valid value', () => {
        //given
        const field = component.jobDescription.get('title');

        //when
        field.setValue(generateString(component.TITLE_MAX_LENGTH - 1));

        //then
        expect(field.valid).toBeTrue();
      });

      it('should be required', () => {
        //given
        const field = component.jobDescription.get('title');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be longer than TITLE_MAX_LENGTH', () => {
        //given
        const field = component.jobDescription.get('title');

        //when
        field.setValue(generateString(component.TITLE_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });
    });

    describe('numberOfJobs field', () => {

      it('should accept valid value', () => {
        //given
        const field = component.jobDescription.get('numberOfJobs');

        //when
        field.setValue(component.NUMBER_OF_JOBS_MIN + 1);

        //then
        expect(field.valid).toBeTrue();
      });

      it('should be required', () => {
        //given
        const field = component.jobDescription.get('numberOfJobs');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be smaller than NUMBER_OF_JOBS_MIN', () => {
        //given
        const field = component.jobDescription.get('numberOfJobs');

        //when
        field.setValue(component.NUMBER_OF_JOBS_MIN - 1);

        //then
        expect(field.hasError('min')).toBeTrue();
      });

      it('should not be larget than NUMBER_OF_JOBS_MAX', () => {
        //given
        const field = component.jobDescription.get('numberOfJobs');

        //when
        field.setValue(component.NUMBER_OF_JOBS_MAX + 1);

        //then
        expect(field.hasError('max')).toBeTrue();
      });

    });

    describe('jobDescription field', () => {

      it('should accept valid value', () => {
        //given
        const field = component.jobDescription.get('jobDescription');

        //when
        field.setValue(component.DESCRIPTION_MAX_LENGTH - 1);

        //then
        expect(field.valid).toBeTrue();
      });

      it('should be required', () => {
        //given
        const field = component.jobDescription.get('jobDescription');

        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be longer than DESCRIPTION_MAX_LENGTH', () => {
        //given
        const field = component.jobDescription.get('jobDescription');

        //when
        field.setValue(generateString(component.DESCRIPTION_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });

    });
  });

  function generateString(length: number) {
    return 'a'.repeat(length);
  }
});
