import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    TkIconComponent
} from './tk-icon.component';

import {
    TK_ICONS,
    TkIconName
} from './icons';

describe('TkIconComponent', () => {

    let fixture: ComponentFixture<TkIconComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                TkIconComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TkIconComponent);

    });


    it('should draw the path of every icon in the set', async () => {

        for (const name of Object.keys(TK_ICONS) as TkIconName[]) {

            fixture.componentRef.setInput('name', name);

            await fixture.whenStable();

            expect(fixture.nativeElement.querySelector('path').getAttribute('d')).toBe(TK_ICONS[name]);

        }

    });


    it('should be decorative', async () => {

        fixture.componentRef.setInput('name', 'home');

        await fixture.whenStable();

        expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');

    });

});
