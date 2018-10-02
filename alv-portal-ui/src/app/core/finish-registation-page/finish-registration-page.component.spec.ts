import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishRegistrationPageComponent } from './finish-registration-page.component';

describe('FinishRegistrationPageComponent', () => {
  let component: FinishRegistrationPageComponent;
  let fixture: ComponentFixture<FinishRegistrationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishRegistrationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
