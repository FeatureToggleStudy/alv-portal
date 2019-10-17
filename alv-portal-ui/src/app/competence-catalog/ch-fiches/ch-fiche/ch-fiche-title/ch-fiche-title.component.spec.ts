import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChFicheTitleComponent } from './ch-fiche-title.component';

describe('ChFicheTitleComponent', () => {
  let component: ChFicheTitleComponent;
  let fixture: ComponentFixture<ChFicheTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChFicheTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChFicheTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
