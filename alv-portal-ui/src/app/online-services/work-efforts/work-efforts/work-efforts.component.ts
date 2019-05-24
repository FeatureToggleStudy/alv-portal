import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';

@Component({
  selector: 'alv-work-efforts',
  templateUrl: './work-efforts.component.html',
  styleUrls: ['./work-efforts.component.scss']
})
export class WorkEffortsComponent implements OnInit {

  readonly SEARCH_QUERY_MAX_LENGTH = 1000;

  IconKey = IconKey;

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      query: ['']
    });
  }

  onFilterClick() {
    alert('not implemented yet');
  }

}
