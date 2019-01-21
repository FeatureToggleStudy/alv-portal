import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployerComponent } from './employer.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { emptyEmployerFormValue } from './employer-form-value.types';
import { IsoCountryService } from '../iso-country.service';

describe('EmployerComponent', () => {

  let component: EmployerComponent;
  let fixture: ComponentFixture<EmployerComponent>;

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
    fixture = TestBed.createComponent(EmployerComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.employerFormValue = emptyEmployerFormValue;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {

    describe('name field', () => {

      it('should accept valid value', () => {
        //given
        const field = component.employer.get('name');

        //when
        field.setValue(generateString(component.NAME_MAX_LENGTH - 1));

        //then
        expect(field.valid).toBeTrue();
      });

      it('should be required', () => {
        //given
        const field = component.employer.get('name');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });

      it('should not be longer than NAME_MAX_LENGTH', () => {
        //given
        const field = component.employer.get('name');

        //when
        field.setValue(generateString(component.NAME_MAX_LENGTH + 1));

        //then
        expect(field.hasError('maxlength')).toBeTrue();
      });

    });
  });

  function generateString(length: number) {
    return 'a'.repeat(length);
  }
});
