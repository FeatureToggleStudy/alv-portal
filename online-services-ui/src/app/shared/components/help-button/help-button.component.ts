import { Component, Input, OnInit } from '@angular/core';
import { HelpEntry } from './help-entry.model';

@Component({
  selector: 'os-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss']
})
export class HelpButtonComponent implements OnInit {

  @Input() helpEntries: Array<HelpEntry>;

  constructor() { }

  ngOnInit() {
  }

}
