import {
    ChangeDetectionStrategy,
    Component,
    input
} from '@angular/core';

import { SidebarProfile } from '../../interfaces';

@Component({
    selector: 'tk-sidebar-profile',
    standalone: true,
    templateUrl: './tk-sidebar-profile.component.html',
    styleUrl: './tk-sidebar-profile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TkSidebarProfileComponent {

    readonly profile = input.required<SidebarProfile>();

    readonly collapsed = input(false);

}