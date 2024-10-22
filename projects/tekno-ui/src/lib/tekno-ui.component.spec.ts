import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeknoUiComponent } from './tekno-ui.component';

describe('TeknoUiComponent', () => {
  let component: TeknoUiComponent;
  let fixture: ComponentFixture<TeknoUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeknoUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeknoUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
