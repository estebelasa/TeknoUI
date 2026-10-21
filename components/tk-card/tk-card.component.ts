import {
    CUSTOM_ELEMENTS_SCHEMA,
    ChangeDetectionStrategy,
    Component,
    computed,
    input
} from '@angular/core';

import {
    DEFAULT_CARD_CONFIG
} from './constants';

import {
    CardPadding,
    CardVariant
} from './types';

@Component({
    selector: 'tk-card',

    standalone: true,

    templateUrl: './tk-card.component.html',

    styleUrl: './tk-card.component.scss',

    changeDetection: ChangeDetectionStrategy.OnPush,
    
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TkCardComponent {

    readonly variant =
        input<CardVariant>(
            DEFAULT_CARD_CONFIG.variant
        );

    readonly padding =
        input<CardPadding>(
            DEFAULT_CARD_CONFIG.padding
        );

}