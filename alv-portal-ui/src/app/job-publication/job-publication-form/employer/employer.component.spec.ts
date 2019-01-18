import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployerComponent } from './employer.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { EmployerFormValue, emptyEmployerFormValue } from './employer-form-value.types';
import { IsoCountryService } from '../iso-country.service';

describe('EmployerComponent', () => {

  let component: EmployerComponent;
  let fixture: ComponentFixture<EmployerComponent>;
  let employerForm: FormGroup;

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
      declarations: [EmployerComponent],
    })
      .overrideTemplate(EmployerComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    employerForm = new FormGroup({});
    fixture = TestBed.createComponent(EmployerComponent);
    component = fixture.componentInstance;
    component.parentForm = employerForm;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should initialize with the given EmployerFormValue', () => {
      //given
      const formValue: EmployerFormValue = {
        name: 'test-name',
        countryIsoCode: 'DE',
        zipAndCity: null
      };

      //when
      component.employerFormValue = formValue;
      component.ngOnInit();

      //then
      expect(employerForm.value['employer'].name).toEqual(formValue.name);
      expect(employerForm.value['employer'].countryIsoCode).toEqual(formValue.countryIsoCode);
      //todo: verify zipAndCity
    });

  });

  describe('validation', () => {
    beforeEach(() => {
      component.employerFormValue = emptyEmployerFormValue;
      component.ngOnInit();
    });

    describe('name field', () => {
      it('should be required', () => {
        //given
        const field = employerForm.get('employer.name');

        //when
        const name = null;
        component.employerFormValue = { ...emptyEmployerFormValue, name };

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be longer than NAME_MAX_LENGTH', () => {
        //given
        const field = employerForm.get('employer.name');

        //when
        const name = generateString(component.NAME_MAX_LENGTH + 1);
        component.employerFormValue = { ...emptyEmployerFormValue, name };

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });

    });
  });

  function generateString(length: number) {
    return 'a'.repeat(length);
  }
});
