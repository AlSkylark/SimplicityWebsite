import { trigger, state, style, transition, animate, query, sequence, group } from '@angular/animations'

//used in Main Comic Component
export const  Animations = {
    otherAnim: trigger('otherAnim',
    [
      transition(':enter',[
        style({opacity: 0}),
        animate('0.3s ease-out', style({opacity: 1}))
      ]),
      transition(':leave',[
        style({opacity: 1}),
        animate('0s ease-out', style({opacity: 0}))
      ])
    ]),
    centerAnim:trigger('centerAnim',
    [
      transition(':enter',[
        style({opacity: 0}),
        animate('0.3s ease-out', style({opacity: 1}))
      ]),
      transition(':leave',[
        style({opacity: 1}),
        animate('0s ease-out', style({opacity: 0}))
      ])
    ])
}

//used in router Animations
export const slideInAnimation = 
trigger('routeAnimations',[
  transition('* => *', [

    group([
        query(':enter', [
            style({ opacity: 0 }),
            animate('0s ease-in-out', style({ opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
            style({ opacity: 1 }),
            animate('0s', style({ opacity: 0 }))
        ], { optional: true })
    ])
])
])

export const navAnimations = {
  menuAnim: trigger('menuAnim',[
    transition(':enter',[
      style({transform: 'translateX(100%)'}),
      animate('0.3s ease-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave',[
      style({transform: 'translateX(0%)'}),
      animate('0.3s ease-out', style({transform: 'translateX(100%)'}))
    ])
  ]),
  bar1Anim: trigger('bar1Anim',[
    state('true', style({
      transform: 'rotate(45deg) translate(5px, 9px) scale(115%)'
    })),
    //default state
    state('false', style({
      transform: 'rotate(0deg) translate(0px, 0px) scale(100%)'
    })),
    transition('false => true',[
      animate('0.3s ease-out')
    ]),
    transition('true => false',[
      animate('0.3s ease-out')
    ])
  ]),
  bar2Anim: trigger('bar2Anim',[
    state('true', style({
      opacity: '0'
    })),
    //default state
    state('false', style({
      opacity: '1'
    })),
    transition('false => true',[
      animate('0.3s ease-out')
    ]),
    transition('true => false',[
      animate('0.3s ease-out')
    ])
  ]),
  bar3Anim: trigger('bar3Anim',[
    state('true', style({
      transform: 'rotate(-45deg) translate(4px, -9px) scale(115%)'
    })),
    //default state
    state('false', style({
      transform: 'rotate(0deg) translate(0px, 0px) scale(100%)'
    })),
    transition('false => true',[
      animate('0.3s ease-out')
    ]),
    transition('true => false',[
      animate('0.3s ease-out')
    ])
  ])
}
