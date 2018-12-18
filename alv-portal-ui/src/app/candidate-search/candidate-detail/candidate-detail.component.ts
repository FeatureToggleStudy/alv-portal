import { Component, OnInit, ViewChild } from '@angular/core';
import { Notification } from '../../shared/layout/notifications/notification.model';
import { CandidateDetailPanelId } from './candidate-detail-panel-id.enum';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

const TOOLTIP_AUTO_HIDE_TIMEOUT = 2500;

@Component({
  selector: 'alv-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnInit {

  candidateDetailPanelId = CandidateDetailPanelId;

  @ViewChild(NgbTooltip)
  clipboardTooltip: NgbTooltip;

  constructor() { }

  ngOnInit() {
  }

  dismissAlert(alert: Notification, alerts: Notification[]) {
    alerts.splice(alerts.indexOf(alert), 1);
  }

  printCandidate() {
    window.print();
  }

  onCopyLink(): void {
    this.clipboardTooltip.open();
    setTimeout(() => this.clipboardTooltip.close(), TOOLTIP_AUTO_HIDE_TIMEOUT);
  }

  getEncodedUrl() {
    return encodeURIComponent(this.getCandidateUrl());
  }

  getCandidateUrl() {
    return window.location.href;
  }

}
