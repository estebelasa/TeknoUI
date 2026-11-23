import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    TkSidebarToggleComponent
} from './tk-sidebar-toggle.component';

describe('TkSidebarToggleComponent', () => {

    let fixture: ComponentFixture<TkSidebarToggleComponent>;

    let button: HTMLButtonElement;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                TkSidebarToggleComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TkSidebarToggleComponent);

        await fixture.whenStable();

        button = fixture.nativeElement.querySelector('button');

    });


    it('should have an accessible name and hide the arrow from assistive technology', () => {

        expect(button.getAttribute('aria-label')).toBe('Mostrar u ocultar el menú');

        expect(button.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');

    });


    it('should expose the expanded state through aria-expanded and flip the arrow', async () => {

        expect(button.getAttribute('aria-expanded')).toBe('true');

        expect(button.classList).not.toContain('tk-sidebar-toggle--collapsed');

        fixture.componentRef.setInput('collapsed', true);

        await fixture.whenStable();

        expect(button.getAttribute('aria-expanded')).toBe('false');

        expect(button.classList).toContain('tk-sidebar-toggle--collapsed');

    });


    it('should emit toggled when clicked', () => {

        let emitted = 0;

        fixture.componentInstance.toggled.subscribe(() => emitted++);

        button.click();

        expect(emitted).toBe(1);

    });

});
