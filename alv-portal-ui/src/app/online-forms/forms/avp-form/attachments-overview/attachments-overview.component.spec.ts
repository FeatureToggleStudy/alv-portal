import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsOverviewComponent } from './attachments-overview.component';

describe('AttachmentsOverviewComponent', () => {
  let component: AttachmentsOverviewComponent;
  let fixture: ComponentFixture<AttachmentsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [AttachmentsOverviewComponent],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
