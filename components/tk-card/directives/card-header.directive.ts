import {
    Directive
} from '@angular/core';

@Directive({
    selector: '[tkCardHeader]',

    standalone: true,

    host: {
        class: 'tk-card__header'
    }
})
export class TkCardHeaderDirective {}