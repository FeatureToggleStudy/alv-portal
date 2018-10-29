import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;

  @Input() subtitle?: string;

  @Input() primaryLabel: string;

  @Input() primaryAction: () => void;

  @Input() secondaryLabel?: string;

  @Input() secondaryAction?: () => void;

  @Input() backAction?: () => void;

  @Input() formGroup?: FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
