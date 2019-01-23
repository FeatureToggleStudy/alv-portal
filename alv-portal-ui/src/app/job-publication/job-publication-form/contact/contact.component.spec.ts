import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { emptyContactFormValue } from './contact-form-value.types';
import { of } from 'rxjs';
import { I18nService } from '../../../core/i18n.service';

describe('ContactComponent', () => {

  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  const currentLanguage = 'de';
  const mockI18nService = {
    currentLanguage$: of(currentLanguage)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      providers: [
        { provide: I18nService, useValue: mockI18nService }
      ],
      declarations: [ContactComponent],
    })
      .overrideTemplate(ContactComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.contactFormValue = emptyContactFormValue();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {
    //todo implement
  });

});
