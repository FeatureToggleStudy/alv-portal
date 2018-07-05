import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AppComponent', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule],

      declarations: [AppComponent],
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title)
      .toEqual('app');
  }));
});
