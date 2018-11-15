import { EventEmitter, Output } from '@angular/core';
import { RegistrationStep } from './registration-step.enum';

export abstract class AbstractRegistrationStep {

  @Output() updateStep = new EventEmitter<RegistrationStep>();

}
