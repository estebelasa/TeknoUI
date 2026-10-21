import {
    Directive
} from '@angular/core';

@Directive({
    selector: '[tkCardFooter]',

    standalone: true,

    host: {
        class: 'tk-card__footer'
    }
})
export class TkCardFooterDirective {}