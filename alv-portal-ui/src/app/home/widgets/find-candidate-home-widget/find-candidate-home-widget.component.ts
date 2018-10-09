import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-find-candidate-home-widget',
  templateUrl: './find-candidate-home-widget.component.html',
  styleUrls: ['./find-candidate-home-widget.component.scss']
})
export class FindCandidateHomeWidgetComponent implements OnInit {

  findCandidateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.findCandidateForm = this.fb.group({
      profession: this.fb.control(''),
      skills: this.fb.control(''),
      city: this.fb.control('')
    });
  }

}
