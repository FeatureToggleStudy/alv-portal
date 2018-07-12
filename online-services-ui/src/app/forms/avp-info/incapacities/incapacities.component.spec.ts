import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacitiesComponent } from './incapacities.component';

describe('IncapacitiesComponent', () => {
  let component: IncapacitiesComponent;
  let fixture: ComponentFixture<IncapacitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncapacitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncapacitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
