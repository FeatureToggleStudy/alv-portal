import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzaPageComponent } from './nza-page.component';

describe('NzaPageComponent', () => {
  let component: NzaPageComponent;
  let fixture: ComponentFixture<NzaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
