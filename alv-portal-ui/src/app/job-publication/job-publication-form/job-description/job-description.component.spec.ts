import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDescriptionComponent } from './job-description.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import {
  emptyJobDescriptionFormValue,
  JobDescriptionFormValue
} from './job-description-form-value.types';

describe('JobDescriptionComponent', () => {

  let component: JobDescriptionComponent;
  let fixture: ComponentFixture<JobDescriptionComponent>;
  let jobPublicationForm: FormGroup;

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
    jobPublicationForm = new FormGroup({});
    fixture = TestBed.createComponent(JobDescriptionComponent);
    component = fixture.componentInstance;
    component.parentForm = jobPublicationForm;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should initialize with the given JobDescriptionFormValue', () => {
      //given
      const formValue: JobDescriptionFormValue = {
        title: 'test-title',
        numberOfJobs: 2,
        jobDescription: 'test-description',
      };

      //when
      component.jobDescriptionFormValue = formValue;
      component.ngOnInit();

      //then
      expect(jobPublicationForm.value['jobDescription']).toEqual(formValue);
    });

  });

  describe('validation', () => {
    beforeEach(() => {
      component.jobDescriptionFormValue = emptyJobDescriptionFormValue;
      component.ngOnInit();
    });

    describe('title field', () => {
      it('should be required', () => {
        //given
        const field = jobPublicationForm.get('jobDescription.title');

        //when
        const title = null;
        component.jobDescriptionFormValue = { ...emptyJobDescriptionFormValue, title };

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be longer than TITLE_MAX_LENGTH', () => {
        //given
        const field = jobPublicationForm.get('jobDescription.title');

        //when
        const title = generateString(component.TITLE_MAX_LENGTH + 1);
        component.jobDescriptionFormValue = { ...emptyJobDescriptionFormValue, title };

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });

    });

    describe('numberOfJobs field', () => {

      it('should be required', () => {
        //given
        const field = jobPublicationForm.get('jobDescription.numberOfJobs');

        //when
        const numberOfJobs = null;
        component.jobDescriptionFormValue = {
          ...emptyJobDescriptionFormValue,
          numberOfJobs
        };

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be smaller than NUMBER_OF_JOBS_MIN', () => {
        //given
        const field = jobPublicationForm.get('jobDescription.numberOfJobs');

        //when
        const numberOfJobs = 0;
        component.jobDescriptionFormValue = {
          ...emptyJobDescriptionFormValue,
          numberOfJobs
        };

        //then
        expect(field.hasError('min')).toBeTrue();
      });

      it('should not be larger than NUMBER_OF_JOBS_MAX', () => {
        //given
        const field = jobPublicationForm.get('jobDescription.numberOfJobs');

        //when
        const numberOfJobs = 100;
        component.jobDescriptionFormValue = {
          ...emptyJobDescriptionFormValue,
          numberOfJobs
        };

        //then
        expect(field.hasError('max')).toBeTrue();
      });

    });

    describe('jobDescription field', () => {
      it('should be required', () => {
        //given
        const field = jobPublicationForm.get('jobDescription.jobDescription');

        //when
        const jobDescription = null;
        component.jobDescriptionFormValue = {
          ...emptyJobDescriptionFormValue,
          jobDescription
        };

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be longer than TITLE_MAX_LENGTH', () => {
        //given
        const field = jobPublicationForm.get('jobDescription.jobDescription');

        //when
        const jobDescription = generateString(component.DESCRIPTION_MAX_LENGTH + 1);
        component.jobDescriptionFormValue = {
          ...emptyJobDescriptionFormValue,
          jobDescription
        };

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });

    });
  });

  function generateString(length: number) {
    return 'a'.repeat(length);
  }
});
