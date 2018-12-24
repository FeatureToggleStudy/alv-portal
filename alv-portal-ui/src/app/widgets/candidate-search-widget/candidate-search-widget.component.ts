import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-candidate-search-widget',
  templateUrl: './candidate-search-widget.component.html',
  styleUrls: ['./candidate-search-widget.component.scss']
})
export class CandidateSearchWidgetComponent implements OnInit {

  findCandidateForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.findCandidateForm = this.fb.group({
      profession: this.fb.control(''),
      skills: this.fb.control(''),
      city: this.fb.control('')
    });
  }

}
