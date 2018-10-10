import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-find-job-widget',
  templateUrl: './find-job-widget.component.html',
  styleUrls: ['./find-job-widget.component.scss']
})
export class FindJobWidgetComponent implements OnInit {

  findJobForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.findJobForm = this.fb.group({
      profession: this.fb.control(''),
      skills: this.fb.control(''),
      city: this.fb.control('')
    });
  }

}
