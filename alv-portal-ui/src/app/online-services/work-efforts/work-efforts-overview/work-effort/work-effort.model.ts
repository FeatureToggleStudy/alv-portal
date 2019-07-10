/**
 * A "view-model" for the Work-Effort Component that has all of our business logic in it to
 * avoid duplication and calculations in functions. Delegate pattern.
 */
import {
  ProofOfWorkEfforts,
  WorkEffort,
  WorkEffortApplyStatus
} from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { InlineBadge } from '../../../../shared/layout/inline-badges/inline-badge.types';


export class WorkEffortModel {

  applyStatusBadges: InlineBadge[];

  isSentSuccessfully: boolean;

  submissionDate: Date;

  statusLabel: string;

  workEffortEditLink: string;

  constructor(public workEffort: WorkEffort,
              public proofOfWorkEfforts: ProofOfWorkEfforts) {
    this.applyStatusBadges = this.mapApplyStatusBadges(this.workEffort.applyStatus);

    this.isSentSuccessfully = !!this.workEffort.submittedAt;

    this.submissionDate = this.buildSubmissionDate();

    this.statusLabel = 'portal.work-efforts.submit-status.text.' + (this.isSentSuccessfully ? 'SUBMITTED' : 'OPEN');

    this.workEffortEditLink = `edit/${this.proofOfWorkEfforts.id}/${this.workEffort.id}`;
  }

  private buildSubmissionDate(): Date {
    const submissionDate = new Date(this.workEffort.submittedAt || this.proofOfWorkEfforts.nextSubmissionDate);
    submissionDate.setHours(23, 59);
    return submissionDate;
  }

  private mapApplyStatusBadges(applyStatus: WorkEffortApplyStatus[]): InlineBadge[] {
    const badges: InlineBadge[] = [];

    if (applyStatus.includes(WorkEffortApplyStatus.INTERVIEW)) {
      badges.push({
        cssClass: 'badge-work-effort-result-interview',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.INTERVIEW
      });
    }

    if (applyStatus.includes(WorkEffortApplyStatus.EMPLOYED)) {
      badges.push({
        cssClass: 'badge-work-effort-result-employed',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.EMPLOYED
      });
    }

    if (applyStatus.includes(WorkEffortApplyStatus.PENDING)) {
      badges.push({
        cssClass: 'badge-work-effort-result-pending',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.PENDING
      });
    }

    if (applyStatus.includes(WorkEffortApplyStatus.REJECTED)) {
      badges.push({
        cssClass: 'badge-work-effort-result-rejected',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.REJECTED
      });
    }
    return badges;
  }

}

