import { computed } from '@angular/core';
import { SidebarState } from './sidebar.state';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarSelectors {

    constructor(
        private readonly state: SidebarState
    ) {}

    readonly isCollapsed = computed(() =>
        this.state.collapsed()
    );

    readonly isExpanded = computed(() =>
        !this.state.collapsed()
    );

    readonly isMobileOpened = computed(() =>
        this.state.mobileOpened()
    );

    readonly selectedItem = computed(() =>
        this.state.selectedItemId()
    );

    readonly hoveredItem = computed(() =>
        this.state.hoveredItemId()
    );

    readonly openedGroups = computed(() =>
        this.state.openedGroups()
    );

}