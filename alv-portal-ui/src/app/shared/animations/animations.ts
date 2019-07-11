import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const removeSearchProfileAnimation = trigger('removeProfile', [
  transition(':leave', [
    animate('0.25s ease-in', keyframes([
      style({
        transformOrigin: 'top',
        transform: 'scaleY(1)',
        opacity: 1,
        maxHeight: '50px'
      }),
      style({
        transform: 'scaleY(0)',
        opacity: 0,
        maxHeight: 0
      })
    ]))
  ])
]);
