import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantLinkComponent } from './assistant-link.component';

describe('AssistantLinkComponent', () => {
  let component: AssistantLinkComponent;
  let fixture: ComponentFixture<AssistantLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssistantLinkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
