import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-company-home-page',
  templateUrl: './company-home-page.component.html',
  styleUrls: ['./company-home-page.component.scss']
})
export class CompanyHomePageComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: this.fb.control(''),
      duties: this.fb.control('')
    });

  }
}
