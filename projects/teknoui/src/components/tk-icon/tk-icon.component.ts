import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input
} from '@angular/core';

import {
    TK_ICONS,
    TkIconName
} from './icons';

/**
 * Decorative line icon. It is always hidden from assistive technology:
 * the surrounding control must provide the accessible name.
 */
@Component({
    selector: 'tk-icon',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'aria-hidden': 'true'
    },
    template: `
        <svg viewBox="0 0 24 24" focusable="false">
            <path [attr.d]="path()" />
        </svg>
    `,
    styles: `
        :host {
            display: inline-block;
            width: var(--tk-icon-size);
            height: var(--tk-icon-size);
            line-height: 0;
            flex-shrink: 0;
        }
        svg {
            width: 100%;
            height: 100%;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
    `
})
export class TkIconComponent {

    readonly name = input.required<TkIconName>();

    protected readonly path = computed(() => TK_ICONS[this.name()]);

}
