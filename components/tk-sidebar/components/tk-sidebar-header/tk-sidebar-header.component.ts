import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';

@Component({
    selector: 'tk-sidebar-header',
    standalone: true,
    templateUrl: './tk-sidebar-header.component.html',
    styleUrl: './tk-sidebar-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TkSidebarHeaderComponent {

    readonly logo = input<string>();

    readonly title = input('');

    readonly collapsed = input(false);

    /** Accessible name of the toggle button; its state is exposed through aria-expanded. */
    readonly toggleLabel = input('Mostrar u ocultar el menú');

    readonly collapse = output<void>();

}