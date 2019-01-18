import { AfterViewInit, Component } from '@angular/core';

@Component({
    selector: 'alv-job-fingerprint-redirect',
    templateUrl: './job-fingerprint-redirect.component.html'
})
export class JobFingerprintRedirectComponent implements AfterViewInit {

    constructor() {
    }

    ngAfterViewInit(): void {
        window.scroll(0, 0);
    }
}
