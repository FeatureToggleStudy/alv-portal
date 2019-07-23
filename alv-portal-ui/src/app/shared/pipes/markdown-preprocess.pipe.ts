import { Pipe, PipeTransform } from '@angular/core';

/**
 * Inspired by:
 * https://github.com/opichals/remove-markdown
 */
@Pipe({
  name: 'markdownPreprocess'
})
export class MarkdownPreprocessPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      return value.replace(/·/gm, '- ')
        .replace(/∙/gm, '- ')
        .replace(/●/gm, '- ');
    }
    return value;
  }

}
