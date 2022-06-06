import { TestBed } from '@angular/core/testing';

import { OrderDetailsResolver } from './order-details.resolver';

describe('OrderDetailsResolver', () => {
  let resolver: OrderDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
