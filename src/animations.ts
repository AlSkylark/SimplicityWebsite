import { trigger, state, style, transition, animate, query, sequence, group } from '@angular/animations'

//used in Main Comic Component
export const  Animations = {
    otherAnim: trigger('otherAnim',[
        state('true', style({
          transform: 'translateX(0%)'
        })),
        //default state
        state('false', style({
          transform: 'translateX(0%)'
        })),
        transition('false => true',[
          animate('0.5s ease-out')
        ]),
        transition('true => false',[
          animate('0s')
        ]),
      ]),
    centerAnim:trigger('centerAnim',[
        state('l', style({
          transform: 'translateX(100%)'
        })),
        state('r', style({
          transform: 'translateX(-100%)'
        })),
        // default state
        state('c', style({
          transform: 'translateX(0)'
        })),
        transition('c => *',[animate('0.5s ease-in')]),
        transition('* => c',[animate('0s')])
      ])
}

//used in router Animations
export const slideInAnimation = 
trigger('routeAnimations',[
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '56%' }), { optional: true }),
    group([
        query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true })
    ])
])
])
