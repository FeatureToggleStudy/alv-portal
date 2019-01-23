import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JobPublicationFormComponent } from './job-publication-form.component';
import { SharedModule } from '../../shared/shared.module';
import { OccupationComponent } from './occupation/occupation.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { LanguagesComponent } from './languages/languages.component';
import { EmploymentComponent } from './employment/employment.component';
import { ContactComponent } from './contact/contact.component';
import { LocationComponent } from './location/location.component';
import { CompanyComponent } from './company/company.component';
import { ZipCityInputComponent } from './zip-city-input/zip-city-input.component';
import { PublicContactComponent } from './public-contact/public-contact.component';
import { PublicationComponent } from './publication/publication.component';
import { EmployerComponent } from './employer/employer.component';
import { ApplicationComponent } from './application/application.component';
import { PostAddressFormComponent } from './post-address-form/post-address-form.component';
import { IsoCountryService } from './iso-country.service';
import { I18nService } from '../../core/i18n.service';
import { of } from 'rxjs';
import { JobPublicationFormValueFactory } from './job-publication-form-value-factory';
import {
  CEFR_Level,
  Degree,
  Experience
} from '../../shared/backend-services/shared.types';
import SpyObj = jasmine.SpyObj;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobPublicationFormValue } from './job-publication-form-value.types';


describe('JobPublicationFormComponent', () => {
  let emptyJobPublicationFormValue: JobPublicationFormValue;

  const currentLanguage = 'de';
  const mockI18nService = {
    currentLanguage$: of(currentLanguage)
  };

  const mockIsoCountryService = {
    countryOptions$: of([
      { value: 'CH', label: 'CH' },
      { value: 'DE', label: 'DE' },
    ])
  };

  let mockJobPublicationFormValueFactory: SpyObj<JobPublicationFormValueFactory>;

  let component: JobPublicationFormComponent;
  let fixture: ComponentFixture<JobPublicationFormComponent>;

  beforeEach(async(() => {
    emptyJobPublicationFormValue = new JobPublicationFormValueFactory().createEmpty();
    mockJobPublicationFormValueFactory = jasmine.createSpyObj('mockJobPublicationFormValueFactory', ['createJobPublicationFormValue']);
    mockJobPublicationFormValueFactory.createJobPublicationFormValue.and.returnValue(emptyJobPublicationFormValue);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient),
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        { provide: I18nService, useValue: mockI18nService },
        { provide: IsoCountryService, useValue: mockIsoCountryService },
        {
          provide: JobPublicationFormValueFactory,
          useValue: mockJobPublicationFormValueFactory
        }
      ],
      declarations: [
        JobPublicationFormComponent,
        OccupationComponent,
        JobDescriptionComponent,
        LanguagesComponent,
        JobDescriptionComponent,
        EmploymentComponent,
        ContactComponent,
        EmploymentComponent,
        LocationComponent,
        CompanyComponent,
        PublicContactComponent,
        ZipCityInputComponent,
        PublicationComponent,
        ZipCityInputComponent,
        EmployerComponent,
        ApplicationComponent,
        PostAddressFormComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPublicationFormComponent);
    component = fixture.componentInstance;
    component.currentLanguage = 'de';
    component.initialFormValueConfig = {};
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should correctly initialise the form with a JobPublicationFormValue', () => {
      //given
      const jobPublicationFormValue = { ...emptyJobPublicationFormValue };

      jobPublicationFormValue.jobDescription.numberOfJobs = 8;
      jobPublicationFormValue.jobDescription.title = 'test-title';
      jobPublicationFormValue.jobDescription.jobDescription = 'test-description';

      //todo add occupation suggestion
      jobPublicationFormValue.occupation.degree = Degree.SEK_II_FACHMATURITAET;
      jobPublicationFormValue.occupation.experience = Experience.MORE_THAN_3_YEARS;

      jobPublicationFormValue.languageSkills = [
        {
          languageIsoCode: 'de',
          spokenLevel: CEFR_Level.BASIC,
          writtenLevel: CEFR_Level.INTERMEDIATE,
        },
        {
          languageIsoCode: 'en',
          spokenLevel: CEFR_Level.BASIC,
          writtenLevel: CEFR_Level.NONE,
        }
      ];


      mockJobPublicationFormValueFactory.createJobPublicationFormValue.and.returnValue(jobPublicationFormValue);

      //when
      fixture.detectChanges();

      //then
      const expectedJobPublicationFormValue = { ...jobPublicationFormValue };
      emptyJobPublicationFormValue.contact.languageIsoCode = currentLanguage;
      expect(component.jobPublicationForm.value).toEqual(expectedJobPublicationFormValue);
    });

  });

});
