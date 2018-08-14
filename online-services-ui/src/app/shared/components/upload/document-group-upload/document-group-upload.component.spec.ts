import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentGroupUploadComponent } from './document-group-upload.component';

describe('DocumentGroupUploadComponent', () => {
  let component: DocumentGroupUploadComponent;
  let fixture: ComponentFixture<DocumentGroupUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [DocumentGroupUploadComponent],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentGroupUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
