import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileIconComponent } from './file-icon.component';

describe('FileIconComponent', () => {
  let component: FileIconComponent;
  let fixture: ComponentFixture<FileIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [FileIconComponent],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
