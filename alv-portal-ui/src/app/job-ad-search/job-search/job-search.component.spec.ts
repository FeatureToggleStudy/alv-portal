import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobSearchComponent } from './job-search.component';
import { Store } from '@ngrx/store';


describe('JobSearchPageComponent', () => {
  let component: JobSearchComponent;
  let fixture: ComponentFixture<JobSearchComponent>;

  const mockStore = jasmine.createSpyObj('mockStore', ['pipe', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobSearchComponent],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    })
      .overrideTemplate(JobSearchComponent, '')
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
