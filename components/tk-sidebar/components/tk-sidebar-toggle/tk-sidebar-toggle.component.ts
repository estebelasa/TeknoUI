import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';

/**
 * Round collapse toggle. The host is absolutely positioned by its container
 * (tk-sidebar places it on its right border, at the profile row).
 */
@Component({
    selector: 'tk-sidebar-toggle',
    standalone: true,
    templateUrl: './tk-sidebar-toggle.component.html',
    styleUrl: './tk-sidebar-toggle.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TkSidebarToggleComponent {

    readonly collapsed = input(false);

    /** Accessible name of the button; its state is exposed through aria-expanded. */
    readonly label = input('Mostrar u ocultar el menú');

    readonly toggled = output<void>();

}
