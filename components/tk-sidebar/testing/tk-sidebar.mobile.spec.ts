import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TkSidebarComponent } from '../tk-sidebar.component';
import { SidebarItem } from '../interfaces';
import { SIDEBAR_ITEMS } from './sidebar.mock';

@Component({
    imports: [TkSidebarComponent],
    template: `
        <button type="button" class="opener" (click)="sidebar().openMobile()">Menu</button>
        <tk-sidebar
            [items]="items"
            [profile]="{ name: 'Ada Lovelace', subtitle: 'Engineer' }"
            (itemSelected)="selected.push($event)" />
    `
})
class HostComponent {

    readonly items = SIDEBAR_ITEMS;

    readonly selected: SidebarItem[] = [];

    readonly sidebar = viewChild.required(TkSidebarComponent);

}

/** Controllable stand-in for window.matchMedia (jsdom has none). */
function mockViewport(mobile: boolean) {

    const listeners: (() => void)[] = [];
    const query = {
        matches: mobile,
        addEventListener: (_: string, listener: () => void) => listeners.push(listener),
        removeEventListener: () => undefined
    };

    Object.defineProperty(document.defaultView!, 'matchMedia', {
        configurable: true,
        value: () => query
    });

    return {
        resize(toMobile: boolean) {
            query.matches = toMobile;
            listeners.forEach(listener => listener());
        }
    };

}

describe('TkSidebarComponent (mobile drawer)', () => {

    let fixture: ComponentFixture<HostComponent>;

    let element: HTMLElement;

    let host: HTMLElement;

    let viewport: ReturnType<typeof mockViewport>;

    const sidebar = () => fixture.componentInstance.sidebar();

    const open = async () => {
        element.querySelector<HTMLButtonElement>('.opener')!.focus();
        element.querySelector<HTMLButtonElement>('.opener')!.click();
        await fixture.whenStable();
    };

    async function create(mobile: boolean) {

        viewport = mockViewport(mobile);

        await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        await fixture.whenStable();

        element = fixture.nativeElement;
        document.body.appendChild(element);
        host = element.querySelector('tk-sidebar')!;

    }

    afterEach(() => {
        element?.remove();
        delete (document.defaultView as unknown as Record<string, unknown>)['matchMedia'];
    });


    it('should stay a regular sidebar on desktop', async () => {

        await create(false);

        expect(sidebar().isMobile()).toBe(false);
        expect(host.hasAttribute('inert')).toBe(false);
        expect(host.querySelector('tk-sidebar-toggle')).not.toBeNull();

        await open();

        expect(sidebar().mobileOpened()).toBe(false);

    });


    it('should start closed, inert and without the collapse toggle on mobile', async () => {

        await create(true);

        expect(host.classList).toContain('tk-sidebar-host--mobile');
        expect(host.classList).not.toContain('tk-sidebar-host--open');
        expect(host.hasAttribute('inert')).toBe(true);
        expect(host.querySelector('tk-sidebar-toggle')).toBeNull();
        expect(host.querySelector('.tk-sidebar__backdrop')).toBeNull();
        expect(host.querySelector('aside')?.id).toBe(sidebar().panelId);

    });


    it('should open as an expanded drawer and move focus into it', async () => {

        await create(true);
        await open();

        expect(sidebar().mobileOpened()).toBe(true);
        expect(sidebar().collapsed()).toBe(false);
        expect(host.classList).toContain('tk-sidebar-host--open');
        expect(host.hasAttribute('inert')).toBe(false);
        expect(host.querySelector('.tk-sidebar__backdrop')).not.toBeNull();
        expect(host.contains(document.activeElement)).toBe(true);

    });


    it('should close on Escape and give focus back to the opener', async () => {

        await create(true);
        await open();

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await fixture.whenStable();

        expect(sidebar().mobileOpened()).toBe(false);
        expect(host.hasAttribute('inert')).toBe(true);
        expect(document.activeElement).toBe(element.querySelector('.opener'));

    });


    it('should close when the backdrop is clicked', async () => {

        await create(true);
        await open();

        host.querySelector<HTMLElement>('.tk-sidebar__backdrop')!.click();
        await fixture.whenStable();

        expect(sidebar().mobileOpened()).toBe(false);

    });


    it('should close after choosing a section, still emitting it', async () => {

        await create(true);
        await open();

        host.querySelectorAll<HTMLAnchorElement>('.tk-sidebar-item')[2].click();
        await fixture.whenStable();

        expect(fixture.componentInstance.selected).toEqual([SIDEBAR_ITEMS[2]]);
        expect(sidebar().mobileOpened()).toBe(false);

    });


    it('should keep Tab and Shift+Tab inside the open drawer', async () => {

        await create(true);
        await open();

        const focusables = Array.from(host.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        last.focus();
        last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
        expect(document.activeElement).toBe(first);

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
        expect(document.activeElement).toBe(last);

    });


    it('should close the drawer when the viewport grows to desktop', async () => {

        await create(true);
        await open();

        viewport.resize(false);
        await fixture.whenStable();

        expect(sidebar().isMobile()).toBe(false);
        expect(sidebar().mobileOpened()).toBe(false);
        expect(host.querySelector('tk-sidebar-toggle')).not.toBeNull();

        // Back on mobile it must not reappear open.
        viewport.resize(true);
        await fixture.whenStable();

        expect(sidebar().mobileOpened()).toBe(false);

    });

});
