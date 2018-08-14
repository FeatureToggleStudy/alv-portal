import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadedFilePresentationComponent } from './uploaded-file-presentation.component';

@Pipe({name: 'humanizeBytes'})
class MockPipe implements PipeTransform {
  transform(value: number): number {
    //Do stuff here, if you want
    return value;
  }
}

describe('UploadedFilePresentationComponent', () => {
  let component: UploadedFilePresentationComponent;
  let fixture: ComponentFixture<UploadedFilePresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [UploadedFilePresentationComponent, MockPipe],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedFilePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
