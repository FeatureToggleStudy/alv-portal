import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-registration-panel',
  templateUrl: './registration-panel.component.html',
  styleUrls: ['./registration-panel.component.scss']
})
export class RegistrationPanelComponent implements OnInit {

  @Input() panelTitle: string;

  @Input() panelSubtitle: string;

  @Input() primaryLabel: string;

  @Output() primaryAction = new EventEmitter<void>();

  @Input() secondaryLabel: string;

  @Output() secondaryAction = new EventEmitter<void>();

  @Input() hideBackButton?: boolean;

  @Output() backAction = new EventEmitter<void>();

  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  handlePrimaryClick() {
    this.primaryAction.emit();
  }

  handleSecondaryClick() {
    this.secondaryAction.emit();
  }

  handleBackClick() {
    this.backAction.emit();
  }
}
