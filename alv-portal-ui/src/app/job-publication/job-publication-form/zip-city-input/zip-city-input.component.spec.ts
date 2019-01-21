import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { ZipCityInputComponent } from './zip-city-input.component';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import SpyObj = jasmine.SpyObj;

describe('ZipCityInputComponent', () => {

  let component: ZipCityInputComponent;
  let fixture: ComponentFixture<ZipCityInputComponent>;

  let mockLocalitySuggestionService: SpyObj<LocalitySuggestionService>;

  beforeEach(async(() => {
    mockLocalitySuggestionService = jasmine.createSpyObj('mockLocalitySuggestionService', ['fetchJobPublicationLocations']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      providers: [
        { provide: LocalitySuggestionService, useValue: mockLocalitySuggestionService }
      ],
      declarations: [ZipCityInputComponent],
    })
      .overrideTemplate(ZipCityInputComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCityInputComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.countryIsoCode = 'CH';
    component.zipCityFormValue = { city: null, zipCode: null };

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {
    //todo implement
  });

});
