import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OnlineFormsComponent } from './online-forms.component';

describe('OnlineFormsComponent', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule],

      declarations: [OnlineFormsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(OnlineFormsComponent);
    router.initialNavigation();
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app)
        .toBeTruthy();
  }));

});
