import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alv-control-period',
  templateUrl: './control-period.component.html',
  styleUrls: ['./control-period.component.scss']
})
export class ControlPeriodComponent implements OnInit {

  @Input() expanded: boolean;

  constructor() { }

  ngOnInit() {
  }

}
