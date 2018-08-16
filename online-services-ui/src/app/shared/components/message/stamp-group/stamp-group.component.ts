import { Component } from '@angular/core';

/**
 *  Component for grouping stamps, e.g.
 *  <os-stamp-group>
 *    <os-stamp
 *      type="warning"
 *      message="First stamp!">
 *    </os-stamp>
 *    <os-stamp
 *      type="error"
 *      message="Second stamp!">
 *    </os-stamp>
 *  </os-stamp-group>
 */
@Component({
  selector: 'os-stamp-group',
  templateUrl: './stamp-group.component.html',
  styleUrls: ['./stamp-group.component.scss']
})
export class StampGroupComponent {

  constructor() { }

}
