import {
    Component
} from '@angular/core';

import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    TkCardComponent
} from '../tk-card.component';

describe('TkCardComponent', () => {

    let fixture: ComponentFixture<TkCardComponent>;

    let article: HTMLElement;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                TkCardComponent
            ]
        }).compileComponents();

        fixture =
            TestBed.createComponent(
                TkCardComponent
            );

        await fixture.whenStable();

        article =
            fixture.nativeElement.querySelector('article');

    });


    it('should create', () => {

        expect(fixture.componentInstance).toBeTruthy();

        expect(article.classList).toContain('tk-card');

    });


    it('should use default variant', () => {

        expect(article.classList).toContain('tk-card--default');

        expect(article.classList).not.toContain('tk-card--outlined');

    });


    it('should use default padding', () => {

        expect(article.classList).toContain('tk-card--padding-medium');

    });


    it('should apply outlined variant', async () => {

        fixture.componentRef.setInput('variant', 'outlined');

        await fixture.whenStable();

        expect(article.classList).toContain('tk-card--outlined');

        expect(article.classList).not.toContain('tk-card--default');

    });


    it('should apply large padding', async () => {

        fixture.componentRef.setInput('padding', 'large');

        await fixture.whenStable();

        expect(article.classList).toContain('tk-card--padding-large');

        expect(article.classList).not.toContain('tk-card--padding-medium');

    });


    it('should project its content', async () => {

        @Component({
            imports: [TkCardComponent],
            template: '<tk-card><p class="projected">Card content</p></tk-card>'
        })
        class HostComponent {}

        const hostFixture = TestBed.createComponent(HostComponent);

        await hostFixture.whenStable();

        const projected =
            hostFixture.nativeElement.querySelector('article.tk-card .projected');

        expect(projected?.textContent).toBe('Card content');

    });

});
