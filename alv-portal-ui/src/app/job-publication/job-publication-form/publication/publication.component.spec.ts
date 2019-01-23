import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationComponent } from './publication.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { emptyPublicationFormValue } from './publication-form-value.types';

describe('PublicationComponent', () => {

  let component: PublicationComponent;
  let fixture: ComponentFixture<PublicationComponent>;

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
    fixture = TestBed.createComponent(PublicationComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.publicationFormValue = emptyPublicationFormValue();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
