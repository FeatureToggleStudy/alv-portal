import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerHomePageComponent } from './job-seeker-home-page.component';

describe('JobSeekerHomePageComponent', () => {
  let component: JobSeekerHomePageComponent;
  let fixture: ComponentFixture<JobSeekerHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
