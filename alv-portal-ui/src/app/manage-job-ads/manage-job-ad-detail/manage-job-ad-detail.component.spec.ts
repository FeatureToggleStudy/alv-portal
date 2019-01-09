import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobAdDetailComponent } from './manage-job-ad-detail.component';

describe('ManageJobAdDetailComponent', () => {
  let component: ManageJobAdDetailComponent;
  let fixture: ComponentFixture<ManageJobAdDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageJobAdDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageJobAdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
