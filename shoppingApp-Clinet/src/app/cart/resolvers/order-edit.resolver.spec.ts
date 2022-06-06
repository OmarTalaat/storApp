import { TestBed } from '@angular/core/testing';

import { OrderEditResolver } from './order-edit.resolver';

describe('OrderEditResolver', () => {
  let resolver: OrderEditResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderEditResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
