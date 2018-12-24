import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-pav-home',
  templateUrl: './pav-home.component.html',
  styleUrls: ['./pav-home.component.scss']
})
export class PavHomeComponent implements OnInit {

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
