import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-find-candidate-widget',
  templateUrl: './find-candidate-widget.component.html',
  styleUrls: ['./find-candidate-widget.component.scss']
})
export class FindCandidateWidgetComponent implements OnInit {

  findCandidateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.findCandidateForm = this.fb.group({
      profession: this.fb.control('Designer'),
      skills: this.fb.control(''),
      city: this.fb.control('Zurich')
    });
  }

}
