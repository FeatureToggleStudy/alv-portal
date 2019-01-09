import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdManagementRowComponent } from './job-ad-management-row.component';

describe('JobAdManagementRowComponent', () => {
  let component: JobAdManagementRowComponent;
  let fixture: ComponentFixture<JobAdManagementRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobAdManagementRowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAdManagementRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
