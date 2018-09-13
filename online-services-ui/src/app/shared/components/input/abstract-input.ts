import { Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from './validation-messages/validation-message.model';
import { InputType } from './input-type.enum';
import { ValidationService } from '../../validation.service';

const inputIds: any = {};

/**
 * Abstract input
 */
export abstract class AbstractInput {

  /**
   * label of the input
   */
  @Input() label: string;

  /**
   * FormControl object that should be bound to the input
   */
  @Input() control: FormControl;

  /**
   * (optional) explicit id that will be set on the input element
   */
  @Input() id?: string;

  /**
   * (optional) add custom validation messages or override the default ones
   */
  @Input() validationMessages?: Array<ValidationMessage>;

  /**
   * (optional) if true, the field will be readonly without background color and without border
   */
  @Input() readonly?: boolean;

  validationId: string;
  required: string;

  protected constructor(private inputType: InputType) {
  }

  protected initInput(validationService: ValidationService) {
    this.id = this.id || `os-${this.getNextInputId(this.inputType, this.label)}`;
    this.validationId = `${this.id}-validation`;
    this.required = validationService.isRequired(this.control) ? 'required' : null;
  }

  private getNextInputId(inputType: InputType, label: string): string {
    const labelKey = label ? label.replace(/ /g, '-').toLowerCase() : '';
    if (!inputIds[inputType + labelKey]) {
      inputIds[inputType + labelKey] = 0;
    }
    return inputType + '-' + labelKey + '-' + inputIds[inputType + labelKey]++;
  }

}
