import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationContainerComponent } from './navigation-container.component';
import { MainNavigationComponent } from '../main-navigation/main-navigation.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationContainerComponent', () => {
  let component: NavigationContainerComponent;
  let fixture: ComponentFixture<NavigationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationContainerComponent,
        MainNavigationComponent
      ],
      imports: [RouterTestingModule]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
