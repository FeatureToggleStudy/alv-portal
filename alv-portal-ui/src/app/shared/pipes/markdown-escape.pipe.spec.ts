import 'jasmine-expect';
import { MarkdownEscapePipe } from './markdown-escape.pipe';

/**
 * Inspired by:
 * https://github.com/opichals/remove-markdown/blob/master/test/remove-markdown.js
 */
describe('MarkdownEscapePipe', () => {

  let pipe: MarkdownEscapePipe;

  beforeEach(() => {
    pipe = new MarkdownEscapePipe();
  });

  it('should leave a string alone without markdown', function () {
    const testString = 'Javascript Developers are the best.';
    expect(pipe.transform(testString)).toEqual(testString);
  });

  it('should not strip HTML', function () {
    const testString = '<p>Hello World</p>';
    const expected = '<p>Hello World</p>';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should strip out remaining markdown', function () {
    const testString = '*Javascript* developers are the _best_.';
    const expected = 'Javascript developers are the best.';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should leave non-matching markdown markdown', function () {
    const testString = '*Javascript* developers* are the _best_.';
    const expected = 'Javascript developers* are the best.';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should leave non-matching markdown, but strip empty anchors', function () {
    const testString = '*Javascript* [developers]()* are the _best_.';
    const expected = 'Javascript developers* are the best.';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should strip anchors', function () {
    const testString = '*Javascript* [developers](https://engineering.condenast.io/)* are the _best_.';
    const expected = 'Javascript developers* are the best.';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should strip img tags', function () {
    const testString = '![](https://placebear.com/640/480)*Javascript* developers are the _best_.';
    const expected = 'Javascript developers are the best.';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should strip code tags', function () {
    const testString = 'In `Getting Started` we set up `something` foo.';
    const expected = 'In Getting Started we set up something foo.';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should leave hashtags in headings', function () {
    const testString = '## This #heading contains #hashtags';
    const expected = 'This #heading contains #hashtags';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should remove emphasis', function () {
    const testString = 'I italicized an *I* and it _made_ me *sad*.';
    const expected = 'I italicized an I and it made me sad.';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should remove double emphasis', function () {
    const testString = '**this sentence has __double styling__**';
    const expected = 'this sentence has double styling';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should remove horizontal rules', function () {
    const testString = 'Some text on a line\n\n---\n\nA line below';
    const expected = 'Some text on a line\n\nA line below';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should remove horizontal rules with space-separated asterisks', function () {
    const testString = 'Some text on a line\n\n* * *\n\nA line below';
    const expected = 'Some text on a line\n\nA line below';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should remove blockquotes', function () {
    const testString = '>I am a blockquote';
    const expected = 'I am a blockquote';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should remove blockquotes with spaces', function () {
    const testString = '> I am a blockquote';
    const expected = 'I am a blockquote';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should remove indented blockquotes', function () {
    const tests = [
      { testString: ' > I am a blockquote', expected: 'I am a blockquote' },
      { testString: '  > I am a blockquote', expected: 'I am a blockquote' },
      { testString: '   > I am a blockquote', expected: 'I am a blockquote' },
    ];
    tests.forEach(function (test) {
      expect(pipe.transform(test.testString)).toEqual(test.expected);
    });
  });

  it('should not remove greater than signs', function () {
    const tests = [
      { testString: '100 > 0', expected: '100 > 0' },
      { testString: '100 >= 0', expected: '100 >= 0' },
      { testString: '100>0', expected: '100>0' },
      { testString: '> 100 > 0', expected: '100 > 0' },
      { testString: '1 < 100', expected: '1 < 100' },
      { testString: '1 <= 100', expected: '1 <= 100' },
    ];
    tests.forEach(function (test) {
      expect(pipe.transform(test.testString)).toEqual(test.expected);
    });
  });

  it('should strip unordered list leaders', function () {
    const testString = 'Some text on a line\n\n* A list Item\n* Another list item';
    const expected = 'Some text on a line\n\nA list Item\nAnother list item';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should strip ordered list leaders', function () {
    const testString = 'Some text on a line\n\n9. A list Item\n10. Another list item';
    const expected = 'Some text on a line\n\nA list Item\nAnother list item';
    expect(pipe.transform(testString)).toEqual(expected);
  });

  it('should handle paragraphs with markdown', function () {
    const paragraph = '\n## This is a heading ##\n\nThis is a paragraph with [a link](http://www.disney.com/).\n\n### This is another heading\n\nIn `Getting Started` we set up `something` foo.\n\n  * Some list\n  * With items\n    * Even indented';
    const expected = '\nThis is a heading\n\nThis is a paragraph with a link.\n\nThis is another heading\n\nIn Getting Started we set up something foo.\n\n  Some list\n  With items\n    Even indented';
    expect(pipe.transform(paragraph)).toEqual(expected);
  });

  it('should not trigger ReDoS with atx-headers', function () {
    const start = Date.now();

    const paragraph = '\n## This is a long "' + ' '.repeat(200) + '" heading ##\n';
    const expected = /\nThis is a long " {200}" heading\n/;
    expect(pipe.transform(paragraph)).toMatch(expected);

    const duration = Date.now() - start;
    expect(duration).toBeLessThan(500);
  });
});


