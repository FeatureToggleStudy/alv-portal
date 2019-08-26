import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'alv-pilot-activation',
  templateUrl: './pilot-activation.component.html',
  styleUrls: ['./pilot-activation.component.scss']
})
export class PilotActivationComponent implements OnInit {

  form: FormGroup;

  loadingSubscription: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      activationCode: ['', [Validators.required]] // TODO: validation? max length? min length?
    });
  }

  onSubmit() {

  }

  isLoading(): boolean {
    return this.loadingSubscription && !this.loadingSubscription.closed;
  }
}
