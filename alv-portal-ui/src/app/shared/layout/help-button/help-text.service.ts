import { Injectable } from '@angular/core';
import { HelpEntry } from './help-entry.model';
import { mockHelpText } from './help-text.mock';

@Injectable({
  providedIn: 'root'
})
export class HelpTextService {

  uploads: Array<HelpEntry> = mockHelpText;

  constructor() {
  }

}
