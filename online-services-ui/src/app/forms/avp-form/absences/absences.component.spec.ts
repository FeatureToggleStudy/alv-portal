import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesComponent } from './absences.component';

describe('AbsencesComponent', () => {
  let component: AbsencesComponent;
  let fixture: ComponentFixture<AbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [AbsencesComponent],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
