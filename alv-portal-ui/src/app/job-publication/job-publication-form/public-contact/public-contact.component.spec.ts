import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { PublicContactComponent } from './public-contact.component';
import { emptyPublicContactFormValue } from './public-contact-form-value.types';

describe('PublicContactComponent', () => {

  let component: PublicContactComponent;
  let fixture: ComponentFixture<PublicContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      declarations: [PublicContactComponent],
    })
      .overrideTemplate(PublicContactComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicContactComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.publicContactFormValue = emptyPublicContactFormValue;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {
    //todo implement
  });

});
