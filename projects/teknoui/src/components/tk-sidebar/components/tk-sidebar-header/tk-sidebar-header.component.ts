import {
    ChangeDetectionStrategy,
    Component,
    input
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

}
