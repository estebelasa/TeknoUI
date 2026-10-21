import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    TkTagComponent
} from '../tk-tag.component';

describe('TkTagComponent', () => {

    let component: TkTagComponent;

    let fixture: ComponentFixture<TkTagComponent>;

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

        component =
            fixture.componentInstance;

        fixture.detectChanges();

    });


    it('should create', () => {
    });


    it('should use default variant', () => {
    });


    it('should use default size', () => {
    });


    it('should apply primary variant', () => {
    });


    it('should apply large size', () => {
    });

});