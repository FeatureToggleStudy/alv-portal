import 'jasmine-expect';
import { BytesPipe } from './bytes.pipe';

describe('BytesPipe', () => {

  let pipe: BytesPipe;

  beforeEach(() => {
    pipe = new BytesPipe();
  });

  it('should display values < 1024 B as bytes', function () {
    const testValue = 1023;
    const expected = '1023 B';
    expect(pipe.transform(testValue)).toEqual(expected);
  });

  it('should display values < 1048576 B (1 MB) as kilobytes', function () {
    const testValue = 1048575;
    const expected = '1024 KB';
    expect(pipe.transform(testValue)).toEqual(expected);
  });

  it('should display values < 1073741824 B (1 GB) as megabytes', function () {
    const testValue = 1073741823;
    const expected = '1024 MB';
    expect(pipe.transform(testValue)).toEqual(expected);
  });

  it('should display values >= 1073741824 B (1 GB) as gigabytes', function () {
    const testValue = 1073741824;
    const expected = '1 GB';
    expect(pipe.transform(testValue)).toEqual(expected);
  });

});


