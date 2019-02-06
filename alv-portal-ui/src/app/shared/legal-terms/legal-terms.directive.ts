import { Directive } from '@angular/core';
import { ModalService } from '../layout/modal/modal.service';
import { LegalTermsModalComponent } from './legal-terms-modal/legal-terms-modal.component';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { User } from '../../core/auth/user.model';
import { takeUntil } from 'rxjs/operators';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AbstractSubscriber } from '../../core/abstract-subscriber';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'alv-legal-terms',
})
export class LegalTermsDirective extends AbstractSubscriber {

  private legalTermsModalRef: NgbModalRef;

  constructor(private modalService: ModalService,
              private authenticationService: AuthenticationService) {

    super();

    this.authenticationService.getCurrentUser().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((user: User) => {
      const showModal = user && user.isLegalTermAcceptanceRequired();
      this.toggleLegalTermsModal(showModal);
    });
  }

  private toggleLegalTermsModal(showModal: boolean) {
    if (showModal && !this.legalTermsModalRef) {
      this.legalTermsModalRef = this.modalService.openLarge(LegalTermsModalComponent);
    } else if (!showModal && this.legalTermsModalRef) {
      this.legalTermsModalRef.close();
      this.legalTermsModalRef = null;
    }
  }
}
