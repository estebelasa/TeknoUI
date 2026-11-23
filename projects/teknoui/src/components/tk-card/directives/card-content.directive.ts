import {
    Directive
} from '@angular/core';

@Directive({
    selector: '[tkCardContent]',

    standalone: true,

    host: {
        class: 'tk-card__content'
    }
})
export class TkCardContentDirective {}