import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionComponent } from './version.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VersionComponent', () => {
  let component: VersionComponent;
  let fixture: ComponentFixture<VersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should have a ui version`, async(() => {
    const version = fixture.debugElement.componentInstance;
    expect(version.frontendVersion)
        .toBeTruthy();
  }));
});
