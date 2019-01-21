import { Component } from '@angular/core';

/**
 * This is a fake component that we need in order to provide it to the routes when no
 * real component is needed there. For instance, if we want to assign a guard to a certain
 * url path, but don't need any meaningful component attached to that path.
 */
@Component({
  selector: 'alv-dummy',
  template: ''
})
export class DummyComponent {
}
