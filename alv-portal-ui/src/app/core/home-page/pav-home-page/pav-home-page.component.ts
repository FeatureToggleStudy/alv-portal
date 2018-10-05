import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-pav-home-page',
  templateUrl: './pav-home-page.component.html',
  styleUrls: ['./pav-home-page.component.scss']
})
export class PavHomePageComponent implements OnInit {

  form: FormGroup;

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
