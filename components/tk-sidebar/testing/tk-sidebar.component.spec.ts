import {
    Component,
    viewChild
} from '@angular/core';

import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    TkSidebarComponent
} from '../tk-sidebar.component';

import {
    SidebarItem
} from '../interfaces';

import {
    SIDEBAR_ITEMS
} from './sidebar.mock';

@Component({
    imports: [TkSidebarComponent],
    template: `
        <tk-sidebar
            #sidebar
            [items]="items"
            [profile]="{ name: 'Ada Lovelace', subtitle: 'Engineer' }"
            [footer]="{ version: 'v1.0.0' }"
            (itemSelected)="selected.push($event)">
            <span tkSidebarBrand class="header-brand">AL</span>
            <span tkSidebarProfileBrand class="profile-brand">al</span>
        </tk-sidebar>
    `
})
class HostComponent {

    readonly items = SIDEBAR_ITEMS;

    readonly selected: SidebarItem[] = [];

    readonly sidebar = viewChild.required(TkSidebarComponent);

}

describe('TkSidebarComponent', () => {

    let fixture: ComponentFixture<HostComponent>;

    let element: HTMLElement;

    const toggle = async () => {

        element.querySelector<HTMLButtonElement>('tk-sidebar-toggle button')!.click();

        await fixture.whenStable();

    };

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);

        await fixture.whenStable();

        element = fixture.nativeElement;

    });


    it('should create', () => {

        expect(fixture.componentInstance.sidebar()).toBeTruthy();

    });


    it('should have navigation landmark', () => {

        expect(element.querySelector('aside.tk-sidebar nav')).not.toBeNull();

    });


    it('should render navigation items', () => {

        const labels = Array.from(element.querySelectorAll('.tk-sidebar-item__label'))
            .map(label => label.textContent?.trim());

        expect(labels).toEqual(SIDEBAR_ITEMS.map(item => item.label));

    });


    it('should emit selected item', () => {

        element.querySelectorAll<HTMLAnchorElement>('.tk-sidebar-item')[1].click();

        expect(fixture.componentInstance.selected).toEqual([SIDEBAR_ITEMS[1]]);

    });


    it('should render profile and footer while expanded', () => {

        expect(element.querySelector('tk-sidebar-profile')?.textContent).toContain('Ada Lovelace');

        expect(element.querySelector('tk-sidebar-footer')?.textContent).toContain('v1.0.0');

    });


    it('should project each brand slot into its own block', () => {

        expect(element.querySelector('.tk-sidebar-header__brand .header-brand')?.textContent).toBe('AL');

        expect(element.querySelector('.tk-sidebar-profile__brand .profile-brand')?.textContent).toBe('al');

        expect(element.querySelector('tk-sidebar-header .profile-brand')).toBeNull();

        expect(element.querySelector('tk-sidebar-profile .header-brand')).toBeNull();

    });


    it('should place the collapse toggle on the profile row', () => {

        expect(element.querySelector('.tk-sidebar__toggle-row > tk-sidebar-toggle button')).not.toBeNull();

        expect(element.querySelector('tk-sidebar-header button')).toBeNull();

    });


    it('should hide the profile content when collapsed but keep the block', async () => {

        await toggle();

        expect(fixture.componentInstance.sidebar().collapsed()).toBe(true);

        expect(element.querySelector('.tk-sidebar-profile--collapsed')).not.toBeNull();

        expect(element.querySelector('.tk-sidebar-profile__content')?.getAttribute('aria-hidden')).toBe('true');

    });


    it('should use the collapsed width', async () => {

        await toggle();

        expect((element.querySelector('tk-sidebar') as HTMLElement).style.width).toBe('80px');

    });


    it('should expand again', async () => {

        await toggle();

        await toggle();

        expect(fixture.componentInstance.sidebar().collapsed()).toBe(false);

        expect(element.querySelector('.tk-sidebar-profile--collapsed')).toBeNull();

        expect((element.querySelector('tk-sidebar') as HTMLElement).style.width).toBe('320px');

    });


    it('should disable disabled items');

    it('should support keyboard navigation');

});
