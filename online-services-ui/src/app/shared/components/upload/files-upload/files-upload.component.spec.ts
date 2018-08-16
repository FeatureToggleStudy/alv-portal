import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilesUploadComponent } from './files-upload.component';

describe('FilesUploadComponent', () => {
  let component: FilesUploadComponent;
  let fixture: ComponentFixture<FilesUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [FilesUploadComponent],
          imports: [ReactiveFormsModule, FormsModule],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
