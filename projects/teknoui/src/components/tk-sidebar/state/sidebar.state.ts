import { computed, signal } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarState {

    readonly collapsed = signal(false);

    readonly mobileOpened = signal(false);

    readonly selectedItemId = signal<string | null>(null);

    readonly hoveredItemId = signal<string | null>(null);

    readonly openedGroups = signal<string[]>([]);

    readonly initialized = signal(false);

    readonly isExpanded = computed(() => !this.collapsed());

}