import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ConfirmModalConfig } from '../../shared/layout/modal/confirm-modal/confirm-modal-config.model';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { ElasticSearchReindexRepository } from '../../shared/backend-services/elastic-search-reindex/elastic-search-reindex-repository';

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

  constructor(private fb: FormBuilder,
              private elasticSearchReindexRepository: ElasticSearchReindexRepository,
              private modalService: ModalService) { }

  ngOnInit() {
    this.form = this.prepareForm();
  }

  onSubmit() {
    console.log('submit');
    this.modalService.openConfirm(this.CONFIRM_REINDEX_MODAL).result.then(
      () => this.elasticSearchReindexRepository.reindex(this.form.get('jobs').value)
        .subscribe(() => {
          // (STATUS REPORT)
        }, () => {
          // (ERROR REPORT)
        }),
      () => {
        // (ERROR REPORT)
      }
    );
  }

  toggleFormCheckboxes(value: boolean) {
    this.form.patchValue({
      users: value,
      candidates: value,
      jobs: value,
      reference_data: value
    });
  }

  private prepareForm() {

    const atLeastOneRequiredValidator: ValidatorFn = (formGroup: FormGroup) => {
      const users = formGroup.get('users').value;
      const candidates = formGroup.get('candidates').value;
      const jobs = formGroup.get('jobs').value;
      const reference_data = formGroup.get('reference_data').value;
      return users || candidates || jobs || reference_data ? null : {atLeastOneRequired: true};
    };

    return this.fb.group({
      users: [false],
      candidates: [false],
      jobs: [false],
      reference_data: [false]
    }, {
      validator: [atLeastOneRequiredValidator]
    });
  }

}
