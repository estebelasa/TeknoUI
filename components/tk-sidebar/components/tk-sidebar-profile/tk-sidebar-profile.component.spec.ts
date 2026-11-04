import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    TkSidebarProfileComponent
} from './tk-sidebar-profile.component';

describe('TkSidebarProfileComponent', () => {

    let fixture: ComponentFixture<TkSidebarProfileComponent>;

    let element: HTMLElement;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                TkSidebarProfileComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TkSidebarProfileComponent);

        fixture.componentRef.setInput('profile', { name: 'Ada Lovelace', subtitle: 'Engineer', avatar: 'ada.jpg' });

        await fixture.whenStable();

        element = fixture.nativeElement;

    });


    it('should render name and subtitle', () => {

        expect(element.querySelector('.tk-sidebar-profile__name')?.textContent).toBe('Ada Lovelace');

        expect(element.textContent).toContain('Engineer');

    });


    it('should not render headings that would break the page outline', () => {

        expect(element.querySelector('h1, h2, h3, h4, h5, h6')).toBeNull();

    });


    it('should treat the avatar as decorative', () => {

        const avatar = element.querySelector('img')!;

        expect(avatar.getAttribute('src')).toBe('ada.jpg');

        expect(avatar.getAttribute('alt')).toBe('');

    });


    it('should keep the content in place but hidden from assistive technology when collapsed', async () => {

        const content = () => element.querySelector('.tk-sidebar-profile__content')!;

        expect(content().hasAttribute('aria-hidden')).toBe(false);

        fixture.componentRef.setInput('collapsed', true);

        await fixture.whenStable();

        // Still rendered, so the block keeps its height; the CSS makes it invisible.
        expect(content().querySelector('.tk-sidebar-profile__name')?.textContent).toBe('Ada Lovelace');

        expect(content().getAttribute('aria-hidden')).toBe('true');

        expect(element.querySelector('.tk-sidebar-profile--collapsed')).not.toBeNull();

    });

});
