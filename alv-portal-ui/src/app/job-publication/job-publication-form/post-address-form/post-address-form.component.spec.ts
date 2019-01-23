import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
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
    //todo implement
  });

});
