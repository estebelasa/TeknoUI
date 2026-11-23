import {
    Component
} from '@angular/core';

import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    TkTagComponent
} from '../tk-tag.component';

describe('TkTagComponent', () => {

    let fixture: ComponentFixture<TkTagComponent>;

    let tag: HTMLElement;

    beforeEach(async () => {

        await TestBed.configureTestingModule({

            imports: [
                TkTagComponent
            ]

        }).compileComponents();

        fixture =
            TestBed.createComponent(
                TkTagComponent
            );

        await fixture.whenStable();

        tag =
            fixture.nativeElement.querySelector('span');

    });


    it('should create', () => {

        expect(fixture.componentInstance).toBeTruthy();

        expect(tag.classList).toContain('tk-tag');

    });


    it('should use default variant', () => {

        expect(tag.classList).toContain('tk-tag--default');

        expect(tag.classList).not.toContain('tk-tag--primary');

    });


    it('should use default size', () => {

        expect(tag.classList).toContain('tk-tag--medium');

    });


    it('should apply primary variant', async () => {

        fixture.componentRef.setInput('variant', 'primary');

        await fixture.whenStable();

        expect(tag.classList).toContain('tk-tag--primary');

        expect(tag.classList).not.toContain('tk-tag--default');

    });


    it('should apply large size', async () => {

        fixture.componentRef.setInput('size', 'large');

        await fixture.whenStable();

        expect(tag.classList).toContain('tk-tag--large');

        expect(tag.classList).not.toContain('tk-tag--medium');

    });


    it('should project its content', async () => {

        @Component({
            imports: [TkTagComponent],
            template: '<tk-tag>Angular</tk-tag>'
        })
        class HostComponent {}

        const hostFixture = TestBed.createComponent(HostComponent);

        await hostFixture.whenStable();

        expect(hostFixture.nativeElement.querySelector('span.tk-tag')?.textContent?.trim()).toBe('Angular');

    });

});
