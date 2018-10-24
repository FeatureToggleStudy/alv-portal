import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { I18nService } from '../../../core/i18n.service';

@Component({
  selector: 'alv-job-seeker-home-page',
  templateUrl: './job-seeker-home-page.component.html',
  styleUrls: ['./job-seeker-home-page.component.scss']
})
export class JobSeekerHomePageComponent implements OnInit {
  findPositionsForm: FormGroup;


  constructor(private fb: FormBuilder, public i18n: I18nService) {
    this.i18n.currentLanguage.subscribe(x => console.log(x));
  }

  ngOnInit() {
    this.findPositionsForm = this.fb.group({
      profession: this.fb.control('Designer'),
      canton: this.fb.control('Zurich')
    });
  }
}
