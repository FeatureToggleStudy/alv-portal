import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalLoginComponent } from './local-login.component';

describe('LocalLoginComponent', () => {
  let component: LocalLoginComponent;
  let fixture: ComponentFixture<LocalLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
