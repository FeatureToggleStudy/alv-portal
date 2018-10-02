import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavHomePageComponent } from './pav-home-page.component';

describe('PavHomePageComponent', () => {
  let component: PavHomePageComponent;
  let fixture: ComponentFixture<PavHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
