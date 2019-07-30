import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe transforms certain non-markdown tokens (like the bullet point for a list)
 * to known markdown tokens (like the dash for a list).
 * Currently transformed:
 * - Bullet points (all 4 sizes) -> dashes
 */
@Pipe({
  name: 'markdownPreprocess'
})
export class MarkdownPreprocessPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      return this.replaceBulletPoints(value);
    }
    return value;
  }

  private replaceBulletPoints(value: string): string {
    return value.replace(new RegExp(BulletPoints.SMALL_BULLET, 'gm'), '- ')
      .replace( new RegExp(BulletPoints.MEDIUM_BULLET, 'gm'), '- ')
      .replace(new RegExp(BulletPoints.OPERATOR_BULLET, 'gm'), '- ')
      .replace(new RegExp(BulletPoints.LARGE_BULLET, 'gm'), '- ');
  }
}

export enum BulletPoints {
  SMALL_BULLET = String.fromCharCode(183),
  MEDIUM_BULLET = String.fromCharCode(8226),
  OPERATOR_BULLET = String.fromCharCode(8729),
  LARGE_BULLET = String.fromCharCode(9679)
}
