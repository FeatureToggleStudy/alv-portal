import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'alv-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  @Input() subscription: Subscription;

  @Input() max: number;

  @Input() value: number;

  constructor() { }

  ngOnInit() {

  }

  cancelRequest() {
    this.subscription.unsubscribe();
  }

}
