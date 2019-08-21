import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { FileInputComponent } from './file-input.component';
import { BytesPipe } from '../../../pipes/bytes.pipe';
import { SharedModule } from '../../../shared.module';

describe('FileInputComponent', () => {

  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule
      ],
      providers: [
        BytesPipe
      ],
      declarations: [],
    })
      .overrideTemplate(FileInputComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    component.alvControl = new FormControl();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('file operations', () => {
    let pngFile: File;
    let jpegFile: File;
    let textFile: File;
    let canvas: any;

    beforeEach((done) => {
      canvas = document.createElement('canvas');
      canvas.height = 1;
      canvas.width = 1;
      canvas.toBlob(blob => {
        pngFile = new File([blob], 'test-file.png', { type: 'image/png' });
        jpegFile = new File([blob], 'test-file.jpeg', { type: 'image/jpeg' });
        textFile = new File(['lorem ipsum'], 'test-file.txt', {type: 'text/plain'});
        done();
      });
    });

    describe('uploadFile', () => {

      it('should accept valid files', (done) => {
        //given
        component.accept = '*/*';
        component.maxFilesCount = 2;
        component.maxFileSize = 1000;

        //when
        component.uploadFile([pngFile, jpegFile]);

        //then
        expect(component.control.errors).toBeNull();
        expect(component.control.value.length).toBe(2);
        done();
      });

      it('should reject invalid file type (variant 1)', (done) => {
        //given
        component.accept = '.png';
        component.maxFilesCount = 2;

        //when
        component.uploadFile([pngFile, jpegFile]);

        //then
        expect(component.control.hasError('invalidFileType')).toBeTruthy();
        expect(component.control.value.length).toBe(1);
        done();
      });

      it('should reject invalid file type (variant 2)', (done) => {
        //given
        component.accept = 'image/*';
        component.maxFilesCount = 3;

        //when
        component.uploadFile([pngFile, jpegFile, textFile]);

        //then
        expect(component.control.hasError('invalidFileType')).toBeTruthy();
        expect(component.control.value.length).toBe(2);
        done();
      });

      it('should reject too many files and disable button', (done) => {
        //given
        component.maxFilesCount = 2;

        //when
        component.uploadFile([pngFile, jpegFile, pngFile]);

        //then
        expect(component.control.hasError('maxFilesCount')).toBeTruthy();
        expect(component.control.value.length).toBe(2);
        expect(component.isUploadLimitReached()).toBeTruthy();
        done();
      });

      it('should reject too big files', (done) => {
        //given
        component.maxFileSize = 50;

        //when
        component.uploadFile([pngFile]);

        //then
        expect(component.control.hasError('fileTooLarge')).toBeTruthy();
        expect(component.control.value).toBeUndefined();
        done();
      });

    });

    describe('removeFile', () => {
      it('should remove file', (done) => {
        //given
        component.maxFilesCount = 2;
        component.uploadFile([pngFile, jpegFile]);

        //when
        component.removeFile(1);

        //then
        expect(component.control.value.length).toBe(1);
        done();
      });
    });
  });

});
