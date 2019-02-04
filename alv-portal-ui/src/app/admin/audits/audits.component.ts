import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'alv-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss']
})
export class AuditsComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.prepareForm();

  // this.form.valueChanges.pipe(
  //     map<any, FilterPanelValues>((valueChanges) => this.map(valueChanges)),
  //     takeUntil(this.ngUnsubscribe)
  // )
  //     .subscribe(filterPanelData => this.filterPanelValuesChange.next(filterPanelData));
  }

  private prepareForm() {
    return this.fb.group({
      from: [null, Validators.required],
      to: [null, Validators.required] // datumBis should be minimal to datumVon
    });
  }

}
