import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobAdSearchComponent } from './manage-job-ad-search.component';

describe('ManageJobAdSearchComponent', () => {
  let component: ManageJobAdSearchComponent;
  let fixture: ComponentFixture<ManageJobAdSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageJobAdSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageJobAdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
