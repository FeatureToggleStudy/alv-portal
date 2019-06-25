import { Component, ElementRef } from '@angular/core';
import { AbstractColumnLayout } from '../abstract-column-layout';

/**
 * It's one of the kinds of three-column layout (2:7:3) for using with the assistants.
 * In the assistants the left panel has enough space to fit the nivigation links
 * and the right panels is big enough to fit the additional information.
 */
@Component({
  selector: 'alv-assistant-layout',
  templateUrl: './assistant-layout.component.html',
  styleUrls: ['../abstract-column-layout.scss', './assistant-layout.component.scss']
})
export class AssistantLayoutComponent extends AbstractColumnLayout {

  constructor(private element: ElementRef) {
    super(element);
  }

}
