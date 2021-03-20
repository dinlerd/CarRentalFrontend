import { TestBed } from '@angular/core/testing';

import { RentCartService } from './rent-cart.service';

describe('RentCartService', () => {
  let service: RentCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
