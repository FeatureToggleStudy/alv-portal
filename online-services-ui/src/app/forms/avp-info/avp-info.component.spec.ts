import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvpInfoComponent } from './avp-info.component';

describe('AvpInfoComponent', () => {
  let component: AvpInfoComponent;
  let fixture: ComponentFixture<AvpInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvpInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
