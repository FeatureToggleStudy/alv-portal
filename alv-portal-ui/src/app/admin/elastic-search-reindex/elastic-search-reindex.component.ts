import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmModalConfig } from '../../shared/layout/modal/confirm-modal/confirm-modal-config.model';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { ElasticSearchReindexRepository } from '../../shared/backend-services/elastic-search-reindex/elastic-search-reindex-repository';
import { HttpErrorResponse } from '@angular/common/http';
import { Notification, NotificationType } from '../../shared/layout/notifications/notification.model';
import { atLeastOneRequiredValidator } from '../../shared/forms/input/checkbox/at-least-one-required.validator';

export const MESSAGE = {
  success: {
    type: NotificationType.SUCCESS,
    messageKey: 'portal.admin.elastic-search-reindex.document.accepted',
    isSticky: true
  } as Notification,
  failure: {
    type: NotificationType.ERROR,
    messageKey: 'portal.admin.elastic-search-reindex.notification.failure',
    isSticky: true
  } as Notification
};

@Component({
  selector: 'alv-elastic-search-reindex',
  templateUrl: './elastic-search-reindex.component.html',
  styleUrls: ['./elastic-search-reindex.component.scss']
})
export class ElasticSearchReindexComponent implements OnInit {

  readonly ELASTICSEARCH_CHECKBOXES = ['users', 'candidates', 'jobs', 'reference_data'];

  readonly CONFIRM_REINDEX_MODAL: ConfirmModalConfig = {
    title: 'portal.admin.elastic-search-reindex.dialog.title',
    content: 'portal.admin.elastic-search-reindex.dialog.question',
    confirmLabel: 'portal.admin.elastic-search-reindex.dialog.confirm',
    cancelLabel: 'portal.admin.elastic-search-reindex.dialog.cancel'
  };

  form: FormGroup;

  alert: Notification;

  toggle = true;

  constructor(private fb: FormBuilder,
              private elasticSearchReindexRepository: ElasticSearchReindexRepository,
              private modalService: ModalService) { }

  ngOnInit() {
    this.form = this.prepareForm();
  }

  onSubmit() {
    this.modalService.openConfirm(this.CONFIRM_REINDEX_MODAL).result.then(
      () => this.elasticSearchReindexRepository.reindex(this.resolveFormValues())
        .subscribe(() => {
          this.alert = MESSAGE.success;
          this.form.reset();
          this.checkStatusOfReindexingJobs();
        }, () => {
          this.alert = MESSAGE.failure;
        }),
      () => {}
    );
  }

  private checkStatusOfReindexingJobs() {
    this.elasticSearchReindexRepository.getReindexJobs().subscribe(
      () => {
        // TODO emst 03.02.2019 implement displaying of the elastic search reindex job actions
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          // TODO emst 03.02.2019 the link to elastic search result is for now wrong, need
          //  other permissions to make it visible and accessible
        } else {
          this.alert = MESSAGE.failure;
        }
      }
    );
  }

  toggleFormCheckboxes(value: boolean) {
    this.toggle = !value;
    this.form.patchValue({
      users: value,
      candidates: value,
      jobs: value,
      reference_data: value
    });
  }

  private resolveFormValues(): string[] {
    return this.ELASTICSEARCH_CHECKBOXES.filter((checkbox) => this.form.get(checkbox).value);
  }

  private prepareForm() {
    return this.fb.group({
      users: [false],
      candidates: [false],
      jobs: [false],
      reference_data: [false]
    }, {
      validator: [atLeastOneRequiredValidator(this.ELASTICSEARCH_CHECKBOXES)]
    });
  }

}
