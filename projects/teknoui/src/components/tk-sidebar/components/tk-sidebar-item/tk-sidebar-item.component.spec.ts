import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    TkSidebarItemComponent
} from './tk-sidebar-item.component';

import {
    SidebarItem
} from '../../interfaces';

describe('TkSidebarItemComponent', () => {

    const item: SidebarItem = { id: 'experience', label: 'Experiencia' };

    let fixture: ComponentFixture<TkSidebarItemComponent>;

    let clicked: SidebarItem[];

    const link = (): HTMLAnchorElement =>
        fixture.nativeElement.querySelector('a.tk-sidebar-item');

    const render = async (inputs: Record<string, unknown> = {}) => {

        for (const [name, value] of Object.entries({ item, ...inputs })) {
            fixture.componentRef.setInput(name, value);
        }

        await fixture.whenStable();

    };

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                TkSidebarItemComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TkSidebarItemComponent);

        clicked = [];

        fixture.componentInstance.clicked.subscribe(value => clicked.push(value));

    });


    it('should render label and link to the section', async () => {

        await render();

        expect(link().textContent?.trim()).toBe('Experiencia');

        expect(link().getAttribute('href')).toBe('#experience');

    });


    it('should emit clicked event', async () => {

        await render();

        link().click();

        expect(clicked).toEqual([item]);

    });


    it('should mark the selected item as the current location', async () => {

        await render({ selected: true });

        expect(link().classList).toContain('tk-sidebar-item--selected');

        expect(link().getAttribute('aria-current')).toBe('location');

    });


    it('should not mark unselected items as current', async () => {

        await render();

        expect(link().hasAttribute('aria-current')).toBe(false);

    });


    it('should expose disabled items as disabled and not emit', async () => {

        await render({ item: { ...item, disabled: true } });

        expect(link().classList).toContain('tk-sidebar-item--disabled');

        expect(link().getAttribute('aria-disabled')).toBe('true');

        expect(link().hasAttribute('href')).toBe(false);

        link().click();

        expect(clicked).toEqual([]);

    });


    it('should keep an accessible name when collapsed', async () => {

        await render({ collapsed: true });

        expect(link().querySelector('.tk-sidebar-item__label')).toBeNull();

        expect(link().getAttribute('aria-label')).toBe('Experiencia');

        expect(link().getAttribute('title')).toBe('Experiencia');

    });


    it('should show only the label while expanded', async () => {

        await render({ item: { ...item, icon: 'briefcase' } });

        expect(link().querySelector('tk-icon')).toBeNull();

        expect(link().querySelector('.tk-sidebar-item__label')?.textContent?.trim()).toBe('Experiencia');

    });


    it('should show only a decorative icon while collapsed', async () => {

        await render({ item: { ...item, icon: 'briefcase' }, collapsed: true });

        const icon = link().querySelector('tk-icon');

        expect(icon).not.toBeNull();

        expect(icon?.getAttribute('aria-hidden')).toBe('true');

        expect(link().querySelector('.tk-sidebar-item__label')).toBeNull();

        expect(link().getAttribute('aria-label')).toBe('Experiencia');

    });

});
