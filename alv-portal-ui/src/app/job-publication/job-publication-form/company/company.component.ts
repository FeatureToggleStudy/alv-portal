import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'alv-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.parentForm.addControl('company', this.buildCompanyGroup());
  }


  private buildCompanyGroup(): FormGroup {
    return this.fb.group({});
  }

  get companyGroup(): FormGroup {
    return <FormGroup>this.parentForm.get('company');
  }
}
