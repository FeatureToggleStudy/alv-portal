import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationComponent } from './publication.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { PublicationFormValue } from './publication-form-value.types';

describe('PublicationComponent', () => {

  let component: PublicationComponent;
  let fixture: ComponentFixture<PublicationComponent>;
  let jobPublicationForm: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      declarations: [PublicationComponent],
    })
      .overrideTemplate(PublicationComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    jobPublicationForm = new FormGroup({});
    fixture = TestBed.createComponent(PublicationComponent);
    component = fixture.componentInstance;
    component.parentForm = jobPublicationForm;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should initialize with the given PublicationFormValue', () => {
      //given
      const formValue: PublicationFormValue = {
        publicDisplay: true,
        euresDisplay: true
      };

      //when
      component.publicationFormValue = formValue;
      component.ngOnInit();

      //then
      expect(jobPublicationForm.value['publication']).toEqual(formValue);
    });

  });
});
