import {
    ChangeDetectionStrategy,
    Component,
    input
} from '@angular/core';

import {
    DEFAULT_TAG_CONFIG
} from './constants';

import {
    TagSize,
    TagVariant
} from './types';

@Component({
    selector: 'tk-tag',

    standalone: true,

    templateUrl: './tk-tag.component.html',

    styleUrl: './tk-tag.component.scss',

    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TkTagComponent {

    readonly variant = input<TagVariant>(
        DEFAULT_TAG_CONFIG.variant
    );

    readonly size = input<TagSize>(
        DEFAULT_TAG_CONFIG.size
    );

}