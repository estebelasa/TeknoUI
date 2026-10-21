import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';

import { SidebarItem } from '../../interfaces';
import { TkSidebarItemComponent } from '../tk-sidebar-item/tk-sidebar-item.component';

@Component({
    selector: 'tk-sidebar-navigation',
    standalone: true,
    imports: [TkSidebarItemComponent],
    templateUrl: './tk-sidebar-navigation.component.html',
    styleUrl: './tk-sidebar-navigation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TkSidebarNavigationComponent {

    readonly items = input.required<SidebarItem[]>();

    readonly collapsed = input(false);

    readonly selectedItemId = input<string | null>(null);
    
    readonly itemSelected = output<SidebarItem>();

}