import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { OccupationComponent } from './occupation.component';
import { emptyOccupationFormValue } from './occupation-form-value.types';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';
import { I18nService } from '../../../core/i18n.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import SpyObj = jasmine.SpyObj;

describe('OccupationComponent', () => {

  let component: OccupationComponent;
  let fixture: ComponentFixture<OccupationComponent>;

  let mockOccupationSuggestionService: SpyObj<OccupationSuggestionService>;
  const currentLanguage = 'de';
  const mockI18nService = {
    currentLanguage$: of(currentLanguage)
  };

  beforeEach(async(() => {
    mockOccupationSuggestionService = jasmine.createSpyObj('mockOccupationSuggestionService', ['fetchJobSearchOccupations']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient),
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        {
          provide: OccupationSuggestionService,
          useValue: mockOccupationSuggestionService
        },
        { provide: I18nService, useValue: mockI18nService }
      ],
      declarations: [OccupationComponent],
    })
      .overrideTemplate(OccupationComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.occupationFormValue = emptyOccupationFormValue();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {
    describe('occupationSuggestion field', () => {

      it('should be required', () => {
        //given
        const field = component.occupation.get('occupationSuggestion');

        //when
        field.setValue(null);

        //then
        expect(field.hasError('required')).toBeTrue();
      });
    });
  });

});
