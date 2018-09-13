import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousComponent } from './miscellaneous.component';

describe('MiscellaneousComponent', () => {
  let component: MiscellaneousComponent;
  let fixture: ComponentFixture<MiscellaneousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [MiscellaneousComponent],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
