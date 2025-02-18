import { TestBed } from '@angular/core/testing';

import { HybridService } from './hybrid.service';

describe('HybridService', () => {
  let service: HybridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HybridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
