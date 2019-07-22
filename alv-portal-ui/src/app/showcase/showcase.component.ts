import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../shared/forms/input/selectable-option.model';
import { NotificationsService } from '../core/notifications.service';
import { ModalService } from '../shared/layout/modal/modal.service';
import { LocalitySuggestionService } from '../shared/localities/locality-suggestion.service';
import { LocalityTypeaheadItem } from '../shared/localities/locality-typeahead-item';
import { IconKey } from '../shared/icons/custom-icon/custom-icon.component';
import {
  Notification,
  NotificationType
} from '../shared/layout/notifications/notification.model';

@Component({
  selector: 'alv-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  IconKey = IconKey;

  typeaheadControl = new FormControl();

  itemLoaderFn = this.fetchSuggestions.bind(this);

  selectControl = new FormControl();

  selectOptions$: Observable<SelectableOption[]> = of([
    {
      label: 'Demo Value 1',
      value: 'value1'
    },
    {
      label: 'Demo Value 2',
      value: 'value1'
    },
    {
      label: 'Demo Value 3',
      value: 'value1'
    }
  ]);

  confirmModalDemoText: string;

  notifications = [
    {
      type: NotificationType.INFO,
      messageKey: 'Info Message',
      isSticky: true
    },
    {
      type: NotificationType.WARNING,
      messageKey: 'Warning Message',
      isSticky: true
    },
    {
      type: NotificationType.SUCCESS,
      messageKey: 'Success Message',
      isSticky: true
    },
    {
      type: NotificationType.ERROR,
      messageKey: 'Error Message',
      isSticky: true
    }
  ];

  customNotification = {
    type: NotificationType.INFO,
    isSticky: true
  };

  constructor(private localitySuggestionService: LocalitySuggestionService,
              private notificationService: NotificationsService,
              private modalService: ModalService) {
  }

  ngOnInit() {
  }

  fetchSuggestions(prefix: string): Observable<LocalityTypeaheadItem[]> {
    return this.localitySuggestionService.fetch(prefix);
  }

  openConfirmModal() {
    this.modalService.openConfirm({
      title: 'Confirm Title',
      content: '<em>This is</em> <code>HTML</code> <strong>text</strong>.'
    }).result.then(result => {
        // On confirm
        this.confirmModalDemoText = result;
        this.confirmAction();
      },
      reason => {
        // On cancel
        this.confirmModalDemoText = reason;
      });
  }

  logFiles(files: File[]) {
    console.log(files);
  }
  private confirmAction() {
    of('some backend request').subscribe(result => {
    });
  }
}

