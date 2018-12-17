import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'alv-find-job-home-widget',
  templateUrl: './find-job-home-widget.component.html',
  styleUrls: ['./find-job-home-widget.component.scss']
})
export class FindJobHomeWidgetComponent implements OnInit {

  findJobForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.findJobForm = this.fb.group({
      profession: this.fb.control(''),
      skills: this.fb.control(''),
      city: this.fb.control('')
    });
  }

  onSubmit() {
    this.router.navigate(['job-search']);
  }
}
