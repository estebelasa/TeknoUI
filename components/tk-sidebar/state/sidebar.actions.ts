import { SidebarState } from './sidebar.state';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarActions {

    constructor(
        private readonly state: SidebarState
    ) {}

    initialize(): void {

        this.state.initialized.set(true);

    }

    toggle(): void {

        this.state.collapsed.update(value => !value);

    }

    collapse(): void {

        this.state.collapsed.set(true);

    }

    expand(): void {

        this.state.collapsed.set(false);

    }

    openMobile(): void {

        this.state.mobileOpened.set(true);

    }

    closeMobile(): void {

        this.state.mobileOpened.set(false);

    }

    selectItem(id: string): void {

        this.state.selectedItemId.set(id);

    }

    hoverItem(id: string | null): void {

        this.state.hoveredItemId.set(id);

    }

    openGroup(id: string): void {

        this.state.openedGroups.update(groups => {

            if (groups.includes(id)) {

                return groups;

            }

            return [...groups, id];

        });

    }

    closeGroup(id: string): void {

        this.state.openedGroups.update(groups =>
            groups.filter(group => group !== id)
        );

    }

}