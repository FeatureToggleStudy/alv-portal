import { ElementArrayFinder, ElementFinder } from 'protractor';

export function alvFormControlName(value: string): string {
  return `[alvFormControlName="${value}"]`;
}

export function getSelectOptions(selectElement: ElementFinder): ElementArrayFinder {
  return selectElement.$$('option');
}
