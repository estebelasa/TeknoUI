import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    input,
    output
} from '@angular/core';

import { DEFAULT_SIDEBAR_CONFIG } from './constants';

import {
    SidebarConfig,
    SidebarFooter,
    SidebarItem,
    SidebarProfile
} from './interfaces';

import {
    SidebarActions,
    SidebarSelectors,
    SidebarState
} from './state';

import { TkSidebarFooterComponent, TkSidebarHeaderComponent, TkSidebarNavigationComponent, TkSidebarProfileComponent, TkSidebarToggleComponent } from './components';



@Component({
    selector: 'tk-sidebar',
    standalone: true,

    imports: [
        TkSidebarHeaderComponent,
        TkSidebarProfileComponent,
        TkSidebarToggleComponent,
        TkSidebarNavigationComponent,
        TkSidebarFooterComponent
    ],

    templateUrl: './tk-sidebar.component.html',
    styleUrl: './tk-sidebar.component.scss',

    changeDetection: ChangeDetectionStrategy.OnPush,

    providers: [
        SidebarState,
        SidebarActions,
        SidebarSelectors
    ],


    host: {
        '[style.width.px]': 'width()'
    }
})
export class TkSidebarComponent {

    readonly config = input<SidebarConfig>(DEFAULT_SIDEBAR_CONFIG);

    readonly items = input.required<SidebarItem[]>();

    readonly profile = input<SidebarProfile>();

    readonly footer = input<SidebarFooter>();

    readonly itemSelected = output<SidebarItem>();

    protected readonly state = inject(SidebarState);

    protected readonly actions = inject(SidebarActions);

    protected readonly selectors = inject(SidebarSelectors);

    readonly collapsed = computed(() =>
        this.selectors.isCollapsed()
    );

    readonly selectedItemId = input<string>();


    readonly width = computed(() =>
        this.collapsed()
            ? this.config().collapsedWidth
            : this.config().width
    );

    constructor() {

        effect(() => {

            const selectedId = this.selectedItemId();

            if (selectedId) {
                this.actions.selectItem(selectedId);
            }

        });

    }

    onItemClick(item: SidebarItem): void {

        if (item.disabled) {

            return;

        }

        this.actions.selectItem(item.id);

        this.itemSelected.emit(item);

    }

}