import {Component, Input, OnInit} from '@angular/core';
import {CandidateProfile} from "../../../shared/backend-services/candidate/candidate.types";
import {AuthenticationService} from "../../../core/auth/authentication.service";
import {I18nService} from "../../../core/i18n.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {AbstractSubscriber} from "../../../core/abstract-subscriber";

@Component({
    selector: 'alv-contact-modal',
    templateUrl: './contact-modal.component.html',
    styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent extends AbstractSubscriber implements OnInit {

    // See: https://stackoverflow.com/questions/41139842/how-to-pass-parameteres-to-modal
    @Input()
    candidate: CandidateProfile;

    form: FormGroup;

    constructor(private authenticationService: AuthenticationService, private i18nService: I18nService,
                private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.form = this.fb.group({
            salutation: [null, Validators.required],
            firstName: [{value: null, disabled: true}]
        });

        this.authenticationService.getCurrentCompany().pipe(
            takeUntil(this.ngUnsubscribe))
            .subscribe(company => this.patchCompanyValue(company));

    }

    private patchCompanyValue(company) {
        this.form.patchValue({
            salutation: company.salutation
        })
    }
}
