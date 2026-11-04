import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    TkSidebarHeaderComponent
} from './tk-sidebar-header.component';

describe('TkSidebarHeaderComponent', () => {

    let fixture: ComponentFixture<TkSidebarHeaderComponent>;

    let element: HTMLElement;

    const button = (): HTMLButtonElement =>
        element.querySelector('button')!;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                TkSidebarHeaderComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TkSidebarHeaderComponent);

        fixture.componentRef.setInput('title', 'Menu title');

        await fixture.whenStable();

        element = fixture.nativeElement;

    });


    it('should have header landmark', () => {

        expect(element.querySelector('header.tk-sidebar-header')).not.toBeNull();

    });


    it('should render title', () => {

        expect(element.querySelector('.tk-sidebar-header__title')?.textContent?.trim()).toBe('Menu title');

    });


    it('should give the toggle button an accessible name and hide the glyph', () => {

        expect(button().getAttribute('aria-label')).toBe('Mostrar u ocultar el menú');

        expect(button().querySelector('[aria-hidden="true"]')?.textContent?.trim()).toBe('☰');

    });


    it('should expose the expanded state through aria-expanded', async () => {

        expect(button().getAttribute('aria-expanded')).toBe('true');

        fixture.componentRef.setInput('collapsed', true);

        await fixture.whenStable();

        expect(button().getAttribute('aria-expanded')).toBe('false');

    });


    it('should hide title when collapsed', async () => {

        fixture.componentRef.setInput('collapsed', true);

        await fixture.whenStable();

        expect(element.querySelector('.tk-sidebar-header__title')).toBeNull();

    });


    it('should emit collapse event', () => {

        let emitted = 0;

        fixture.componentInstance.collapse.subscribe(() => emitted++);

        button().click();

        expect(emitted).toBe(1);

    });

});
