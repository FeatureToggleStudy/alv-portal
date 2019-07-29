import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'alv-upload-progressbar',
  templateUrl: './upload-progressbar.component.html',
  styleUrls: ['./upload-progressbar.component.scss']
})
export class UploadProgressbarComponent {

  @Input() subscription: Subscription;

  @Input() max: number;

  @Input() value: number;

  constructor() { }

  cancelRequest() {
    this.subscription.unsubscribe();
  }

}
