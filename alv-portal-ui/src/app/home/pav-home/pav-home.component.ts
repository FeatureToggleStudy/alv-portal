import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LinkPanelId } from '../../shared/layout/link-panel/link-panel.component';

@Component({
  selector: 'alv-pav-home',
  templateUrl: './pav-home.component.html',
  styleUrls: ['./pav-home.component.scss']
})
export class PavHomeComponent implements OnInit {

  form: FormGroup;
  LinkPanelId = LinkPanelId;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      occupations: this.fb.control(''),
      skills: this.fb.control(''),
      location: this.fb.control('')
    });

  }
}
