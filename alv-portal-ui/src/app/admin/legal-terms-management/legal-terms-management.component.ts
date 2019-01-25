import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface LegalTerms {
  id: string;
  effectiveAt: string;
  linkDe: string;
  linkEn: string;
  linkFr: string;
  linkIt: string;
}

@Component({
  selector: 'alv-legal-terms-management',
  templateUrl: './legal-terms-management.component.html',
  styleUrls: ['./legal-terms-management.component.scss']
})
export class LegalTermsManagementComponent implements OnInit {

  legalTermsEntries$: Observable<LegalTerms[]>;

  constructor() { }

  ngOnInit() {
  }

}
