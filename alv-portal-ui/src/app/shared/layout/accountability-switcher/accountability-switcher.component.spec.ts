import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilitySwitcherComponent } from './accountability-switcher.component';

describe('AccountabilitySwitcherComponent', () => {
  let component: AccountabilitySwitcherComponent;
  let fixture: ComponentFixture<AccountabilitySwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilitySwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilitySwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
