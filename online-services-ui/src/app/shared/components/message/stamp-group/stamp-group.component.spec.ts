import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampGroupComponent } from './stamp-group.component';

describe('StampGroupComponent', () => {
  let component: StampGroupComponent;
  let fixture: ComponentFixture<StampGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StampGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
