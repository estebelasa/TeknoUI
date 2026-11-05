import {
    ChangeDetectionStrategy,
    Component,
    input,
    output
} from '@angular/core';

import { SidebarItem } from '../../interfaces';
import { TkIconComponent } from '../../../tk-icon';

@Component({
    selector: 'tk-sidebar-item',
    standalone: true,
    imports: [TkIconComponent],
    templateUrl: './tk-sidebar-item.component.html',
    styleUrl: './tk-sidebar-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TkSidebarItemComponent {

    readonly item = input.required<SidebarItem>();

    readonly collapsed = input(false);

    readonly selected = input(false);

    readonly clicked = output<SidebarItem>();

    onClick(event: MouseEvent): void {

        event.preventDefault();

        if (this.item().disabled) {
            return;
        }

        this.clicked.emit(this.item());
    }

}