import { Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';
import { ValidationMessage } from './validation-messages/validation-message.model';
import { InputType } from './input-type.enum';
import { InputIdGenerationService } from './input-id-generation.service';

/**
 * Abstract input
 */
export abstract class AbstractInput implements OnInit {

  /**
   * FormControlName that should be bound to the input
   */
  @Input() alvFormControlName: string;

  /**
   * FormControl object that should be bound to the input
   */
  @Input() alvControl: FormControl;

  /**
   * label of the input
   */
  @Input() label: string;

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

  /**
   * (optional) help text to be displayed below the input
   */
  @Input() helpText?: string;

  /**
   * (optional) if true, the autofocus attribute will be set on the input
   */
  @Input() autofocus?: boolean;

  validationId: string;

  protected constructor(
      private controlContainer: ControlContainer,
      private inputType: InputType,
      private inputIdGenerationService: InputIdGenerationService) {
  }

  ngOnInit() {
    if (this.alvControl && this.alvFormControlName) {
      throw Error(`Must not define both 'formCtrl' and 'formCtrlName'`);
    }

    if (!!this.alvControl && !!this.alvFormControlName) {
      throw Error(`Must define one of 'formCtrl' xor 'formCtrlName'`);
    }

    this.id = this.id || this.inputIdGenerationService.getNextInputId(this.inputType, this.label);
    this.validationId = `${this.id}-validation`;
  }

  public get control() {
    if (this.alvControl) {
      return this.alvControl;
    }
    return this.currentReferencedFormControl();
  }

  private currentReferencedFormControl() {
    const control = this.controlContainer.control.get(this.alvFormControlName);
    if (!control) {
      const path = this.controlContainer.path && this.controlContainer.path.length !== 0 ? this.controlContainer.path : 'root';
      throw new Error(`no control was found with name: ${this.alvFormControlName} in ControlContainer: ${path}`);
    }
    return control;
  }

  public get required(): boolean {
    const control = this.control;
    if (!control || !control.validator) {
      return false;
    }
    const validators = control.validator(new FormControl(''));
    return validators && validators['required'];
  }

}
