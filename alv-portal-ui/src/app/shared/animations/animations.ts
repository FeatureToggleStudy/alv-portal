import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

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

export const collapseExpandAnimation = trigger('expandCollapse', [
  state('open', style({
    display: 'block',
    'max-height': '100%',
    transform: 'scaleY(1)',
    opacity: 1
  })),
  state('closed', style({
    display: 'none',
    height: 0,
    'max-height': 0,
    transform: 'scaleY(0)',
    opacity: 0
  })),
  transition('* <=> *', [animate('200ms')])
]);


