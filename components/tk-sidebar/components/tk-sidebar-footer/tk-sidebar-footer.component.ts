import {
    ChangeDetectionStrategy,
    Component,
    input
} from '@angular/core';

import { SidebarFooter } from '../../interfaces';

@Component({
    selector: 'tk-sidebar-footer',
    standalone: true,
    templateUrl: './tk-sidebar-footer.component.html',
    styleUrl: './tk-sidebar-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TkSidebarFooterComponent {

    readonly footer = input.required<SidebarFooter>();

}