import { TestBed } from '@angular/core/testing';

import { TeknoUiService } from './tekno-ui.service';

describe('TeknoUiService', () => {
  let service: TeknoUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeknoUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
