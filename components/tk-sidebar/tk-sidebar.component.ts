import {
    ChangeDetectionStrategy,
    Component,
    DOCUMENT,
    ElementRef,
    Injector,
    afterNextRender,
    computed,
    effect,
    inject,
    input,
    output,
    signal
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



let nextPanelId = 0;

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
        '[style.width.px]': 'width()',
        '[class.tk-sidebar-host--mobile]': 'isMobile()',
        '[class.tk-sidebar-host--open]': 'mobileOpened()',
        // Closed drawer: off-screen and out of the tab order / accessibility tree.
        '[attr.inert]': 'isMobile() && !mobileOpened() ? "" : null',
        '(document:keydown.escape)': 'closeMobile()',
        '(keydown.tab)': 'trapFocus($event)',
        '(keydown.shift.tab)': 'trapFocus($event)'
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

    readonly selectedItemId = input<string>();

    /**
     * Viewport width (px) below which the sidebar becomes an overlay drawer,
     * opened with openMobile() from a button of the application.
     */
    readonly mobileBreakpoint = input(900);

    private readonly document = inject(DOCUMENT);

    private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

    private readonly injector = inject(Injector);

    /** Id of the panel, for aria-controls on the application's menu button. */
    readonly panelId = `tk-sidebar-panel-${nextPanelId++}`;

    private readonly viewportIsMobile = signal(false);

    /** Element focused before opening the drawer; focus returns to it on close. */
    private openedFrom: HTMLElement | null = null;

    readonly isMobile = this.viewportIsMobile.asReadonly();

    /** Only openMobile() opens it, and only on mobile; leaving mobile closes it. */
    readonly mobileOpened = computed(() =>
        this.selectors.isMobileOpened()
    );

    /** The drawer is always shown expanded: collapsing only applies on desktop. */
    readonly collapsed = computed(() =>
        !this.isMobile() && this.selectors.isCollapsed()
    );

    readonly width = computed(() =>
        this.collapsed()
            ? this.config().collapsedWidth
            : this.config().width
    );

    constructor() {

        const view = this.document.defaultView;

        effect(onCleanup => {

            if (typeof view?.matchMedia !== 'function') {
                return;
            }

            const query = view.matchMedia(`(max-width: ${this.mobileBreakpoint() - 0.02}px)`);

            const update = () => {
                this.viewportIsMobile.set(query.matches);

                // Leaving the mobile layout with the drawer open must not leave it open later.
                if (!query.matches) {
                    this.actions.closeMobile();
                }
            };

            update();

            query.addEventListener?.('change', update);

            onCleanup(() => query.removeEventListener?.('change', update));

        });

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

        this.closeMobile();

    }

    openMobile(): void {

        if (!this.isMobile() || this.mobileOpened()) {
            return;
        }

        const active = this.document.activeElement;
        this.openedFrom = active instanceof HTMLElement ? active : null;

        this.actions.openMobile();

        // Move focus into the drawer once it has rendered without `inert`.
        afterNextRender(() => this.focusables()[0]?.focus(), { injector: this.injector });

    }

    closeMobile(): void {

        if (!this.mobileOpened()) {
            return;
        }

        this.actions.closeMobile();

        this.openedFrom?.focus();
        this.openedFrom = null;

    }

    toggleMobile(): void {

        if (this.mobileOpened()) {
            this.closeMobile();
        } else {
            this.openMobile();
        }

    }

    /** Keeps Tab / Shift+Tab inside the open drawer (it behaves as a modal). */
    protected trapFocus(event: Event): void {

        if (!this.mobileOpened()) {
            return;
        }

        const focusables = this.focusables();
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const backwards = (event as KeyboardEvent).shiftKey;
        const active = this.document.activeElement;

        if (backwards && active === first) {
            event.preventDefault();
            last?.focus();
        } else if (!backwards && active === last) {
            event.preventDefault();
            first?.focus();
        }

    }

    private focusables(): HTMLElement[] {

        return Array.from(
            this.host.nativeElement.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
        );

    }

}