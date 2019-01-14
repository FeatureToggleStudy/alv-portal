import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobAdsWidgetComponent } from './manage-job-ads-widget.component';

describe('ManageJobAdsWidgetComponent', () => {
  let component: ManageJobAdsWidgetComponent;
  let fixture: ComponentFixture<ManageJobAdsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageJobAdsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageJobAdsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
