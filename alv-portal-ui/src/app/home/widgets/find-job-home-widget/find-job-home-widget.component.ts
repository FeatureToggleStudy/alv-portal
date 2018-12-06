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

  onSubmit(formValue: any) {

    //todo: Replace this dummy data with the real form value
    const filter = JSON.stringify({
      onlineSince: 5,
      company: 'migros'
    });
    this.router.navigate(['job-search'], { queryParams: { filter: filter } });
  }
}
