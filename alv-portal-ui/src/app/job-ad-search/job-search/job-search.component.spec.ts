import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchComponent } from './job-search-page.component';

describe('JobSearchPageComponent', () => {
  let component: JobSearchComponent;
  let fixture: ComponentFixture<JobSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobSearchComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
