import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'alv-candidate-search-widget',
  templateUrl: './candidate-search-widget.component.html',
  styleUrls: ['./candidate-search-widget.component.scss']
})
export class CandidateSearchWidgetComponent implements OnInit {

  findCandidateForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.findCandidateForm = this.fb.group({
      profession: this.fb.control(''),
      skills: this.fb.control(''),
      city: this.fb.control('')
    });
  }

  onSubmit() {
    this.router.navigate(['candidate-search']);
  }

}
