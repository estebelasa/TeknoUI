import {
    Component
} from '@angular/core';

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


    it('should hide title when collapsed', async () => {

        fixture.componentRef.setInput('collapsed', true);

        await fixture.whenStable();

        expect(element.querySelector('.tk-sidebar-header__title')).toBeNull();

    });


    it('should not render an empty title', async () => {

        fixture.componentRef.setInput('title', '');

        await fixture.whenStable();

        expect(element.querySelector('.tk-sidebar-header__title')).toBeNull();

    });


    it('should not contain the collapse toggle any more', () => {

        expect(element.querySelector('button')).toBeNull();

    });


    it('should project a brand mark', async () => {

        @Component({
            imports: [TkSidebarHeaderComponent],
            template: `<tk-sidebar-header><b class="brand">AL</b></tk-sidebar-header>`
        })
        class HostComponent {}

        const host = TestBed.createComponent(HostComponent);

        await host.whenStable();

        expect(host.nativeElement.querySelector('.tk-sidebar-header__brand .brand')?.textContent).toBe('AL');

    });

});
