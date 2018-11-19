import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchPageComponent } from './job-search-page.component';

describe('JobSearchPageComponent', () => {
  let component: JobSearchPageComponent;
  let fixture: ComponentFixture<JobSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobSearchPageComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
